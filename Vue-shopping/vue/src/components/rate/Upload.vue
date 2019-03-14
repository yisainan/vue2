
<!--
Description 图片上传及预览组件
@authors Benny
@date    2018-05-08 12:57:08
@version 1.0.0
-->
<template>
    <div id="imgUploader">
        <div class="file-list">
            <div class="thumbnails my-gallery">
                <figure
                    itemprop="associatedMedia"
                    itemscope
                    class="thumbnail"
                    v-for="(item,index) in files"
                    :key="index"
                >
                    <a
                        :href="item.src"
                        itemprop="contentUrl"
                        data-size="400x400"
                        class="img-wrapper"
                    >
                        <img :src="item.src" itemprop="thumbnail">
                    </a>
                    <span class="file-remove" @click="remove(index,$event)">×</span>
                </figure>
                <section class="thumbnail" v-if="this.files.length < 5">
                    <div class="add">
                        <span>+</span>
                        <input
                            type="file"
                            @change="selectImgs()"
                            multiple
                            accept="image/*"
                            ref="file"
                        >
                    </div>
                </section>
            </div>

            <!-- PhotoSwipe插件需要的元素， 一定要有类名 pswp -->
            <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="pswp__bg"></div>
                <div class="pswp__scroll-wrap">
                    <div class="pswp__container">
                        <div class="pswp__item"></div>
                        <div class="pswp__item"></div>
                        <div class="pswp__item"></div>
                    </div>
                    <!-- 预览区域顶部的默认UI，可以修改 -->
                    <div class="pswp__ui pswp__ui--hidden">
                        <div class="pswp__top-bar">
                            <!--  与图片相关的操作 -->
                            <div class="pswp__counter"></div>
                            <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                            <!--将分享按钮去掉 -->
                            <div class="pswp__preloader">
                                <div class="pswp__preloader__icn">
                                    <div class="pswp__preloader__cut">
                                        <div class="pswp__preloader__donut"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                            <div class="pswp__share-tooltip"></div>
                        </div>
                        <button
                            class="pswp__button pswp__button--arrow--left"
                            title="Previous (arrow left)"
                        ></button>
                        <button
                            class="pswp__button pswp__button--arrow--right"
                            title="Next (arrow right)"
                        ></button>
                        <div class="pswp__caption">
                            <div class="pswp__caption__center"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PhotoSwipe from "photoswipe";
