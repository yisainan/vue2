+(function($){
	'use strict';
	var index = {
		init: function(){
			this.common();
		},
		common:function(){
			$(".wrap-box").height($(window).height());
			$(".btn1").on("click",function(){
				$(".page1").hide();
				$(".page2").show();	
			})
		},
		page2:function(){
		}
	}
	index.init();
	
}(jQuery))

var hdsj={
	scrolls :{
		startX:0,
		startY:0, 
		scrX:0,
		scrY:0,
		ids:0,
		leng:null,
		isscrx:0,
		isscry:0,
		i:0,
		sud:15,
		dfg:0,
		ischen:0,
		//curvature: 0.001, //曲率
	},
	touchSatrtFunc:function(evt){
		//evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
		var touch = evt.touches[0]; //获取第一个触点  
		var x = Number(touch.pageX); //页面触点X坐标  
		var y = Number(touch.pageY); //页面触点Y坐标  
		//记录触点初始位置 
		_self.scrolls.startX =x;  
		_self.scrolls.startY =y; 
		
	},
	touchMoveFunc:function(evt){
		evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
		//evt.stopPropagation();//阻止事件冒泡
		var touch = evt.touches[0]; //获取第一个触点   
		var x = Number(touch.pageX); //页面触点X坐标  加不加number 都一样，都是number类型  
		var y = Number(touch.pageY); //页面触点Y坐标
		var lef = 0;
		//_self.scrolls.scrX = _self.scrolls.isscrx*1 + ((x - _self.scrolls.startX)*3)/2;
		_self.scrolls.scrX = _self.scrolls.isscrx*1 + (x - _self.scrolls.startX);
		_self.scrolls.scrY= _self.scrolls.isscry*1 +(y - _self.scrolls.startY);
		//console.log(_self.scrolls.scrX+" "+_self.scrolls.scrY)
		//判断滑动方向  	
		_self.scrolls.sud = _self.scrolls.isscrx*1;
		// $(this)[0].style.webkitTransition='-webkit-transform 0.2s ease-out';
		$(this)[0].style.webkitTransform = 'translate3d('+ (_self.scrolls.scrX) +'px,'+ (0.001*_self.scrolls.scrX*_self.scrolls.scrX+b*_self.scrolls.scrX) +'px, 0)';
		console.log(_self.scrolls.scrX +" "+(_self.scrolls.scrX*-0.5))  // 23 324 286 143
	},
	touchEndFunc:function(){
		//evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等  
		//evt.stopPropagation();//阻止事件冒泡
		//_self.scrolls.leng = $(this).children().length;
		//var is = $('.is_left').eq(_self.scrolls.i).offset().left-$('.chen').width()/2;
		//console.log(is);
		if(_self.scrolls.scrX<0){
			if(is < _self.scrolls.scrX){
				_self.scrolls.ids=_self.scrolls.leng-1;
			}else{
				_self.scrolls.ids++;
			}
		}else if(_self.scrolls.scrX>0){
			if(_self.scrolls.ids==0){
				_self.scrolls.ids=0;
			}else{
				_self.scrolls.ids--;
			}
		}	
		_self.scrolls.isscrx = _self.scrolls.scrX;
		_self.scrolls.isscry = _self.scrolls.scrY;
	}, 
	init:function(obj){
		_self = this;
		$('.'+obj).attr('data-ids',0);
		$('.'+obj)[0].addEventListener('touchstart', _self.touchSatrtFunc, false);  
		$('.'+obj)[0].addEventListener('touchmove', _self.touchMoveFunc, false);  
		$('.'+obj)[0].addEventListener('touchend', _self.touchEndFunc, false);
	}	
};
$(function(){
	hdsj.init('element1');
	//touchmove("target1","element1")
})

	var b=0,c=0,a = 0.005;
	var target = document.getElementById("target1");
	var element = document.getElementById("element1");
	console.log(target,element)
	var rectElement = {}, rectTarget = {};
	var centerElement = {}, centerTarget = {};
	rectElement = element.getBoundingClientRect();
	rectTarget = target.getBoundingClientRect();
	centerElement = {
		dx: rectElement.left + (rectElement.right - rectElement.left) / 2 ,
		dy: rectElement.top + (rectElement.bottom - rectElement.top) / 2
	}
	cx = -1 * (centerElement.dx-rectTarget.left);
	cy = -1 * (centerElement.dy-rectTarget.top);
	b = (cy - a * cx * cx) / cx ;


$(function(){
	var ht = $(window).height();
	var wh = $(window).width();
	var cas = document.getElementById("cas");
	cas.width = wh;
	cas.height = ht;
	var cts = cas.getContext('2d');
	var img = document.getElementById("cai");
	cts.drawImage(img,0,0,wh,ht);
	$('#hui').eraser({
	  progressFunction: function(p) {
		console.log(Math.round(p*100)+'%');
		$(".hint1").fadeOut();
		//$('#progress').html(Math.round(p*100)+'%');
		if(p>0.15){
			setTimeout(function(){
				$("#cas").addClass("transition1");
				$("#hui").hide();
			},1000)
		}
	  }
	});
	$('#resetBtn').click(function(event) {
	  $('#redux').eraser('reset');
		$('#progress').html('0%');
	  event.preventDefault();
	});
	
	$('#clearBtn').click(function(event) {
	  $('#redux').eraser('clear');
		$('#progress').html('100%');
	  event.preventDefault();
	});
});