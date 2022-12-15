$(function(){
	// 1) 화면 크기 조정 관련
	var mainWheelAble;
	var mainN=0;
	var mainCategoryH;
	var mainTotal=3;
	var t=0;
	var winW, winH;
	var timer;

	$(window).resize(function(){
		winW=$(window).width();
		winH=$(window).height();

		if(winW > 720){
			mainWheelAble=true;
		}
		else{
			mainWheelAble=false;
		}

		mainCategoryH=$(".wheel_area").height();
	});
	function init(){
		$(window).trigger("resize");
		$("html").animate({scrollTop: 0}, 400);
	}
	init();
	 $("#gnb ul li").eq(mainN).addClass("active");
	
	// 2) 화면 휠 관련
	$(".wheel_area").mousewheel(function(e, delta){

		
		
		if($(".wheel_container").is(":animated") || mainWheelAble == false) return;
		if(delta > 0){ // up
			if(mainN > 0){
				mainN-=1;
			}
			else{
				return;
			}
		}
		else{
			if(mainN < mainTotal-1){
				mainN+=1;
			}
			else{
				$("html").animate({scrollTop: winH}, 400, function(){
					mainWheelAble=false;
				});
			}
		}
		console.log(winH);
		$("#gnb li").removeClass("active");
		$("#gnb li").eq(mainN).addClass("active");
		
		if(mainN > 0){
			$(".pagedown").addClass("active");
		}
		else{
			$(".pagedown").removeClass("active");
		}

		$(".wheel_container").animate({top: mainN*-1*mainCategoryH}, 400);
	});

	var clickN=0;

	$("#gnb li a").click(function(e){
		e.preventDefault();
		clickN=$(this).parent().index();
		if(clickN > mainTotal-1){
			$("html").animate({scrollTop: winH}, 400, function(){
				mainWheelAble=false;
			});
		}
		else{
			$("html").animate({scrollTop: 0}, 400, function(){
				mainWheelAble=true;
				t=null;
			});
		}
	
		console.log(clickN);
		$(".wheel_container").animate({top: clickN*-1*mainCategoryH}, 400);
		$("#gnb li").removeClass("active");
		$("#gnb li").eq(clickN).addClass("active");
	});

	$("wheel_area").trigger("mousewheel");
	$("#content").mousewheel(function(e, delta){
		if($("html").is(":animated") || mainWheelAble == true) return;

		clearTimeout(timer);

		timer=setTimeout(function(){
			if(Math.round(t) == winH && delta > 0){
			// if(t == 0 && delta > 0){
				$("html").animate({scrollTop: 0}, 400, function(){
					mainWheelAble=true;
					t=null;
				});
			}
		}, 250);
	});
	$(window).scroll(function(){
		t=$(window).scrollTop();
		console.log(t);
		
	});
	
	

	// 3) 비디오 구현 관련
	var video=document.getElementById("main_video");
	video.muted=true;

	function videoDimmed(){
		$("#main_video").hide().css({opacity: 0});

		setTimeout(function(){
			$("#main_video").show().animate({opacity: 1}, 300, function(){
				video.play();
			});
		}, 800);
	}
	video.addEventListener("loadeddata", function(){
		videoDimmed();
	});
	video.addEventListener("ended", function(){
		videoDimmed();
	});

	var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });

	setTimeout(function(){
		$("#content").addClass("active");
	}, 1000);

	var projectN=0;

	$(".project:first").addClass("active");

	$(".project .title_area").click(function(e){
		e.preventDefault();
		var project=$(this).parents(".project");

		if(projectN != project.index()){
			ptojectN=project.index();
			$(".project").removeClass("active");
			project.addClass("active");

			var projectY=$(this).offset().top-60;
			$("html").animate({scrollTop: projectY}, 800);
		}
	});
});