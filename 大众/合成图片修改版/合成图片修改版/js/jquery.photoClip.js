/**
 * jQuery photoClip v1.8.0
 * 依赖插件
 * - iscroll-zoom.js
 * - hammer.js
 * - lrz.all.bundle.js
 *
 * @author 白俊杰 625603381@qq.com 2014/07/31
 * https://github.com/baijunjie/jQuery-photoClip
 *
 * @brief	支持手势的裁图插件
 *			在移动设备上双指捏合为缩放，双指旋转可根据旋转方向每次旋转90度
 *			在PC设备上鼠标滚轮为缩放，每次双击则顺时针旋转90度
 * @option_param {array} size 截取框的宽和高组成的数组。默认值为[260,260]
 * @option_param {array} outputSize 输出图像的宽和高组成的数组。默认值为[0,0]，表示输出图像原始大小
 * //@option_param {string} outputType 指定输出图片的类型，可选 "jpg" 和 "png" 两种种类型，默认为 "jpg"
 * @option_param {string} file 上传图片的<input type="file">控件的选择器或者DOM对象
 * @option_param {string} view 显示截取后图像的容器的选择器或者DOM对象
 * @option_param {string} ok 确认截图按钮的选择器或者DOM对象
 * @option_param {function} loadStart 开始加载的回调函数。this指向 fileReader 对象，并将正在加载的 file 对象作为参数传入
 * @option_param {function} loadComplete 加载完成的回调函数。this指向图片对象，并将图片地址作为参数传入
 * @option_param {function} loadError 加载失败的回调函数。this指向 fileReader 对象，并将错误事件的 event 对象作为参数传入
 * @option_param {function} clipFinish 裁剪完成的回调函数。this指向原图片对象，会将裁剪出的图像数据DataURL作为参数传入
 */

