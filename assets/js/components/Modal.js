export default class Modal {
	constructor() {
		document.querySelectorAll('*[trigger-modal]').forEach((el) => {
			el.addEventListener('click', (e) => {
				e.preventDefault();
				const target = document.querySelector(el.getAttribute('trigger-modal'));
				
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
		});
	}
}
