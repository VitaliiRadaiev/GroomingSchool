let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };

let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));



window.addEventListener('load', function () {

	@@include('_function.js');
	@@include('../common/popup/popup-gallery.js');
	@@include('../common/video/video.js');
	@@include('../common/instagram/instagram.js');
	@@include('../common/about/about.js');
	@@include('../common/testimonials/testimonials.js');

});

window.addEventListener('DOMContentLoaded', function () {
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
	
		@@include('../common/header/header.js');
		@@include('../common/popup/popup.js');



	if (isMobile.any()) {
		document.body.classList.add('_is-mobile');
	}

	@@include('files/dynamic_adapt.js');


	let instagramImgAll = document.querySelectorAll('.sbi_photo_wrap');
	if (instagramImgAll.length) {
		instagramImgAll.forEach(img => {
			img.classList.add('_anim', 'flipInX');
		})
	}

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
			if (item.getAttribute('href').match(/#\w+$/gi)) {
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
			}
		})

		return {
			setActiveItem(id) {
				items.forEach(item => {
					if (!item.getAttribute('href').match(/#\w+$/gi)) return;

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
					if (section.id) {
						menuItems.setActiveItem(section.id);
					}
				}

			})
		})
	}

	//Placeholers
	let inputs = document.querySelectorAll('input');
	inputs_init(inputs);

	function inputs_init(inputs) {
		if (inputs.length > 0) {
			for (let index = 0; index < inputs.length; index++) {
				const input = inputs[index];

				if (input.classList.contains('_mask')) {
					//'+7(999) 999 9999'
					//'+38(999) 999 9999'
					//'+375(99)999-99-99'
					input.classList.add('_mask');
					Inputmask('+9(999) 999 9999', {
						//"placeholder": '',
						clearIncomplete: true,
						clearMaskOnLostFocus: true,
						onincomplete: function () {
							//input_clear_mask(input, input_g_value);
						}
					}).mask(input);
				}
				if (input.classList.contains('_date')) {
					datepicker(input, {
						formatter: (input, date, instance) => {
							const value = date.toLocaleDateString()
							input.value = value
						},
						onSelect: function (input, instance, date) {
							input_focus_add(input.el);
						}
					});
				}
			}
		}
	}

});