(function(root, factory) {
	"use strict";

	if (typeof define === "function" && define.amd) {
		define(["jquery", "iscroll-zoom", "hammer", "lrz"], factory);
	} else if (typeof exports === "object") {
		module.exports = factory(require("jquery"), require("iscroll-zoom"), require("hammer"), require("lrz"));
	} else {
		root.bjj = root.bjj || {};
		root.bjj.PhotoClip = factory(root.jQuery, root.IScroll, root.Hammer, root.lrz);
	}

}(this, function($, IScroll, Hammer, lrz) {
	"use strict";

	var defaultOption = {
		size: [260, 260],
		outputSize: [0, 0],
		//outputType: "jpg",
		file: "",
		view: "",
		ok: "",
		loadStart: function() {},
		loadComplete: function() {},
		loadError: function() {},
		clipFinish: function() {}
	}

	function PhotoClip(container, option) {
		if (!window.FileReader) {
			alert("您的浏览器不支持 HTML5 的 FileReader API， 因此无法初始化图片裁剪插件，请更换最新的浏览器！");
			return;
		}

		var opt = $.extend({}, defaultOption, option);
		var returnValue = photoClip(container, opt);

		this.destroy = returnValue.destroy;
	}

	function photoClip(container, option) {
		var size = option.size,
			outputSize = option.outputSize,
			file = option.file,
			view = option.view,
			ok = option.ok,
			//outputType = option.outputType || "image/jpeg",
			outputType = "image/jpeg",
			loadStart = option.loadStart,
			loadComplete = option.loadComplete,
			loadError = option.loadError,
			clipFinish = option.clipFinish;

		if (!isArray(size)) {
			size = [260, 260];
		}

		if (!isArray(outputSize)) {
			outputSize = [0, 0];
		}

		var clipWidth = size[0] || 260,
			clipHeight = size[1] || 260,
			outputWidth = Math.max(outputSize[0], 0),
			outputHeight = Math.max(outputSize[1], 0);

		/*if (outputType === "jpg") {
			outputType = "image/jpeg";
		} else if (outputType === "png") {
			outputType = "image/png";
		}*/

		var $file = $(file);
		if (!$file.length) return;

		var $img,
			imgWidth, imgHeight, //图片当前的宽高
			imgLoaded; //图片是否已经加载完成

		$file.attr("accept", "image/*");
		$file.on("change", function() {
			if (!this.files.length) return;
			var files = this.files[0];
			if (!/image\/\w+/.test(files.type)) {
				alert("图片格式不正确，请选择正确格式的图片文件！");
				return false;
			} else {
				var fileReader = new FileReader();
				fileReader.onprogress = function(e) {
					console.log((e.loaded / e.total * 100).toFixed() + "%");
				};
				fileReader.onload = function(e) {
					lrz(files)
					.then(function (rst) {
						// 处理成功会执行
						createImg(rst.base64);
					})
					.catch(function (err) {
						// 处理失败会执行
						alert("图片处理失败");
						loadError.call(this, err);
					});
				};
				fileReader.onerror = function(e) {
					alert("图片加载失败");
					loadError.call(this, e);
				};
				fileReader.readAsDataURL(files); // 读取文件内容

				loadStart.call(fileReader, files);
			}
		});

		$file.click(function() {
			this.value = "";
		});

		var $container, // 容器，包含裁剪视图层和遮罩层
			$clipView, // 裁剪视图层，包含移动层
			$moveLayer, // 移动层，包含旋转层
			$rotateLayer, // 旋转层
			$view, // 最终截图后呈现的视图容器
			canvas, // 图片裁剪用到的画布
			hammerManager,
			myScroll, // 图片的scroll对象，包含图片的位置与缩放信息
			containerWidth,
			containerHeight;

		init();
		initScroll();
		initEvent();
		initClip();

		var $ok = $(ok);
		if ($ok.length) {
			$ok.click(function() {
				clipImg();
			});
		}

		var $win = $(window);
		resize();
		$win.resize(resize);

		var atRotation, // 是否正在旋转中
			curX, // 旋转层的当前X坐标
			curY, // 旋转层的当前Y坐标
			curAngle; // 旋转层的当前角度

		function imgLoad() {
			imgLoaded = true;

			$rotateLayer.append(this);

			hideAction.call(this, $img, function() {
				imgWidth = this.naturalWidth;
				imgHeight = this.naturalHeight;
			});

			hideAction($moveLayer, function() {
				resetScroll();
			});


			loadComplete.call(this, this.src);
		}

		function initScroll() {
			var options = {
				zoom: true,
				scrollX: true,
				scrollY: true,
				freeScroll: true,
				mouseWheel: true,
				wheelAction: "zoom"
			}
			myScroll = new IScroll($clipView[0], options);
		}
		function resetScroll() {
			curX = 0;
			curY = 0;
			curAngle = 0;

			$rotateLayer.css({
				"width": imgWidth,
				"height": imgHeight
			});
			setTransform($rotateLayer, curX, curY, curAngle);

			calculateScale(imgWidth, imgHeight);
			myScroll.zoom(myScroll.options.zoomStart);
			refreshScroll(imgWidth, imgHeight);

			var posX = (clipWidth - imgWidth * myScroll.options.zoomStart) * .5,
				posY = (clipHeight - imgHeight * myScroll.options.zoomStart) * .5;
			myScroll.scrollTo(posX, posY);
		}
		function refreshScroll(width, height) {
			$moveLayer.css({
				"width": width,
				"height": height
			});
			// 在移动设备上，尤其是Android设备，当为一个元素重置了宽高时
			// 该元素的offsetWidth/offsetHeight、clientWidth/clientHeight等属性并不会立即更新，导致相关的js程序出现错误
			// iscroll 在刷新方法中正是使用了 offsetWidth/offsetHeight 来获取scroller元素($moveLayer)的宽高
			// 因此需要手动将元素重新添加进文档，迫使浏览器强制更新元素的宽高
			$clipView.append($moveLayer);
			myScroll.refresh();
		}

		function initEvent() {
			var is_mobile = !!navigator.userAgent.match(/mobile/i);

			if (is_mobile) {
				hammerManager = new Hammer($moveLayer[0]);
				hammerManager.add(new Hammer.Rotate());

				var rotation, rotateDirection;
				hammerManager.on("rotatemove", function(e) {
					if (atRotation) return;
					rotation = e.rotation;
					if (rotation > 180) {
						rotation -= 360;
					} else if (rotation < -180) {
						rotation += 360  ;
					}
					rotateDirection = rotation > 0 ? 1 : rotation < 0 ? -1 : 0;
				});
				hammerManager.on("rotateend", function(e) {
					if (atRotation) return;

					if (Math.abs(rotation) > 30) {
						if (rotateDirection == 1) {
							// 顺时针
							rotateCW(e.center);
						} else if (rotateDirection == -1) {
							// 逆时针
							rotateCCW(e.center);
						}
					}
				});
			} else {
				$moveLayer.on("dblclick", function(e) {
					rotateCW({
						x: e.clientX,
						y: e.clientY
					});
				});
			}
		}
		function rotateCW(point) {
			rotateBy(90, point);
		}
		function rotateCCW(point) {
			rotateBy(-90, point);
		}
		function rotateBy(angle, point) {
			if (atRotation) return;
			atRotation = true;

			var loacl;
			if (!point) {
				loacl = loaclToLoacl($moveLayer, $clipView, clipWidth * .5, clipHeight * .5);
			} else {
				loacl = globalToLoacl($moveLayer, point.x, point.y);
			}
			var origin = calculateOrigin(curAngle, loacl), // 旋转中使用的参考点坐标
				originX = origin.x,
				originY = origin.y,

				// 旋转层以零位为参考点旋转到新角度后的位置，与以当前计算的参考点“从零度”旋转到新角度后的位置，之间的左上角偏移量
				offsetX = 0, offsetY = 0,
				// 移动层当前的位置（即旋转层旋转前的位置），与旋转层以当前计算的参考点从当前角度旋转到新角度后的位置，之间的左上角偏移量
				parentOffsetX = 0, parentOffsetY = 0,

				newAngle = curAngle + angle,

				curImgWidth, // 移动层的当前宽度
				curImgHeight; // 移动层的当前高度


			if (newAngle == 90 || newAngle == -270)
			{
				offsetX = originX + originY;
				offsetY = originY - originX;

				if (newAngle > curAngle) {
					parentOffsetX = imgHeight - originX - originY;
					parentOffsetY = originX - originY;
				} else if (newAngle < curAngle) {
					parentOffsetX = (imgHeight - originY) - (imgWidth - originX);
					parentOffsetY = originX + originY - imgHeight;
				}

				curImgWidth = imgHeight;
				curImgHeight = imgWidth;
			}
			else if (newAngle == 180 || newAngle == -180)
			{
				offsetX = originX * 2;
				offsetY = originY * 2;

				if (newAngle > curAngle) {
					parentOffsetX = (imgWidth - originX) - (imgHeight - originY);
					parentOffsetY = imgHeight - (originX + originY);
				} else if (newAngle < curAngle) {
					parentOffsetX = imgWidth - (originX + originY);
					parentOffsetY = (imgHeight - originY) - (imgWidth - originX);
				}

				curImgWidth = imgWidth;
				curImgHeight = imgHeight;
			}
			else if (newAngle == 270 || newAngle == -90)
			{
				offsetX = originX - originY;
				offsetY = originX + originY;

				if (newAngle > curAngle) {
					parentOffsetX = originX + originY - imgWidth;
					parentOffsetY = (imgWidth - originX) - (imgHeight - originY);
				} else if (newAngle < curAngle) {
					parentOffsetX = originY - originX;
					parentOffsetY = imgWidth - originX - originY;
				}

				curImgWidth = imgHeight;
				curImgHeight = imgWidth;
			}
			else if (newAngle == 0 || newAngle == 360 || newAngle == -360)
			{
				offsetX = 0;
				offsetY = 0;

				if (newAngle > curAngle) {
					parentOffsetX = originX - originY;
					parentOffsetY = originX + originY - imgWidth;
				} else if (newAngle < curAngle) {
					parentOffsetX = originX + originY - imgHeight;
					parentOffsetY = originY - originX;
				}

				curImgWidth = imgWidth;
				curImgHeight = imgHeight;
			}

			// 将触摸点设为旋转时的参考点
			// 改变参考点的同时，要计算坐标的偏移，从而保证图片位置不发生变化
			if (curAngle == 0) {
				curX = 0;
				curY = 0;
			} else if (curAngle == 90 || curAngle == -270) {
				curX -= originX + originY;
				curY -= originY - originX;
			} else if (curAngle == 180 || curAngle == -180) {
				curX -= originX * 2;
				curY -= originY * 2;
			} else if (curAngle == 270 || curAngle == -90) {
				curX -= originX - originY;
				curY -= originX + originY;
			}
			curX = curX.toFixed(2) - 0;
			curY = curY.toFixed(2) - 0;
			setTransform($rotateLayer, curX, curY, curAngle, originX, originY);

			// 开始旋转
			setTransition($rotateLayer, curX, curY, newAngle, 200, function() {
				atRotation = false;
				curAngle = newAngle % 360;
				// 旋转完成后将参考点设回零位
				// 同时加上偏移，保证图片位置看上去没有变化
				// 这里要另外要加上父容器（移动层）零位与自身之间的偏移量
				curX += offsetX + parentOffsetX;
				curY += offsetY + parentOffsetY;
				curX = curX.toFixed(2) - 0;
				curY = curY.toFixed(2) - 0;
				setTransform($rotateLayer, curX, curY, curAngle);
				// 相应的父容器（移动层）要减去与旋转层之间的偏移量
				// 这样看上去就好像图片没有移动
				myScroll.scrollTo(
					myScroll.x - parentOffsetX * myScroll.scale,
					myScroll.y - parentOffsetY * myScroll.scale
				);
				calculateScale(curImgWidth, curImgHeight);
				if (myScroll.scale < myScroll.options.zoomMin) {
					myScroll.zoom(myScroll.options.zoomMin);
				}

				refreshScroll(curImgWidth, curImgHeight);
			});
		}

		function initClip() {
			canvas = document.createElement("canvas");
		}
		function clipImg() {
			if (!imgLoaded) {
				alert("亲，当前没有图片可以裁剪!");
				return;
			}
			var local = loaclToLoacl($moveLayer, $clipView);
			var scale = myScroll.scale;
			var ctx = canvas.getContext("2d");
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.save();

			if (!outputWidth || !outputHeight) {
				canvas.width = clipWidth / scale;
				canvas.height = clipHeight / scale;
			} else {
				canvas.width = outputWidth;
				canvas.height = outputHeight;
				ctx.scale(outputWidth / clipWidth * scale, outputHeight / clipHeight * scale);
			}

			ctx.translate(curX - local.x / scale, curY - local.y / scale);
			ctx.rotate(curAngle * Math.PI / 180);

			ctx.drawImage($img[0], 0, 0);
			ctx.restore();

			var dataURL = canvas.toDataURL(outputType, 1);
			$view.css("background-image", "url("+ dataURL +")");
			clipFinish.call($img[0], dataURL);
		}


		function resize() {
			hideAction($container, function() {
				containerWidth = $container.width();
				containerHeight = $container.height();
			});
		}
		function loaclToLoacl($layerOne, $layerTwo, x, y) { // 计算$layerTwo上的x、y坐标在$layerOne上的坐标
			x = x || 0;
			y = y || 0;
			var layerOneOffset, layerTwoOffset;
			hideAction($layerOne, function() {
				layerOneOffset = $layerOne.offset();
			});
			hideAction($layerTwo, function() {
				layerTwoOffset = $layerTwo.offset();
			});
			return {
				x: layerTwoOffset.left - layerOneOffset.left + x,
				y: layerTwoOffset.top - layerOneOffset.top + y
			};
		}
		function globalToLoacl($layer, x, y) { // 计算相对于窗口的x、y坐标在$layer上的坐标
			x = x || 0;
			y = y || 0;
			var layerOffset;
			hideAction($layer, function() {
				layerOffset = $layer.offset();
			});
			return {
				x: x + $win.scrollLeft() - layerOffset.left,
				y: y + $win.scrollTop() - layerOffset.top
			};
		}
		function hideAction(jq, func) {
			var $hide = $();
			$.each(jq, function(i, n){
				var $n = $(n);
				var $hidden = $n.parents().andSelf().filter(":hidden");
				var $none;
				for (var i = 0; i < $hidden.length; i++) {
					if (!$n.is(":hidden")) break;
					$none = $hidden.eq(i);
					if ($none.css("display") == "none") $hide = $hide.add($none.show());
				}
			});
			if (typeof(func) == "function") func.call(this);
			$hide.hide();
		}
		function calculateOrigin(curAngle, point) {
			var scale = myScroll.scale;
			var origin = {};
			if (curAngle == 0) {
				origin.x = point.x / scale;
				origin.y = point.y / scale;
			} else if (curAngle == 90 || curAngle == -270) {
				origin.x = point.y / scale;
				origin.y = imgHeight - point.x / scale;
			} else if (curAngle == 180 || curAngle == -180) {
				origin.x = imgWidth - point.x / scale;
				origin.y = imgHeight - point.y / scale;
			} else if (curAngle == 270 || curAngle == -90) {
				origin.x = imgWidth - point.y / scale;
				origin.y = point.x / scale;
			}
			return origin;
		}
		function getScale(w1, h1, w2, h2) {
			var sx = w1 / w2;
			var sy = h1 / h2;
			return sx > sy ? sx : sy;
		}
		function calculateScale(width, height) {
			myScroll.options.zoomMin = getScale(clipWidth, clipHeight, width, height);
			myScroll.options.zoomMax = Math.max(1, myScroll.options.zoomMin);
			myScroll.options.zoomStart = Math.min(myScroll.options.zoomMax, getScale(containerWidth, containerHeight, width, height));
		}

		function clearImg() {
			if ($img &&　$img.length) {
				// 删除旧的图片以释放内存，防止IOS设备的webview崩溃
				$img.remove();
				delete $img[0];
			}
		}

		function createImg(src) {
			clearImg();
			$img = $("<img>").css({
				"user-select": "none",
				"pointer-events": "none"
			});
			$img.load(imgLoad);
			$img.attr("src", src); // 设置图片base64值
		}

		function setTransform($obj, x, y, angle, originX, originY) {
			originX = originX || 0;
			originY = originY || 0;
			var style = {};
			style[prefix + "transform"] = "translateZ(0) translate(" + x + "px," + y + "px) rotate(" + angle + "deg)";
			style[prefix + "transform-origin"] = originX + "px " + originY + "px";
			$obj.css(style);
		}
		function setTransition($obj, x, y, angle, dur, fn) {
			// 这里需要先读取之前设置好的transform样式，强制浏览器将该样式值渲染到元素
			// 否则浏览器可能出于性能考虑，将暂缓样式渲染，等到之后所有样式设置完成后再统一渲染
			// 这样就会导致之前设置的位移也被应用到动画中
			$obj.css(prefix + "transform");
			$obj.css(prefix + "transition", prefix + "transform " + dur + "ms");
			$obj.one(transitionEnd, function() {
				$obj.css(prefix + "transition", "");
				fn.call(this);
			});
			$obj.css(prefix + "transform", "translateZ(0) translate(" + x + "px," + y + "px) rotate(" + angle + "deg)");
		}

		// 判断一个对象是否为数组
		function isArray(obj) {
			return Object.prototype.toString.call(obj) === "[object Array]";
		}

		function init() {
			// 初始化容器
			$container = $(container).css({
				"user-select": "none",
				"overflow": "hidden"
			});
			if ($container.css("position") == "static") $container.css("position", "relative");

			// 创建裁剪视图层
			$clipView = $("<div class='photo-clip-view'>").css({
				"position": "absolute",
				"left": "10%",
				"bottom": "0",
				"width": "80%",
				"height": "80%"
			}).appendTo($container);
			/*$clipView = $("<div class='photo-clip-view'>").css({
				"position": "absolute",
				"left": "50%",
				"top": "50%",
				"width": clipWidth,
				"height": clipHeight,
				"margin-left": -clipWidth/2,
				"margin-top": -clipHeight/2
			}).appendTo($container);*/

			$moveLayer = $("<div class='photo-clip-moveLayer'>").appendTo($clipView);

			$rotateLayer = $("<div class='photo-clip-rotateLayer'>").appendTo($moveLayer);

			// 创建遮罩
			var $mask = $("<div class='photo-clip-mask'>").css({
				"position": "absolute",
				"left": 0,
				"top": 0,
				"width": "100%",
				"height": "100%",
				"pointer-events": "none"
			}).appendTo($container);
			var $mask_left = $("<div class='photo-clip-mask-left'>").css({
				"position": "absolute",
				"left": "0",
				"width":"10%",
				"height":"89%",
				"bottom": "0",
				
			}).appendTo($mask);
			var $mask_right = $("<div class='photo-clip-mask-right'>").css({
				"position": "absolute",
				"right": "0",
				"width":"10%",
				"height":"89%",
				"bottom": "0",
			}).appendTo($mask);
			var $mask_top = $("<div class='photo-clip-mask-top'>").css({
				"position": "absolute",
				"left": "0",
				"width":"100%",
				"height":"11%",
				"top": "0",
			}).appendTo($mask);
			var $mask_bottom = $("<div class='photo-clip-mask-bottom'>").css({
				"position": "absolute",
				"left": 0,
				"right": 0,
				"top": "50%",
				"bottom": 0,
			}).appendTo($mask);
			// 创建截取区域
			var $clip_area = $("<div class='photo-clip-area'>").css({
				//"border": "1px dashed #ddd",
				"position": "absolute",
				"left": "10%",
				"bottom": "0",
				"width": "80%",
				"height": "89%",
				//"margin-left": -clipWidth/2 - 1,
				//"margin-top": -clipHeight/2 - 1,
				"background":"url(index/images/zj.jpg) no-repeat",
				"background-size":"cover"
			}).appendTo($mask);
			// 创建截取区域
			/*var $clip_area = $("<div class='photo-clip-area'>").css({
				"border": "1px dashed #ddd",
				"position": "absolute",
				"left": "50%",
				"top": "50%",
				"width": clipWidth,
				"height": clipHeight,
				"margin-left": -clipWidth/2 - 1,
				"margin-top": -clipHeight/2 - 1,
				"background":"url(http://ttt.h5.iddi-inc.com/sht/christmas/index/images/bg1.jpg)"
			}).appendTo($mask);*/
			

			// 初始化视图容器
			$view = $(view);
			if ($view.length) {
				$view.css({
					"background-color": "#666",
					"background-repeat": "no-repeat",
					"background-position": "center",
					"background-size": "contain"
				});
			}
		}

		function destroy() {
			$file.off("change");
			$file = null;

			if (hammerManager) {
				hammerManager.off("rotatemove");
				hammerManager.off("rotateend");
				hammerManager = null;
			} else {
				$moveLayer.off("dblclick");
			}

			myScroll.destroy();
			myScroll = null;

			$container.empty();
			$container = null;
			$clipView = null;
			$moveLayer = null;
			$rotateLayer = null;

			$view.css({
				"background-color": "",
				"background-repeat": "",
				"background-position": "",
				"background-size": ""
			});
			$view = null;
		}

		return {
			destroy: destroy
		};
	}

	var prefix = '',
		transitionEnd;

	(function() {

		var eventPrefix,
			vendors = { Webkit: 'webkit', Moz: '', O: 'o' },
	    	testEl = document.documentElement,
	    	normalizeEvent = function(name) { return eventPrefix ? eventPrefix + name : name.toLowerCase() };

		for (var i in vendors) {
			if (testEl.style[i + 'TransitionProperty'] !== undefined) {
				prefix = '-' + i.toLowerCase() + '-';
				eventPrefix = vendors[i];
				break;
			}
		}

		transitionEnd = normalizeEvent('TransitionEnd');

	})();

	return PhotoClip;
}));
