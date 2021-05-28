'use strict';

//= ../libs/nouislider/nouislider.min.js
//= ../libs/overlay-scrollbar/OverlayScrollbars.min.js

const slider = document.getElementById('slider');
const calculator = document.getElementById('calculator');
const modules = document.querySelector('.modules__selecting__content');
const cart = document.getElementById('cart');
const sidebarCart = document.getElementById('sidebar-cart');
const menuBtn = document.querySelector('.menu-button__wrap');
const mobileMenu = document.querySelector('.mobile-menu');

menuBtn.addEventListener('click', function () {
	this.querySelector('.menu-button').classList.toggle('active');
	mobileMenu.classList.toggle('active');
});

/* Custom range slider */
const range = {
	min: [1],
	max: [9],
};
noUiSlider.create(slider, {
	range: range,
	start: 1,
	step: 1,
	connect: [true, false],
});

/* Add module to cart */
modules.addEventListener('click', e => {
	if (e.target.classList.contains('module__button')) {
		const module = e.target.closest('.module');
		if (module.classList.contains('active')) {
			module.classList.remove('active');
			module.querySelector('.module__button').innerHTML =
				'<svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" > <rect x="5" width="1" height="11" fill="#999999" /> <rect y="5" width="11" height="1" fill="#999999" /></svg>';
		} else {
			module.classList.add('active');
			module.querySelector('.module__button').innerHTML =
				'<svg width="12" ="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0748 0L4.05427 7.04287L1.00011 4L0.145996 4.94286L4.11251 9L12.0001 1.00001L11.0748 0Z" fill="#fff"/></svg>';
		}
	}
});

/* Custom scrollbar in cart */
OverlayScrollbars(document.querySelector('#cart'), {});
OverlayScrollbars(document.querySelector('#sb-cart'), {});

/* Shrink calculator and stick it to top */
const obsCallback = function (entries) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			calculator.classList.remove('sticked');
			calculator.querySelector('.calculator').classList.remove('shrinked');
		} else {
			if (entry.boundingClientRect.y <= 0) {
				calculator.classList.add('sticked');
				calculator.querySelector('.calculator').classList.add('shrinked');
			}
		}
	});
};
const obsOptions = {
	root: null,
	threshold: 0.2,
};
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(calculator);

/* Expand sticky calculator */
document.querySelector('.expand-calc').addEventListener('click', function () {
	const calc = this.closest('.calculator');
	if (calc.classList.contains('shrinked')) {
		document.body.style.overflow = 'hidden';
		this.innerHTML = '<img src="img/icons/close.svg" alt="close calc" />';
		calc.classList.remove('shrinked');
	} else {
		document.body.style.overflow = 'auto';
		this.innerHTML = '<img src="img/icons/angle-down.svg" alt="expand calc" />';
		calc.classList.add('shrinked');
	}
});

/* Custom scrollbar in sidebar-cart */
OverlayScrollbars(document.querySelector('#sidebar-cart__content'), {});

/* Show sidebar cart */
document.querySelector('.cart-button').addEventListener('click', () => {
	sidebarCart.classList.add('visible');
	document.body.style.overflow = 'hidden';
});

/* Hide sidebar cart */
document.querySelector('.hide-sidebar-cart').addEventListener('click', () => {
	sidebarCart.classList.remove('visible');
	document.body.style.overflow = 'auto';
});

const changeSetup = document.querySelector('.change-setup');
const changeSetupSwipe = document.querySelector('.change-setup__hide');

/* Show setup sidebar */
document.querySelector('.expand-calc_mobile').addEventListener('click', () => {
	changeSetup.classList.add('visible');
	document.body.style.overflow = 'hidden';
});

/* Hide setup sidebar on swipe down */
let touchstartY = 0;
let touchendY = 0;
changeSetupSwipe.addEventListener(
	'touchstart',
	event => (touchstartY = event.changedTouches[0].screenY)
);
changeSetupSwipe.addEventListener('touchend', function (event) {
	touchendY = event.changedTouches[0].screenY;
	touchendY >= touchstartY && this.closest('.change-setup').classList.remove('visible');
	document.body.style.overflow = 'auto';
});
