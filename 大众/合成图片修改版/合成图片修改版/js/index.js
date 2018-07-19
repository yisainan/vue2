+(function($){
	'use strict';
	var n1 = 0;
	var index = {
		init: function(){
			this.common();
			//this.verticalCenter();
		},
		common:function(){
			//index.verticalCenter($("#pic"),"pic");
			$(".wrap-box").height($(window).height());
			$(".btn1").on("click",function(){
				$(".page1").hide();
				$(".page2").show();	
			})
			$(".lz").on('click','.lz-ck',function(){
				var ln =$(this).index();
				console.log(ln);
				if(ln ==0){
					$(this).next().addClass("lz-ck");
					$(".lz-light img").eq(ln).show();
					$(".p4-imgop").addClass("op1");
				}else if(ln == 1){
					$(this).next().addClass("lz-ck");
					$(".lz-light img").eq(ln).show();
					$(".p4-imgop").addClass("op2")
				}else if(ln == 2){
					$(this).next().addClass("lz-ck");
					$(".lz-light img").eq(ln).show();
					$(".p4-imgop").addClass("op3")
				}else if(ln == 3){
					$(this).next().addClass("lz-ck");
					$(".lz-light img").eq(ln).show();
					$(".p4-imgop").addClass("op4")
					$(".hint2").hide();
					setTimeout(function(){
						$(".page4").addClass("transition2");
						setTimeout(function(){
							$(".page3").fadeIn();
							$(".page4").fadeOut();
						},800)
					},1000)
					
				}
			});
			$(".end-btn1").on('click',function(){
				$(".end").hide();;
			})
			$(".end-btn2").on('click',function(){
				$(".end").hide();
				$(".picture").show();
			})
			//祝福语
			$(".ble-text").on('click',function(){
				$(".template1").show().animate({bottom:0},300);
			})
			//文字模板返回
			$(".tem1-btn1").on('click',function(){
				$(".template1").animate({bottom:"-5rem"},200);	
			})
			//文字选用；
			$(".tem1-btn2").on('click',function(){
			var text = $(".template1 .swiper-slide-active .sw-text").attr("data-value")
			document.getElementById("t2text").value = text;
			console.log(text);
			$(".template1").animate({bottom:"-5rem"},200);	
			})
			// $(".return").on('click',function(){
			// 	$(".picture").fadeOut();
			// 	$(".end").show();	
			// });
			$(".imagesbtn").on('click',function(){
				$(".picture").hide();
				$(".template2").show();
				var swiper1 = new Swiper('.swiper-container1', {
					pagination: '.swiper-pagination',
					slidesPerView: 'auto',
					centeredSlides: true,
					paginationClickable: true,
					spaceBetween: 20,
					loop:true,
					initialSlide :1,
					nextButton: '.swiper-button-next',
					prevButton: '.swiper-button-prev',
				});
			})
			$(".tem2-btn1").on("click",function(){
				$(".picture").show();
				$(".template2").hide();	
			})
			
		},
		verticalCenter: function(obj,id){ //弹窗垂直居中
			var isOpen = 0;
			function center(obj,id){
				console.log(obj+"|||"+id)
				obj.fadeIn(); 	
				var selfWidth = document.getElementById(id).offsetWidth;
				var selfHeight = document.getElementById(id).offsetHeight;
				var screenWidth = $(window).width();
				var screenHeight = $(window).height();
				var scollTop = $(document).scrollTop();  
				var objLeft = (screenWidth - selfWidth) / 2;
				var objTop = (screenHeight - selfHeight) / 2;
				obj.css({
					left:objLeft + "px",
					top:objTop + "px"	
				})  
			}
			center(obj,id);
			$(window).resize(function() {  //窗口
				if (isOpen == 1) {
					//重新获取数据  
					var selfWidth = document.getElementById(id).offsetWidth;
					var selfHeight = document.getElementById(id).offsetHeight;
					var screenWidth = $(window).width();
					var screenHeight = $(window).height();
					var scollTop = $(document).scrollTop();  
					var objLeft = (screenWidth - selfWidth) / 2;
					var objTop = (screenHeight - selfHeight) / 2;
					obj.css({  
						left:objLeft + "px",  
						top:objTop + "px"  
					});  
					obj.fadeIn(500);  
				}  
			});  
			$(window).scroll(function() {  //滚动条
				if (isOpen == 1) {  
					//重新获取数据  
					var selfWidth = document.getElementById(id).offsetWidth;
					var selfHeight = document.getElementById(id).offsetHeight;
					var screenWidth = $(window).width();
					var screenHeight = $(window).height();
					var scollTop = $(document).scrollTop();  
					var objLeft = (screenWidth - selfWidth) / 2;
					var objTop = (screenHeight - selfHeight) / 2;
					obj.css({  
						left:objLeft + "px",  
						top:objTop + "px"  
					});  
					obj.fadeIn(500);  
				}  
			});  
		},
		page2:function(){
		}
	}
	index.init();
	
}(jQuery))
