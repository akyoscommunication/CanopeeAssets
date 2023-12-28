import {Controller} from '@hotwired/stimulus';

export default class extends Controller {
	static values = {
		max: Number,
	};
	
	connect() {
		this.childrens = this.element.querySelectorAll('.c-users__item');
		this.#arrangeChildren()
		this.#addRemainingCount()
		this.#hideRemainingChildren()
	}
	
	#arrangeChildren() {
		this.childrens.forEach((child, key) => {
			child.style.zIndex = this.childrens.length - key;
		});
	}
	
	#addRemainingCount() {
		const remaining = this.childrens.length - this.maxValue;
		const remainingEl = document.createElement('div');
		remainingEl.classList.add('c-users__item');
		remainingEl.classList.add('c-users__item--remaining');
		remainingEl.innerHTML = `+${remaining}`;
		remainingEl.style.zIndex = 1;
		this.element.appendChild(remainingEl);
	}
	
	#hideRemainingChildren() {
		for (let i = this.maxValue; i < this.childrens.length; i++) {
			this.childrens[i].setAttribute('hidden', true);
		}
	}
}
