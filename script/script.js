window.addEventListener("DOMContentLoaded", function(){
	// video interface
	main_video.addEventListener("loadeddata", function(){
		main_video.muted=true;
		main_video.play();
	});
	main_video.addEventListener("ended", function(){
		main_video.currentTime=0;
		main_video.play();
	})
	ft_video.addEventListener("loadeddata", function(){
		ft_video.muted=true;
		ft_video.play();
	});
	ft_video.addEventListener("ended", function(){
		ft_video.currentTime=0;
		ft_video.play();
	});

	// swiperjs interface
	var swiper=new Swiper(".mySwiper", {
			slidesPerView: 2,
			slidesPerGroup: 2,
			centeredSlides: false,
			spaceBetween: 20,
			pagination: {
			el: ".swiper-pagination"
			},
			clickable: true,
			breakpoints: {
				1000: {
					slidesPerView: 3,
					slidesPerGroup: 3,
				},
			},
		}
	);

	// pc interface
	let deviceStatus;
	let mainWheelAble=true;
	let t=0;
	let mainN=0;
	let mainWheelTotal=3;
	let moving=false;
	let mainCategoryH, winW, winH, timer;

	let wheelArea=document.querySelector(".wheel_area");
	let wheelContainer=wheelArea.firstElementChild;
	let wheelSection=wheelContainer.children;
	let body=document.body;
	let header=document.getElementById("header");
	let gnb=document.getElementById("gnb");
	let gnbLi=gnb.getElementsByTagName("li");
	let pdfBtn=document.querySelector(".pdf_down");
	let tab=document.querySelector(".tab");
	let logo=this.document.querySelector(".logo");
	let mobile_menu=document.querySelector(".mobile_menu");
	let mobileLi=mobile_menu.getElementsByTagName("li");
	let main=document.getElementById("main");
	let aboutme=document.getElementById("aboutme");
	let speciality=document.getElementById("speciality");
	let portfolio=document.getElementById("portfolio");
	let right_menu=document.querySelector(".right_menu");
	let mobilePageList=[main, aboutme, speciality, portfolio];

	function buttonActive(n=mainN){
		for(let i=0; i<gnbLi.length; i++){
			if(i == n){
				gnbLi[i].classList.add("active");
				mobileLi[i].classList.add("active");
			}
			else{
				gnbLi[i].classList.remove("active");
				mobileLi[i].classList.remove("active");
			}
		}
	}
	function indexWheelMoving(){
		let targetY=mainN*-1*mainCategoryH;
		moving=true;

		gsap.to(wheelContainer, {top: targetY, duration: 0.8, onComplete: function(){
			buttonActive();
			moving=false;
		}});
	}
	function pageScrollMoving(h){
		moving=true;

		if(h == 0){ // 0, 1, 2
			gsap.to(window, {scrollTo: 0, duration: 0.3, onComplete: function(){
				mainN=mainWheelTotal-1;
				buttonActive();
				mainWheelAble=true;
				moving=false;

				if(main.classList.contains("fixed") == true) main.classList.remove("fixed");

				// pdfBtn.style.display="none";
			}});
		}
		else{ // 3
			gsap.to(window, {scrollTo: h, duration: 0.3, onComplete: function(){
				mainN=mainWheelTotal;
				buttonActive();
				mainWheelAble=false;
				moving=false;

				if(main.classList.contains("fixed") == false) main.classList.add("fixed");
				if(portfolio.classList.contains("active") == false) portfolio.classList.add("active");

				// gsap.fromTo(pdfBtn, {display: "block", opacity: 0}, {opacity: 1, duration: 0.3});
			}});
		}
	}
	function pcClickMoving(){
		if(deviceStatus == "mobile" || moving == true) return;

		buttonActive();

		if(mainN < mainWheelTotal){ // 0, 1, 2
			gsap.to(window, {scrollTo: 0, duration: 0.3, onComplete: function(){
				indexWheelMoving();
				mainWheelAble=true;
				moving=false;

				if(main.classList.contains("fixed") == true) main.classList.remove("fixed");
				main.classList.remove("active");
				// pdfBtn.style.display="none";
			}});
		}
		else if(mainN == mainWheelTotal){ // 3
			gsap.to(window, {scrollTo: winH, duration: 0.3, onComplete: function(){
				mainWheelAble=true;
				moving=false;

				if(main.classList.contains("fixed") == false) main.classList.add("fixed");
				if(portfolio.classList.contains("active") == false) portfolio.classList.add("active");

				// gsap.fromTo(pdfBtn, {display: "block", opacity: 0}, {opacity: 1, duration: 0.3});
			}});
		}
	}
	function init(){
		winH=window.innerHeight;
		winW=window.innerWidth;
		winHalf=winH/2;

		if(winW > 720){
			deviceStatus="pc";
		}
		else{
			deviceStatus="mobile";
		}

		let wheelAreaHeight=winH*68/100;
		wheelArea.style.height=wheelAreaHeight+"px";
		mainCategoryH=wheelAreaHeight-30;

		for(let i=0; i<wheelSection.length; i++){
			wheelSection[i].style.height=mainCategoryH+"px";
		}

		setTimeout(function(){
			gsap.to(window, {scrollTo: 0, duration: 0.3});
			indexWheelMoving();
			buttonActive();
		}, 50);
	}
	init();

	window.addEventListener("resize", function(){
		if(moving == true) return;

		clearTimeout(timer);

		timer=setTimeout(function(){
			winW=window.innerWidth;
			winH=window.innerHeight;
			winHalf=winH/2;

			if(winW > 720){
				deviceStatus="pc";
			}
			else{
				deviceStatus="mobile";
			}
			if(deviceStatus == "pc"){
				let wheelAreaHeight=winH*68/100;
				wheelArea.style.height=wheelAreaHeight+"px";
				mainCategoryH=wheelAreaHeight-30;

				for(let i=0; i<wheelSection.length; i++){
					wheelSection[i].style.height=mainCategoryH+"px";
				}

				if(mainN < mainWheelTotal){ // 0, 1, 2
					let targetY=mainN*-1*mainCategoryH;

					if(main.classList.contains("fixed") == true) main.classList.remove("fixed");

					gsap.to(window, {scrollTo: 0, duration: 0.3});
					gsap.to(wheelContainer, {top: targetY, duration: 0.3});
				}
				else{ // 3
					if(main.classList.contains("fixed") == false) main.classList.add("fixed");

					pageScrollMoving(winH);
				}
				mobile_menu.classList.remove("active");
				body.classList.remove("fixed");
				tab.classList.remove("active");
				logo.classList.remove("active");
			}
			else{
				if(mainN >= 1){
					if(main.classList.contains("fixed") == false) main.classList.add("fixed");
				}

				let pos=mobilePageList[mainN].offsetTop;

				gsap.to(window, {scrollTo: pos, duration: 0.3, onComplete: function(){
					moving=false;
				}});
			}

			buttonActive();
		}, 10);
	});
	wheelArea.addEventListener("mousewheel", function(e){
		if(deviceStatus == "mobile" || moving == true) return;

		clearTimeout(timer);

		timer=setTimeout(function(){
			if(e.deltaY < 0){
				if(mainN > 0){
					mainN-=1;
				}
				else{
					return;
				}
			}
			else{
				if(mainN < mainWheelTotal-1){ // 0, 1, 2
					mainN+=1;
				}
				else{
					pageScrollMoving(winH);
					return;
				}
			}

			indexWheelMoving();
		}, 50);
	});
	portfolio.addEventListener("mousewheel", function(e){
		if(deviceStatus == "mobile" || moving == true) return;

		clearTimeout(timer);

		timer=setTimeout(function(){
			t=portfolio.scrollTop;

			if(t == 0 && e.deltaY < 0){
				pageScrollMoving(0);
				buttonActive();
			}
		}, 50);
	});

	for(let i=0; i<gnbLi.length; i++){
		gnbLi[i].index=i;

		gnbLi[i].addEventListener("click", function(e){
			e.preventDefault();
			mainN=e.currentTarget.index;
			pcClickMoving();
		});
	}

	// mobile interface
	function mobileClickMoving(){
		if (deviceStatus == "pc" || moving == true) return;

		for(let i=0; i<mobilePageList.length; i++){
			mobilePageList[i].index=i;

			if(i == mainN){
				let pos=mobilePageList[i].offsetTop;

				gsap.to(window, {scrollTo: pos, duration: 0.8, delay: 0.4});
			}
		}
	}

	tab.addEventListener("click", function(e){
		e.preventDefault();
		mobile_menu.classList.toggle("active");
		body.classList.toggle("fixed");
		this.classList.toggle("active");
		logo.classList.toggle("active");
	});

	for(let i=0; i<mobileLi.length; i++){
		mobileLi[i].index=i;

		mobileLi[i].addEventListener("click", function(e){
			e.preventDefault();
			mainN=e.currentTarget.index;
			mobile_menu.classList.remove("active");
			body.classList.remove("fixed");
			tab.classList.remove("active");
			mobileClickMoving();
			buttonActive();
		});
	}
	document.addEventListener("scroll", function(){
		if(deviceStatus == "pc" || moving == true) return;

		clearTimeout(timer);

		timer=setTimeout(function(){
			t=window.pageYOffset;

			if(t < aboutme.offsetTop-winHalf){
				mainN=0;
			}
			else if(t < speciality.offsetTop-winHalf){
				mainN=1;
			}
			else if(t < portfolio.offsetTop-winHalf){
				mainN=2;
			}
			else{
				mainN=3;
			}
			if(mobilePageList[mainN].classList.contains("active") == false){
				mobilePageList[mainN].classList.add("active");
			}
			if(mainN >= 1){
				if(main.classList.contains("fixed") == false) main.classList.add("fixed");
			}
			else{
				if(main.classList.contains("fixed") == true) main.classList.remove("fixed");
			}
		}, 50);

		buttonActive();
	});

	/* project interface */
	let project=document.getElementsByClassName("project");
	let projectN=0;
	project[0].classList.add("active");

	for(let i=0; i<project.length; i++){
		project[i].index=i;
		let projectTitle=project[i].firstElementChild.firstElementChild;

		projectTitle.addEventListener("click", function(e){
			e.preventDefault();
			projectN=e.currentTarget.parentElement.parentElement.index;

			for(let j=0; j<project.length; j++){
				if(j == projectN){
					project[j].classList.add("active");

					if(deviceStatus == "mobile"){
						gsap.to(window, {scrollTo: project[j].offsetTop-150, duration: 0.4});
					}
					else{
						let portPadding=250;
						let protHeight=300;
						let portTargetY=portPadding+protHeight*projectN;

						gsap.to(portfolio, {scrollTo: portTargetY-100, duration: 0.4});
					}
				}
				else{
					project[j].classList.remove("active");
				}
			}
		});
	}

	let my_photo=document.querySelector(".my_photo");
	console.log(my_photo);

	my_photo.addEventListener("mouseover", function(){
		my_photo.classList.add("active");
	});
	my_photo.addEventListener("mouseleave", function(){
		my_photo.classList.remove("active");
	});
});