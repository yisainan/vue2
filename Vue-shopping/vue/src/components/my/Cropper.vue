<template>
<!-- 图片裁剪 -->
  <div class="vue-box">
    <img :src="imgUrl" alt id="img" :style="imgStyle">
    <input type="file" class="file"  accept="image/*"  @change="change($event)">
  </div>
</template>
<script>
import Cropper from "cropperjs";
export default {
  props: {
    imgStyle: {
      //裁剪后的图像显示
      type: Object,
      default: {
        width: "50px",
        height: "50px",
        "border-radius": "50%"
      }
    },
    // 定义的宽高比
    widthRate: {
      type: Number,
      default: 500
    },
    // 定义的宽高比
    heightRate: {
      type: Number,
      default: 500
    },
    imgUrl: {
      type: String,
      default: function() {
        return "";
      }
    }
  },
  data() {
    return {};
  },
  mounted() {
   
  },
  methods: {
    change(event) {
      let image = document.getElementById("img"); //预览对象
      this.clip(event, {
        resultObj: image,
        aspectWithRatio: Number(this.widthRate),
        aspectHeightRatio: Number(this.heightRate)
      });
    },
    //初始化方法
    initilize(opt) {
      let self = this;
      this.options = opt;
      //创建dom
      this.createElement();
      this.resultObj = opt.resultObj;
      //初始化裁剪对象
      this.cropper = new Cropper(this.preview, {
        aspectRatio: opt.aspectWithRatio / opt.aspectHeightRatio,
        // aspectRatio: 1/1,
        autoCropArea: opt.autoCropArea || 0.8,
        viewMode: 2,
        guides: true,
        cropBoxResizable: true, //是否通过拖动来调整剪裁框的大小
        cropBoxMovable: true, //是否通过拖拽来移动剪裁框。
        dragCrop: false,
        dragMode: "move", //‘crop’: 可以产生一个新的裁剪框3 ‘move’: 只可以移动3 ‘none’: 什么也不处理
        center: true,
        zoomable: true, //是否允许放大图像。
        zoomOnTouch: true, //是否可以通过拖动触摸来放大图像。
        scalable: true,
        // minCropBoxHeight: 750,
        // minCropBoxWidth: 750,
        background: false,
        checkOrientation: true,
        checkCrossOrigin: true,
        zoomable: false,
        zoomOnWheel: false,
        center: false,
        toggleDragModeOnDblclick: false,
        ready: function() {
          // console.log(self.cropper.rotate(90))
          if (opt.aspectRatio == "Free") {
            let cropBox = self.cropper.cropBox;
            cropBox.querySelector("span.cropper-view-box").style.outline =
              "none";
            self.cropper.disable();
          }
        }
      });
    },
    //创建一些必要的DOM，用于图片裁剪
    createElement() {
      //初始化图片为空对象
      this.preview = null;
      // <img src="../../assets/app/loading.gif">
      let str =
        '<div><img id="clip_image" src="originUrl"></div><button type="button" id="cancel_clip">取消</button><button type="button" id="clip_button">确定</button>';
      str +=
        '<div class="crop_loading"><div class="crop_content"><div class="crop_text">图片修剪中...</div></div></div>';
      str +=
        '<div class="crop_success"><div class="crop_success_text">上传成功</div></div></div>';

      //   let body = document.getElementsByTagName('body')[0];
      let app = document.getElementById("setAvatar");
      this.reagion = document.createElement("div");
      this.reagion.id = "clip_container";
      this.reagion.className = "container";
      this.reagion.innerHTML = str;
      //添加创建好的DOM元素
      app.appendChild(this.reagion);
      this.preview = document.getElementById("clip_image");

      //绑定一些方法
      this.initFunction();
    },
    //初始化一些函数绑定
    initFunction() {
      let self = this;
      this.clickBtn = document.getElementById("clip_button");
      this.cancelBtn = document.getElementById("cancel_clip");
      //确定事件
      this.addEvent(this.clickBtn, "click", function() {
        self.crop();
      });
      //取消事件
      this.addEvent(this.cancelBtn, "click", function() {
        self.destoried();
      });
      //清空input的值
      this.addEvent(this.fileObj, "click", function() {
        this.value = "";
      });
    },
    //外部接口，用于input['file']对象change时的调用
    clip(e, opt) {
      let self = this;

      this.fileObj = e.srcElement;

      let files = e.target.files || e.dataTransfer.files;

      if (!files.length) return false; //不是图片直接返回

      //调用初始化方法
      this.initilize(opt);

      //获取图片文件资源
      this.picValue = files[0];

      console.log(this.picValue);

      //调用方法转成url格式
      this.originUrl = this.getObjectURL(this.picValue);

      //每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(this.originUrl);
      }
    },
    //图片转码方法
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    //点击确定进行裁剪
    crop() {
      let self = this;
      let image = new Image();
      let croppedCanvas;
      let roundedCanvas;

      // Crop
      document.querySelector(".crop_loading").style.display = "block";

      setTimeout(function() {
        croppedCanvas = self.cropper.getCroppedCanvas();
        // Round
        roundedCanvas = self.getRoundedCanvas(croppedCanvas);

        let imgData = roundedCanvas.toDataURL();
        image.src = imgData;

        //判断图片是否大于100k,不大于直接上传，反之压缩
        if (imgData.length < 100 * 1024) {
          self.resultObj.src = imgData;
          //图片上传
          self.postImg(imgData);
        } else {
          image.onload = function() {
            //压缩处理
            let data = self.compress(image, self.Orientation);
            self.resultObj.src = data;
            //图片上传
            self.postImg(data);
          };
        }
      }, 20);
    },
    //获取裁剪图片资源
    getRoundedCanvas(sourceCanvas) {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      let width = sourceCanvas.width;
      let height = sourceCanvas.height;

      canvas.width = width;
      canvas.height = height;

      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = "destination-in";
      context.beginPath();
      context.rect(0, 0, width, height);
      context.fill();

      return canvas;
    },
    //销毁原来的对象
    destoried() {
      let self = this;
      //移除事件
      this.removeEvent(this.clickBtn, "click", null);
      this.removeEvent(this.cancelBtn, "click", null);
      this.removeEvent(this.fileObj, "click", null);
      //移除裁剪框
      this.reagion.parentNode.removeChild(this.reagion);

      //销毁裁剪对象
      this.cropper.destroy();
      this.cropper = null;
    },
    //图片上传
    postImg(imageData) {
      // console.log(imageData)

      this.$emit("callback", imageData);
      //这边写图片的上传
      let self = this;
      self.destoried();

      // window.setTimeout( function () {
      //   document.querySelector('.crop_loading').style.display = 'none';
      //   document.querySelector('.crop_success').style.display = 'block';
      //   //裁剪完后摧毁对象
      //     self.destoried();
      // },3000)
    },
    //图片旋转
    rotateImg(img, direction, canvas) {
      //最小与最大旋转方向，图片旋转4次后回到原方向
      const min_step = 0;
      const max_step = 3;
      if (img == null) return;
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height;
      let width = img.width;
      let step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction == "right") {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
      } else {
        step--;
        step < min_step && (step = max_step);
      }
      //旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180;
      let ctx = canvas.getContext("2d");
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    },
    //图片压缩
    compress(img, Orientation) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      //瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;

      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = (width * height) / 4000000) > 1) {
        console.log("大于400万像素");
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      //        铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = (width * height) / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(
              img,
              i * nw * ratio,
              j * nh * ratio,
              nw * ratio,
              nh * ratio,
              0,
              0,
              nw,
              nh
            );
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //修复ios上传图片的时候 被旋转的问题
      if (Orientation != "" && Orientation != 1) {
        switch (Orientation) {
          case 6: //需要顺时针（向左）90度旋转
            this.rotateImg(img, "left", canvas);
            break;
          case 8: //需要逆时针（向右）90度旋转
            this.rotateImg(img, "right", canvas);
            break;
          case 3: //需要180度旋转
            this.rotateImg(img, "right", canvas); //转两次
            this.rotateImg(img, "right", canvas);
            break;
        }
      }
      //进行最小压缩
      // let ndata = canvas.toDataURL( 'image/jpeg' , 0.1);
      let ndata = canvas.toDataURL("image/png", 0.1);
      console.log("压缩前：" + initSize);
      console.log("压缩后：" + ndata.length);
      console.log(
        "压缩率：" + ~~((100 * (initSize - ndata.length)) / initSize) + "%"
      );
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

      return ndata;
    },
    //添加事件
    addEvent(obj, type, fn) {
      if (obj.addEventListener) {
        obj.addEventListener(type, fn, false);
      } else {
        obj.attachEvent("on" + type, fn);
      }
    },
    //移除事件
    removeEvent(obj, type, fn) {
      if (obj.removeEventListener) {
        obj.removeEventListener(type, fn, false);
      } else {
        obj.detachEvent("on" + type, fn);
      }
    }
  }
};
</script>
<style scoped>
.vue-box {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 0.4rem;
}

.vue-box .file {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  top: 0;
  left: 0;
  z-index: 99;
  cursor: pointer;
}

img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

h3 {
  text-align: center;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
