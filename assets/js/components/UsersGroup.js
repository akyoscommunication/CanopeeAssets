export default class UsersGroup {
	constructor() {
		document.querySelectorAll('.c-users').forEach((el) => {
			const max = el.getAttribute('data-max') || 5;
			
			// search children and apply zindex with key
			const childrens = el.querySelectorAll('.c-users__item');
			childrens.forEach((child, key) => {
				child.style.zIndex = childrens.length - key;
			});
			
			// if more than 5 children, add items with number of remaining children and hide them
			if (childrens.length > max) {
				const remaining = childrens.length - max;
				const remainingEl = document.createElement('div');
				remainingEl.classList.add('c-users__item');
				remainingEl.classList.add('c-users__item--remaining');
				remainingEl.innerHTML = `+${remaining}`;
				remainingEl.style.zIndex = 1;
				el.appendChild(remainingEl);
				
				for (let i = max; i < childrens.length; i++) {
					childrens[i].setAttribute('hidden', true);
				}
			}
		});
	}
}
