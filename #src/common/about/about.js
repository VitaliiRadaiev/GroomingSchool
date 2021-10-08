{
    let slider = document.querySelector('.about-gallery__slider');
    if(slider) {
        let mySwiper;

		function mobileSlider() {
			if(document.documentElement.clientWidth <= 767 && slider.dataset.mobile == 'false') {
				mySwiper = new Swiper(slider, {
                    autoplay: {
                        delay: 1,
                        disableOnInteraction: false,
                    },
					slidesPerView: 'auto',
                    spaceBetween: 20,
					speed: 5000,
                    loop: true,
                    freeMode: true,
				});

				slider.dataset.mobile = 'true';
			}

			if(document.documentElement.clientWidth > 767) {
				slider.dataset.mobile = 'false';

				if(slider.classList.contains('swiper-container-initialized')) {
					mySwiper.destroy();
				}
			}
		}

		mobileSlider();

		window.addEventListener('resize', () => {
			mobileSlider();
		})
    }
}