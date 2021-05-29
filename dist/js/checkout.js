/* Form navigation */
let step = 1;
const form = document.querySelector('.checkout__proceedings');
form.addEventListener('click', function (e) {
	if (e.target.classList.contains('next-step')) {
		++step;
		document
			.querySelector(`.checkout__step__wrap[data-step="${step - 1}"]`)
			?.classList.add('hidden');
		document.querySelector(`.checkout__step__wrap[data-step="${step}"]`).classList.remove('hidden');
	}

	if (e.target.classList.contains('prev-step')) {
		--step;
		document
			.querySelector(`.checkout__step__wrap[data-step="${step + 1}"]`)
			.classList.add('hidden');
		document.querySelector(`.checkout__step__wrap[data-step="${step}"]`).classList.remove('hidden');
	}
});
const forms = document.querySelectorAll('.checkout__step__form.scrolled');
forms.forEach(form => {
	OverlayScrollbars(form, {});
});