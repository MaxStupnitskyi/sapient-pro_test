'use strict';

//= ../libs/nouislider/nouislider.min.js
//= ../libs/overlay-scrollbar/OverlayScrollbars.min.js
//= ../libs/select/index.js

const cart = document.getElementById('cart');
const sidebarCart = document.getElementById('sidebar-cart');
const menuBtn = document.querySelector('.menu-button__wrap');
const mobileMenu = document.querySelector('.mobile-menu');

menuBtn.addEventListener('click', function () {
	this.querySelector('.menu-button').classList.toggle('active');
	mobileMenu.classList.toggle('active');
});

/* Custom scrollbar in cart */
OverlayScrollbars(document.querySelector('#sb-cart'), {});

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

/* Tabs */
function filter(section, filterName) {
	let items = section.querySelectorAll('.tab__section');
	items.forEach(item => {
		item.classList.add('hidden');
	});
	items = Array.from(items).filter(item => item.classList.contains(filterName));
	items[0].classList.remove('hidden');
}
const tabs = document.querySelectorAll('.tab__buttons');
tabs.forEach(tab => {
	tab.addEventListener('click', function (e) {
		if (e.target.classList.contains('tab__button')) {
			const filterName = e.target.dataset.filter;
			filterName && filter(this.closest('.tab__content'), filterName);
		}
		tab.parentElement
			.querySelectorAll('.tab__button')
			.forEach(button => button.classList.remove('active'));
		e.target.classList.add('active');
	});
});
