
/**
* LBS drawRing 
* Date: 2015-04-24
* ==================================
* opts.parent 插入到哪里 一个JS元素对象
* opts.width 宽度 = 2* (半径+弧宽)  
* opts.radius 半径
* opts.arc 弧宽
* opts.perent 百分比 
* opts.color 弧渲染颜色 [底色,进度色]
* opts.textColor 文字渲染颜色
* opts.textSize 文字渲染大小
* opts.animated 是否以动画的方式绘制 默认false
* opts.after 绘制完成时执行函数
* ==================================
**/

function drawRing(opts) {
    var _opts = {
        parent: document.body,
        width: 100,
        radius: 45,
        arc: 5,
        perent: 100,
        color: ['#ccc', '#042b61'],
        textColor: '#000',
        textSize: '14px',
        animated: false,
        after: function () { }
    }, k;
    for (k in opts) _opts[k] = opts[k];
    var parent = _opts.parent,
        width = _opts.width,
        radius = _opts.radius,
        arc = _opts.arc,
        perent = parseFloat(_opts.perent),
        color = _opts.color,
        textSize = _opts.textSize,
        textColor = _opts.textColor,
        c = document.createElement('canvas'),
        ctx = null,
        x = 0,
        animated = _opts.animated,
        after = _opts.after;
    var c2 = parent.querySelector("canvas");
    c2 && c2.remove();
    //parent.insertBefore(c, parent.querySelector(".content"));
    parent.appendChild(c);
    ctx = c.getContext("2d");

    var pixelRatio = window.devicePixelRatio || 1;
    c.style.width = c.width + 'px';
    c.style.height = c.height + 'px';
    c.width *= pixelRatio;
    c.height *= pixelRatio;
    //自然我们的文字图片等也要进行相应的缩放
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    // ctx.canvas.width = width;
    // ctx.canvas.height = width;
    function clearFill() {
        ctx.clearRect(0, 0, width, width);
    }

    function fillBG() {
        ctx.beginPath();
        ctx.lineWidth = arc;
        ctx.strokeStyle = color[0];
        ctx.arc(width / 2, width / 2, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    function fillArc(x) {
        ctx.beginPath();
        ctx.lineWidth = arc;
        ctx.strokeStyle = color[1];
        ctx.arc(width / 2, width / 2, radius, -90 * Math.PI / 180, (x * 3.6 - 90) * Math.PI / 180);
        ctx.stroke();
    }

    function fillText(x) {
        ctx.font = textSize + ' Arial';
        ctx.fillStyle = textColor;
        ctx.textBaseline = "middle";
        ctx.textAlign = 'center';
        ctx.fillText(x.toFixed(1) + '%', width / 2, width / 2);
    }

    function fill(x, end) {
        fillBG();
        fillArc(x);
        if (end === true) {

        }
        else { fillText(x); }
    }

    if (!animated) return fill(perent);

    fill(x);
    !function animate() {
        if (++x > perent) {
            clearFill();
            fill(x, true);
            return after && after();
        }
        setTimeout(animate, 10);
        clearFill();
        fill(x);
    }();
}

export default drawRing