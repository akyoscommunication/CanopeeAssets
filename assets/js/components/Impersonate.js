import gsap from 'gsap';
import {positioningElement} from "@canopee_app/assets/js/utils";

export default class Impersonate {
	constructor() {
		this._impersonate = document.querySelector('.c-impersonate');
		if (this._impersonate === null) return;
		
		const trigger = this._impersonate.querySelector('.c-impersonate__trigger');
		const form = this._impersonate.querySelector('.c-impersonate__form');
		
		this._tl = gsap.timeline({ paused: true });
		this._tl.fromTo(form, {
			y: 10,
			opacity: 0,
			visibility: 'hidden',
		}, {
			y: 0,
			opacity: 1,
			visibility: 'visible',
			duration: .2,
		})
		
		trigger.addEventListener('click', this.toggleImpersonate.bind(this));
		
		window.addEventListener('resize', () => {
			positioningElement(trigger, form);
		});
		
		window.addEventListener('scroll', () => {
			positioningElement(trigger, form);
		});
		
		positioningElement(trigger, form);
	}
	
	toggleImpersonate(e) {
		e.preventDefault();
		
		this._impersonate.classList.toggle('is-open');
		
		if (this._impersonate.classList.contains('is-open')) {
			this._tl.play();
		} else {
			this._tl.reverse();
		}
	}
}
