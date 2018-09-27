'use strict';

var __id = 0;

/**
 * 动态创建id
 * @returns {number}
 */
function getId() {
	return ++__id;
}

/**
 * 预加载图片函数
 * @param images 加载的图片数组或对象
 * @param callback 全部图片加载完毕后调用的回调函数
 * @param timeout 加载超时的时长
 */
function loadImage(images, callback, timeout) {
	//加载完成图片的计数器
	var count = 0;
	//全部图片成功加载完图片的标志位
	var success = true;
	//超时timer的id
	var timeoutId = 0;
	//是否加载超时的标志位
	var isTimeout = false;
	//对图片数组（或对象）进行遍历
	for (var key in images) {
		//过滤掉prototype的属性
		if (!images.hasOwnProperty(key))
			continue;
		//获得每个图片元素
		//期望格式是个object： {src:xxx}
		var item = images[key];

		// 如果item是个字符串，则构造object
		if (typeof item === 'string') {
			item = images[key] = {
				src: item
			};
		}

		//如果格式不满足期望，则丢弃此条数据进行下一次遍历
		if (!item || !item.src)
			continue;

		//计数+1
		count++;
		//设置图片元素的id
		item.id = "__img_" + key + getId();
		//设置图片元素的img，是一个Image对象
		item.img = window[item.id] = new Image();

		doLoad(item);
	}

	//遍历完成如果计数为0，则直接调用
	if (!count) {
		callback(success);
	}
	//如果设置了加载时长，则设置超时函数计时器
	else if (timeout) {
		timeoutId = setTimeout(onTimeout, timeout);
	}

	/**
	 * 真正进行图片加载的函数
	 * @param item 图片元素对象
	 */
	function doLoad(item) {
		item.status = "loading";

		var img = item.img;
		//定义图片加载成功的回调函数
		img.onload = function () {
			//如果每张图片都成功才算成功
			success = success && true;
			item.status = "loaded";
			done();
		};
		img.onerror = function () {
			//若有一张图片加载失败，则为失败
			success = false;
			item.status = "error";
			done();
		};
		//发起一个http(s)请求加载图片
		img.src = item.src;

		/**
		 * 每张图片加载完成的回调函数
		 */
		function done() {
			//事件清理
			img.onload = img.onerror = null;

			try {
				//删除window上注册的属性
				delete window[item.id];
			}
			catch (e) {

			}
			//每张图片加载完成，计数器减一，当所有图片加载完毕且没有超时的情况下，
			//清除超时计时器，且执行回调函数
			if (!--count && !isTimeout) {
				clearTimeout(timeoutId);
				callback(success);
			}
		}
	}

	/**
	 * 超时函数
	 */
	function onTimeout() {
		isTimeout = true;
		callback(false);
	}
}

module.exports = loadImage;
