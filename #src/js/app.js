let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));


window.addEventListener('load', function () {
	
	document.body.classList.add('is-load');

	// ==== ADD PADDING-TOP ================================
	{
		let wrapper = document.querySelector('._padding-top');
		if (wrapper) {
			let header = document.querySelector('.header');
			if(header) {
				const setPedding = () => wrapper.style.paddingTop = header.clientHeight + 'px';
				setPedding();
				let id = setInterval(setPedding, 200);
				setTimeout(() => {
					clearInterval(id);
				},1000)
				window.addEventListener('resize', setPedding);
			}
			
		}
	}
	// ==== AND ADD PADDING-TOP ================================

	@@include('_function.js');
	@@include('../common/popup/popup.js');
	@@include('../common/header/header.js');
	@@include('../common/about/about.js');
	@@include('../common/testimonials/testimonials.js');
	@@include('../common/instagram/instagram.js');
	@@include('../common/popup/popup-gallery.js');
	@@include('../common/video/video.js');


	let buttonsScrollTop = document.querySelectorAll('.btn-scroll-top');
	if(buttonsScrollTop.length) {
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

		if(!items.length) return

		items.forEach(item => {
			let id = item.getAttribute('href').match(/#\w+$/gi).join('').replace('#', '');
			item.addEventListener('click', (e) => {

				let el = document.getElementById(id);

				if(el) {
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

					if(id === hrefData) {
						item.classList.add('active');
					} else {
						item.classList.remove('active');
					}
				})
			}
		}
	}

	const menuItems = menuItemsHandler();

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			// console.log(entry.target.offsetTop);
			// console.log(entry.target.id);
			if(entry.isIntersecting) {
				if(entry.target.id) {
					menuItems.setActiveItem(entry.target.id);
				}
			}
		})
	}, {threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]});

	document.querySelectorAll('main > section').forEach(
		(section) => observer.observe(section)
	)

});

window.addEventListener('DOMContentLoaded', function() {
	if(isMobile.any()) {
		document.body.classList.add('_is-mobile');
	}

	@@include('files/dynamic_adapt.js');

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
