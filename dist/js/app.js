let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));


window.addEventListener('load', function () {

	document.body.classList.add('is-load');

	// ==== ADD PADDING-TOP ================================
	{
		let wrapper = document.querySelector('._padding-top');
		if (wrapper) {
			let header = document.querySelector('.header');
			if (header) {
				const setPedding = () => wrapper.style.paddingTop = header.clientHeight + 'px';
				setPedding();
				let id = setInterval(setPedding, 200);
				setTimeout(() => {
					clearInterval(id);
				}, 1000)
				window.addEventListener('resize', setPedding);
			}

		}
	}
	// ==== AND ADD PADDING-TOP ================================

	//SlideToggle
function _slideUp(target, duration = 500) {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
function _slideDown (target, duration = 500) {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;
	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		target.classList.remove('_slide');
	}, duration);
}
function _slideToggle (target, duration = 500) {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (window.getComputedStyle(target).display === 'none') {
			return _slideDown(target, duration);
		} else {
			return _slideUp(target, duration);
		}
	}
}
//========================================







//Spollers
function spollerInit() {
	let spollers = document.querySelectorAll("._spoller");
	if (spollers.length > 0) {
		for (let index = 0; index < spollers.length; index++) {
			const spoller = spollers[index];

			if(spoller.classList.contains('_active')) {
				_slideDown(spoller.nextElementSibling);
			}

			spoller.addEventListener("click", function (e) {
				e.preventDefault();
				if (spoller.classList.contains('_spoller-992') && window.innerWidth > 992) {
					return false;
				}
				if (spoller.classList.contains('_spoller-768') && window.innerWidth > 768) {
					return false;
				}
				if (spoller.closest('._spollers').classList.contains('_one')) {
					let curent_spollers = spoller.closest('._spollers').querySelectorAll('._spoller');
					for (let i = 0; i < curent_spollers.length; i++) {
						let el = curent_spollers[i];
						if (el != spoller) {
							el.classList.remove('_active');
							el.parentElement.classList.remove('_active');
							_slideUp(el.nextElementSibling);
						}
					}
				}
				spoller.classList.toggle('_active');
				if(spoller.classList.contains('_active')) {
					spoller.parentElement.classList.add('_active');
				} else {
					spoller.parentElement.classList.remove('_active');
				}
				_slideToggle(spoller.nextElementSibling);
			});
		}
	}
}
spollerInit()
// === // Spollers ==================================================================






function createTabs(containerName = false, triggersName = false, tabsName = false) {
	let container = document.querySelector(`${containerName}`);
	if (container) {
		let allTriggers = container.querySelectorAll(`${triggersName}`);
		let allTabs = container.querySelectorAll(`${tabsName}`);

		if (allTriggers.length) {
			allTriggers.forEach(trigger => {
				trigger.addEventListener('click', (e) => {
					e.preventDefault();
					const id = trigger.getAttribute('href').replace('#', '');

					trigger.classList.add('active');

					allTriggers.forEach(i => {
						if (i == trigger) {
							return
						}
						i.classList.remove('active');
					});

					allTabs.forEach(tab => {
						if (tab.id == id) {
							tab.classList.add('active')
						} else {
							tab.classList.remove('active');
						}
					})

				})
			})
		}

	}
}

//createTabs('.tabs', '.tab-trigger', '.tab-content')


function setSameHeight(items) {
    if(!items.length) return;

    let maxHeight = Math.max(...Array.from(items).map(i => i.clientHeight));
    items.forEach(i => i.style.minHeight = maxHeight + 'px');
}

function setCounterAnim() {
	let couterItems = document.querySelectorAll('[data-counter]');
    if (couterItems) {
        couterItems.forEach(item => {
            let animation = anime({
                targets: item,
                textContent: [0, item.dataset.counter || 0],
                round: 1,
                easing: 'linear',
                autoplay: false,
                duration: 1000
            });
            const observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.intersectionRatio >= 0.7) {
                            animation.play();
                            observer.disconnect();
                        }
                    });
                },
                {
                    threshold: 0.7
                }
            );

            observer.observe(item);
        })
    }
}

