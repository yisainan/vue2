'use strict';

var DEFAULT_INTERVAL = 1000 / 60;

//初始化状态
var STATE_INITIAL = 0;
//开始状态
var STATE_START = 1;
//停止状态
var STATE_STOP = 2;

/**
 * Timline时间轴类
 * @constructor
 */
function Timeline() {
	this.animationHandler = 0;
	this.state = STATE_INITIAL;
}

/**
 * 时间轴上每一次回调执行的函数
 * @param time 从动画开始到当前执行的时间
 */
Timeline.prototype.onenterframe = function (time) {
};

/**
 * 动画开始
 * @param interval 每一次回调的间隔时间
 */
Timeline.prototype.start = function (interval) {
	if (this.state === STATE_START)
		return;
	this.state = STATE_START;

	this.interval = interval || DEFAULT_INTERVAL;
	startTimeline(this, +new Date());
};

/**
 * 重新开始动画
 */
Timeline.prototype.restart = function () {
	if (this.state === STATE_START)
		return;
	if (!this.dur || !this.interval)
		return;

	this.state = STATE_START;

	//无缝连接停止动画的状态
	startTimeline(this, +new Date() - this.dur);
};

/**
 * 动画停止
 */
Timeline.prototype.stop = function () {
	if (this.state !== STATE_START)
		return;
	this.state = STATE_STOP;

	//如果动画开始过，则记录动画从开始到当前所经历的时间
	if (this.startTime) {
		this.dur = +new Date() - this.startTime;
	}
	cancelAnimationFrame(this.animationHandler);
};

/**
 * 时间轴动画启动函数
 * @param timeline 时间轴实例
 * @param startTime 动画开始时间戳
 */
function startTimeline(timeline, startTime) {
	//记录上一次回调的时间戳
	var lastTick = +new Date();

	timeline.startTime = startTime;
	nextTick.interval = timeline.interval;
	nextTick();

	/**
	 * 每一帧执行的函数
	 */
	function nextTick() {
		var now = +new Date();

		timeline.animationHandler = requestAnimationFrame(nextTick);

		//如果当前时间与上一次回调的时间戳相差大于我们设置的间隔时间，表示可以执行一次回调函数。
		if (now - lastTick >= timeline.interval) {
			timeline.onenterframe(now - startTime);
			lastTick = now;
		}
	}
}

/**
 * raf
 */
var requestAnimationFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
			//所有都不支持，用setTimeout兼容
		function (callback) {
			return window.setTimeout(callback, (callback.interval || DEFAULT_INTERVAL)); // make interval as precise as possible.
		};
})();

/**
 * cancel raf
 */
var cancelAnimationFrame = (function () {
	return window.cancelAnimationFrame ||
		window.webkitCancelAnimationFrame ||
		window.mozCancelAnimationFrame ||
		window.oCancelAnimationFrame ||
		function (id) {
			window.clearTimeout(id);
		};
})();

module.exports = Timeline;