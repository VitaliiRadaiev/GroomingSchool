{
    let instagramSlider = document.querySelector('.instagram__slider');
    if(instagramSlider) {
        
let sliderData = new Swiper(instagramSlider, {
	autoplay: {
		delay: 1,
		disableOnInteraction: false,
	},
	slidesPerView: 'auto',
	spaceBetween: 0,
	speed: 5000,
    loop: true
});
    }
}