setCounterAnim();

let anchors = document.querySelectorAll('.anchor');
if(anchors.length) {
	anchors.forEach(anchor => {
	//	var elementClick = $(this).attr("href").match(/#\w+$/gi).join(''); 
		let id = anchor.getAttribute('href').match(/#\w+$/gi).join('').replace('#', '');
		anchor.addEventListener('click', (e) => {

			let el = document.getElementById(id);
			if(el) {
				e.preventDefault();
				window.scrollTo({
					top: el.offsetTop,
					behavior: 'smooth',
				})
			}

		})
	})
};
	// ==== Popup form handler====

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

let closeCallbacks = {}

if(popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function(e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}


const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length > 0) {
	for(let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function(e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if(curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', function(e) {
			if(!e.target.closest('.popup_content')) {
				popupClose(e.target.closest('.popup'));
			}
		});

	}
}

function popupClose(popupActive, doUnlock = true) {
	if(unlock) {
		popupActive.classList.remove('open');
		if(doUnlock) {
			bodyUnlock();
		}
	}
	if(popupActive.id) {
		if(closeCallbacks[popupActive.id]) {
			closeCallbacks[popupActive.id]();
		}
	}

}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
	let targetPadding = document.querySelectorAll('._lp');
	if(targetPadding.length) {
		for (let index = 0; index < targetPadding.length; index++) {
			const el = targetPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	if(lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	let targetPadding = document.querySelectorAll('._lp');

	setTimeout(function() {
		if(targetPadding.length) {
			for (let index = 0; index < targetPadding.length; index++) {
				const el = targetPadding[index];
				el.style.paddingRight = '0px';
			}
		}

		for( let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}

		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function() { 
		unlock = true;
	}, timeout);
}

document.addEventListener('keydown', function(e) {
	if(e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

// === Polyfill ===
	(function() {
		if(!Element.prototype.closest) {
			Element.prototype.closest = function(css) {
				var node = this;
				while(node) {
					if(node.matches(css)) return node;
					else node == node.parentElement;
				}
				return null;
			};
		}
	})();

	(function() {
		if(!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.mozMatchesSelector;
		}
	})();
// === AND Polyfill ===


let allPopup = document.querySelectorAll('.popup');
if(allPopup.length) {
	const setScrollBoxHeight = (head, box) => {
		box.style.maxHeight = (document.documentElement.clientHeight - head.clientHeight) + 'px';
	}
	allPopup.forEach(popup => {
		let head = popup.querySelector('.popup-head');
		let scrollBox = popup.querySelector('.popup-scroll-wrap');
		if(head && scrollBox) {
			setScrollBoxHeight(head, scrollBox);
			window.addEventListener('resize', () => setScrollBoxHeight(head, scrollBox));

			scrollBox.addEventListener('scroll', () => {
				scrollBox.classList.toggle('is-scroll', scrollBox.scrollTop > 30);
			})
		}
	})
}

window.popup = (() => {
	return {
		open(id) {
			if(!id) return;
			
			let popup = document.querySelector(id);

			if(!popup) return; 

			popupOpen(popup);
		}, 
		close(id) {
			if(!id) return;
			
			let popup = document.querySelector(id);

			if(!popup) return;

			popupClose(popup);
		},
		addEvent(event, popupId, callback) {
			if(event === 'close') {
				closeCallbacks[popupId] = callback;
			}
		} 
	}
})();
	{
    let header = document.querySelector('.header');
    if(header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('is-scroll', window.pageYOffset > 50);
        })
    }
};
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
};
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
};
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
};
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
};
	function videoHandler(videoBLock) {
	if(!videoBLock) return;
	let video = videoBLock.querySelector('.video__payer');
	let playBtn = videoBLock.querySelector('.video__play');
	let pauseBtn = videoBLock.querySelector('.video__pause');

	let playEventsCallback = [];
	let pauseEventsCallback = [];

	const togglePlayPause = (play) => {
		if(play) {
			video.play();
			video.setAttribute('controls', true)
			playBtn.style.display = 'none';
			pauseBtn.style.display = 'block';

			if(playEventsCallback.length) {
				playEventsCallback.forEach(callback => {
					callback();
				})
			}
		} else {
			video.pause();
			video.removeAttribute('controls');
			playBtn.style.display = 'block';
			pauseBtn.style.display = 'none';

			if(pauseEventsCallback.length) {
				pauseEventsCallback.forEach(callback => {
					callback();
				})
			}
		}
	}

	video.addEventListener('ended', () => {
		togglePlayPause(false);
	});

	video.addEventListener('play', () => {
		togglePlayPause(true);
	});
	video.addEventListener('pause', () => {
		playBtn.style.display = 'block';
		pauseBtn.style.display = 'none';
	});

	videoBLock.addEventListener('mouseenter', (e) => { 
		if(!video.paused) {
			pauseBtn.style.opacity = '1';
		} 
	});
	videoBLock.addEventListener('mouseleave', (e) => { 
		if(!video.paused) {
			pauseBtn.style.opacity = '0';
		} 
	});

	playBtn.addEventListener('click', () => {
		togglePlayPause(true);
	})
	pauseBtn.addEventListener('click', () => {
		togglePlayPause(false);
	})

	return {
		block: videoBLock,
		play() {
			togglePlayPause(true);
		},
		pause() {
			togglePlayPause(false);
		},
		subscribe(string, callback) {
			if(string === 'play') {
				playEventsCallback.push(callback);
			} else if (string === 'pause') {
				pauseEventsCallback.push(callback);
			}
		}
	}

};


	let buttonsScrollTop = document.querySelectorAll('.btn-scroll-top');
	if (buttonsScrollTop.length) {
		buttonsScrollTop.forEach(btn => {
			btn.addEventListener('click', () => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				})
			})
		})
	}

	let wow = new WOW({
		boxClass: '_anim',
		offset: 4,
	})
	wow.init();


	function menuItemsHandler() {
		let items = document.querySelectorAll('.popup-menu__list-link');

		if (!items.length) return

		items.forEach(item => {
			let id = item.getAttribute('href').match(/#\w+$/gi).join('').replace('#', '');
			item.addEventListener('click', (e) => {

				let el = document.getElementById(id);

				if (el) {
					e.preventDefault();
					window.scrollTo({
						top: el.offsetTop - 40,
						behavior: 'smooth',
					})
					popup.close('#mainMenu');
				}
			})
		})

		return {
			setActiveItem(id) {
				items.forEach(item => {
					let hrefData = item.getAttribute('href').match(/#\w+$/gi).join('').replace('#', '');

					if (id === hrefData) {
						item.classList.add('active');
					} else {
						item.classList.remove('active');
					}
				})
			}
		}
	}

	const menuItems = menuItemsHandler();

	let mainSections = document.querySelectorAll('main > section');
	if (mainSections.length) {
		let header = document.querySelector('.header')

		window.addEventListener('scroll', () => {
			mainSections.forEach(section => {
				let top = section.getBoundingClientRect().top;
				let bottom = section.getBoundingClientRect().bottom;
				let halfHeightOfWindow = (document.documentElement.clientHeight - header.clientHeight) / 2;

				if (top < halfHeightOfWindow && bottom >= halfHeightOfWindow) {
					if(section.id) {
						menuItems.setActiveItem(section.id);
					}
				}

			})
		})
	}
});

window.addEventListener('DOMContentLoaded', function () {
	if (isMobile.any()) {
		document.body.classList.add('_is-mobile');
	}

	// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		//customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());;

	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});

});
