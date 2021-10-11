{
    let popupGalleries = document.querySelectorAll('.popup-gallery');
    if(popupGalleries.length) {
        popupGalleries.forEach(gallery => {
            let videos = gallery.querySelectorAll('.video');
            let players = [];
            if (videos.length) {
                videos.forEach(video => {
                    players.push(videoHandler(video));
                })
            }

            popup.addEvent('close', gallery.id, () => {
                players.forEach(player => {
                    player.pause();
                })
            })


            let sliderData = new Swiper(gallery.querySelector('.swiper-container'), {
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 30,
                speed: 800,
                pagination: {
                	el: gallery.querySelector('.swiper-pagination'),
                    type: "fraction",
                },
                navigation: {
                    nextEl: gallery.querySelector('.popup-gallery__btn-next'),
                    prevEl: gallery.querySelector('.popup-gallery__btn-prev'),
                },
                on: {
                    slideChange: (swiper) => {
                        players.forEach(player => {
                            player.pause();
                        })
                    }
                }
            });
        })
    }
}