import PhotoSwipeUI_Default from "photoswipe/dist/photoswipe-ui-default";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
export default {
    data() {
        return {
            // lang: this.$lang("dynamic"),
            files: [], // 文件缓存
            index: 0, // 序列号
            maxLength: 5, // 图片最大数量
            maxSize: 10240000 //图片限制为10M内
        };
    },
    methods: {
        //选择图片
        selectImgs() {
            let fileList = this.$refs.file.files;
            if (fileList.length > this.maxLength) {
                this.$toast("最大选择图片不能超过5张");
            }
            let tempList = []; //每次点击+号后选择的图片信息
            for (let i = 0, len = fileList.length; i < len; i++) {
                let fileItem = {
                    Id: this.index++,
                    name: fileList[i].name,
                    size: fileList[i].size,
                    file: fileList[i]
                };
                //将图片文件转成Base64
                let reader = new FileReader();
                reader.onloadend = e => {
                    this.getBase64(e.target.result).then(url => {
                        this.$set(fileItem, "src", url);
                    });
                };
                if (fileItem.size > this.maxSize) {
                    Toast(this.lang.dynamic_over_size);
                } else {
                    reader.readAsDataURL(fileList[i]);
                    tempList.push(fileItem)
                    this.files.push(fileItem);
                }
            }

            this.files.splice(5);
            tempList.splice(5)
            setTimeout(() => {
                this.$emit("getFiles", tempList);
            }, 300);
        },

        clearFiles() {
            this.files = []
        },
        
        // 图片压缩并保存到files
        getBase64(url) {
            let self = this;
            let Img = new Image(),
                dataURL = "";
            Img.src = url;
            let p = new Promise(function(resolve, reject) {
                Img.onload = function() {
                    //要先确保图片完整获取到，这是个异步事件
                    let canvas = document.createElement("canvas"), //创建canvas元素
                        width = Img.width, //确保canvas的尺寸和图片一样
                        height = Img.height;
                    // 默认将长宽设置为图片的原始长宽，这样在长宽不超过最大长度时就不需要再处理
                    let ratio = width / height,
                        maxLength = 1000,
                        newHeight = height,
                        newWidth = width;
                    // 在长宽超过最大长度时，按图片长宽比例等比缩小
                    if (width > maxLength || height > maxLength) {
                        if (width > height) {
                            newWidth = maxLength;
                            newHeight = maxLength / ratio;
                        } else {
                            newWidth = maxLength * ratio;
                            newHeight = maxLength;
                        }
                    }
                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    canvas
                        .getContext("2d")
                        .drawImage(Img, 0, 0, newWidth, newHeight); //将图片绘制到canvas中
                    dataURL = canvas.toDataURL("image/jpeg", 0.5); //转换图片为dataURL
                    resolve(dataURL);
                };
            });
            return p;
        },
        // 移除图片
        remove(index, e) {
            e.stopPropagation(); //阻止
            this.files.splice(index, 1);
            setTimeout(() => {
                this.$emit("removeFiles", index);
            }, 300);
        },
        //引入photoSwipe(可预览、滑动)
        initPhotoSwipeFromDOM(gallerySelector) {
            var parseThumbnailElements = function(el) {
                var thumbElements = el.childNodes,
                    numNodes = thumbElements.length,
                    items = [],
                    figureEl,
                    linkEl,
                    size,
                    item;
                for (var i = 0; i < numNodes - 1; i++) {
                    figureEl = thumbElements[i];
                    if (figureEl.nodeType !== 1) {
                        continue;
                    }
                    linkEl = figureEl.children[0];
                    var img = new Image();
                    img.src = linkEl.getAttribute("href");
                    linkEl.setAttribute(
                        "data-size",
                        img.naturalWidth + "x" + img.naturalHeight
                    );
                    size = linkEl.getAttribute("data-size").split("x");
                    item = {
                        src: linkEl.getAttribute("href"),
                        w: parseInt(size[0], 10),
                        h: parseInt(size[1], 10)
                    };
                    if (figureEl.children.length > 1) {
                        item.title = figureEl.children[1].innerHTML;
                    }
                    if (linkEl.children.length > 0) {
                        item.msrc = linkEl.children[0].getAttribute("src");
                    }
                    item.el = figureEl;
                    items.push(item);
                }
                return items;
            };
            var closest = function closest(el, fn) {
                return el && (fn(el) ? el : closest(el.parentNode, fn));
            };
            var onThumbnailsClick = function(e) {
                e = e || window.event;
                // e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                var eTarget = e.target || e.srcElement;
                var clickedListItem = closest(eTarget, function(el, e) {
                    return el.tagName && el.tagName.toUpperCase() === "FIGURE";
                });

                if (!clickedListItem) {
                    return;
                }
                var clickedGallery = clickedListItem.parentNode,
                    childNodes = clickedListItem.parentNode.childNodes,
                    numChildNodes = childNodes.length,
                    nodeIndex = 0,
                    index;
                for (var i = 0; i < numChildNodes; i++) {
                    if (childNodes[i].nodeType !== 1) {
                        continue;
                    }
                    if (childNodes[i] === clickedListItem) {
                        index = nodeIndex;
                        break;
                    }
                    nodeIndex++;
                }

                if (index >= 0) {
                    openPhotoSwipe(index, clickedGallery);
                }
                return false;
            };
            var photoswipeParseHash = function() {
                var hash = window.location.hash.substring(1),
                    params = {};
                if (hash.length < 5) {
                    return params;
                }
                var vars = hash.split("&");
                for (var i = 0; i < vars.length; i++) {
                    if (!vars[i]) {
                        continue;
                    }
                    var pair = vars[i].split("=");
                    if (pair.length < 2) {
                        continue;
                    }
                    params[pair[0]] = pair[1];
                }
                if (params.gid) {
                    params.gid = parseInt(params.gid, 10);
                }
                return params;
            };

            var openPhotoSwipe = function(
                index,
                galleryElement,
                disableAnimation,
                fromURL
            ) {
                var pswpElement = document.querySelectorAll(".pswp")[0],
                    gallery,
                    options,
                    items;
                items = parseThumbnailElements(galleryElement);
                options = {
                    history: false,
                    tapToClose: true,
                    galleryUID: galleryElement.getAttribute("data-pswp-uid"),
                    getThumbBoundsFn: function(index) {
                        var thumbnail = items[index].el.getElementsByTagName(
                                "img"
                            )[0],
                            pageYScroll =
                                window.pageYOffset ||
                                document.documentElement.scrollTop,
                            rect = thumbnail.getBoundingClientRect();
                        return {
                            x: rect.left,
                            y: rect.top + pageYScroll,
                            w: rect.width
                        };
                    }
                };
                if (fromURL) {
                    if (options.galleryPIDs) {
                        for (var j = 0; j < items.length; j++) {
                            if (items[j].pid == index) {
                                options.index = j;
                                break;
                            }
                        }
                    } else {
                        options.index = parseInt(index, 10) - 1;
                    }
                } else {
                    options.index = parseInt(index, 10);
                }
                if (isNaN(options.index)) {
                    return "";
                }
                if (disableAnimation) {
                    options.showAnimationDuration = 0;
                }

                gallery = new PhotoSwipe(
                    pswpElement,
                    PhotoSwipeUI_Default,
                    items,
                    options
                );
                gallery.init();
            };
            var galleryElements = document.querySelectorAll(gallerySelector);
            for (var i = 0, l = galleryElements.length; i < l; i++) {
                galleryElements[i].setAttribute("data-pswp-uid", i + 1);
                galleryElements[i].onclick = onThumbnailsClick;
            }
            var hashData = photoswipeParseHash();
            if (hashData.pid && hashData.gid) {
                openPhotoSwipe(
                    hashData.pid,
                    galleryElements[hashData.gid - 1],
                    true,
                    true
                );
            }
        }
    },
    mounted() {
        this.initPhotoSwipeFromDOM(".my-gallery");
    }
};
</script>

