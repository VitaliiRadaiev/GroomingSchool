{
    let testimonials = document.querySelector('.testimonials');
    if(testimonials) {
        let sliderData = new Swiper(testimonials.querySelector('.testimonials__slider'), {
            autoplay: {
                delay: 6000,
                disableOnInteraction: false,
            },

            slidesPerView: 1,
            spaceBetween: 30,
            autoHeight: true,
            speed: 800,
            loop: true,
            navigation: {
                nextEl: testimonials.querySelector('.testimonials__slider-btn-next'),
                prevEl: testimonials.querySelector('.testimonials__slider-btn-prev'),
            },
        });
    }
}