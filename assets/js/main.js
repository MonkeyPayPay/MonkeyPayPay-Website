/**
 * MonkeyPayPay — theme scripts.
 *
 * Handles the responsive navigation toggle. Kept dependency-free.
 */
(function () {
	'use strict';

	document.addEventListener('DOMContentLoaded', function () {
		var toggle = document.querySelector('.menu-toggle');
		var nav = document.getElementById('site-navigation');

		if (!toggle || !nav) {
			return;
		}

		toggle.addEventListener('click', function () {
			var expanded = toggle.getAttribute('aria-expanded') === 'true';
			toggle.setAttribute('aria-expanded', String(!expanded));
			nav.classList.toggle('is-open');
		});
	});
})();