<style lang="less" scoped>
#imgUploader {
    flex: 1;
    margin-top: auto;
    background: #f7f7f7;
    padding: 10px 0;
    .file-list {
        .file-remove {
            position: absolute;
            font-size: 12px;
            right: -5px;
            top: -5px;
            width: 14px;
            height: 14px;
            color: white;
            cursor: pointer;
            line-height: 14px;
            background: rgba(0, 0, 0, 05);
            border-radius: 3px;
            z-index: 1000;
            text-align: center;
        }

        &:hover .file-remove {
            display: inline;
        }
    }
}
.add {
    width: 100%;
    height: 50px;
    float: left;
    text-align: center;
    line-height: 50px;
    // font-size: 1.4rem;
    font-weight: 100;
    cursor: pointer;
    border: 1px dashed #ccc;
    color: #999;
    position: relative;
    // background: #f2f2f2;
    @media screen and(min-width:768px) and(max-width:1024px) {
        height: 180px;
        line-height: 180px;
        font-size: 56px;
    }
    .fa {
        font-size: 1.4em;
        color: #7dd2d9;
    }
}
.uploadBtn {
    position: relative;
    .empty {
        position: absolute;
        right: 0;
        bottom: 0;
        background-color: #eee;
        color: #fff;
        padding: 0.2em 1em;
    }
}

.thumbnails {
    margin: 0;
    width: 90%;
    margin: 0 auto;
    background: #f7f7f7;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    .thumbnail {
        position: relative;
        width: 50px;
        box-sizing: border-box;
        height: 50px;
        margin-right: 10px;
        .img-wrapper {
            position: relative;
            display: flex;
            height: 50px;
            img {
                width: auto;
                height: auto;
                width: 100%;
                max-width: 100%;
                max-height: 100%;
                object-fit: cover;
            }
        }
    }
}
input[type="file"] {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 50px;
    opacity: 0;
}
</style>
