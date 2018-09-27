'use strict';

var animation = window.animation;

var $rabbit1 = $('rabbit1');
var $rabbit2 = $('rabbit2');
var $rabbit3 = $('rabbit3');
var $rabbit4 = $('rabbit4');

var images = ['rabbit-big.png', 'rabbit-lose.png', 'rabbit-win.png'];

var rightRunningMap = ["0 -854", "-174 -852", "-349 -852", "-524 -852", "-698 -851", "-873 -848"];
var leftRunningMap = ["0 -373", "-175 -376", "-350 -377", "-524 -377", "-699 -377", "-873 -379"];
var rabbitWinMap = ["0 0", "-198 0", "-401 0", "-609 0", "-816 0", "0 -96", "-208 -97", "-415 -97", "-623 -97", "-831 -97", "0 -203", "-207 -203", "-415 -203", "-623 -203", "-831 -203", "0 -307", "-206 -307", "-414 -307", "-623 -307"];
var rabbitLoseMap = ["0 0", "-163 0", "-327 0", "-491 0", "-655 0", "-819 0", "0 -135", "-166 -135", "-333 -135", "-500 -135", "-668 -135", "-835 -135", "0 -262"];

repeat();
run();
win();
lose();

function repeat() {
	var repeatAnimation = animation().loadImage(images).changePosition($rabbit1, rightRunningMap, images[0]).repeatForever();
	repeatAnimation.start(80);

	var running = true;
	$rabbit1.addEventListener('click', function () {
		if (running) {
			running = false;
			repeatAnimation.pause();
		} else {
			running = true;
			repeatAnimation.restart();
		}
	});

}

function run() {
	var interval = 50;
	var speed = 6;
	var initLeft = 100;
	var finalLeft = 400;
	var frame = 4;
	var frameLength = 6;
	var right = true;

	var runAnimation = animation().loadImage(images).enterFrame(function (success, time) {
		var ratio = (time) / interval;
		var position;
		var left;
		if (right) {
			position = rightRunningMap[frame].split(' ');
			left = Math.min(initLeft + speed * ratio, finalLeft);
			if (left === finalLeft) {
				right = false;
				frame = 4;
				success();
				return;
			}
		} else {
			position = leftRunningMap[frame].split(' ');
			left = Math.max(finalLeft - speed * ratio, initLeft);
			if (left === initLeft) {
				right = true;
				frame = 4;
				success();
				return;
			}
		}
		if (++frame === frameLength) {
			frame = 0;
		}
		$rabbit2.style.backgroundImage = 'url(' + images[0] + ')';
		$rabbit2.style.backgroundPosition = position[0] + 'px ' + position[1] + 'px';
		$rabbit2.style.left = left + 'px';
	}).repeat(1).wait(1000).changePosition($rabbit2, rabbitWinMap, images[2]).then(function () {
		console.log('finish');
	});
	runAnimation.start(interval);
}

function win() {
	var winAnimation = animation().loadImage(images).changePosition($rabbit3, rabbitWinMap, images[2]).repeat(3).then(function () {
		console.log('win animation repeat 3 times and finished');
		winAnimation.dispose();
	});
	winAnimation.start(200);
}

function lose() {
	var loseAnimation = animation().loadImage(images).changePosition($rabbit4, rabbitLoseMap, images[1]).then(function () {
		console.log('lose animation finished');
		loseAnimation.dispose();
	});
	loseAnimation.start(200);
}

function $(id) {
	return document.getElementById(id);
}