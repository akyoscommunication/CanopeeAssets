export default class Modal {
	constructor() {
		this.init();

		window.addEventListener('modal:init', () => {
			this.init();
		})
	}

	init() {
		document.querySelectorAll('*[trigger-modal]').forEach((el) => {
			const target = document.querySelector(el.getAttribute('trigger-modal'));

			el.addEventListener('click', (e) => {
				e.preventDefault();

				if (target) {
					// move modal to body if not already
					// if (target.parentNode !== document.body) {
					// 	document.body.appendChild(target);
					// }

					// block scroll
					document.body.style.overflow = 'hidden';

					target.showModal();

					target.addEventListener('click', (e) => {
						if (e.target === target) {
							target.close();
							// unblock scroll
							document.body.style.overflow = 'auto';
						}
					});
				}
			})

			target.addEventListener('modal:close', (e) => {
				target.close()
			})
		});
	}
}
