import gsap from "gsap";
import {getStatusIcon} from "@canopee_app/assets/js/utils";

export default class Toast {
	constructor(status = 'info', data = [], duration = 600) {
		this.body = document.querySelector('body');
		
		this.status = status;
		this.duration = duration;
		this.data = data;
		
		this.createToast();
	}
	
	createToastContainer() {
		const node = document.createElement("div");
		node.classList.add("c-toast-container")
		
		return this.body.appendChild(node);
	}
	
	createToast() {
		let containerToast = this.body.querySelector('.c-toast-container');
		
		if (!(containerToast)) {
			containerToast = this.createToastContainer();
		}
		
		let template = document.getElementById("toast-template");
		let clone = template.content.cloneNode(true);
		
		clone.querySelector('.c-toast').classList.add(`c-toast-${this.status}`);
		// Replace all placeholders in the content
		clone.querySelector('.c-toast').innerHTML = clone.querySelector('.c-toast').innerHTML.replace(/%([^%]+)%/g, (match, placeholder) => {
			switch (placeholder) {
				case 'status':
					return this.status;
				case 'ico':
					return getStatusIcon(this.status); // Replace with the actual value
				default:
					return this.data[placeholder] || match; // Use the data or keep the placeholder
			}
		});
		
		containerToast.appendChild(clone);
		
		const toast = containerToast.querySelector('.c-toast:last-child');
		
		if (toast) {
			gsap.fromTo(toast, {opacity: 0, y: -50}, {opacity: 1, y: 0});
			
			// remove toast after duration
			const timeout = this.timer(toast);
			
			// reset timeout on mouseover
			toast.addEventListener('mouseover', () => {
				clearTimeout(timeout);
			});
			
			// reset timeout on mouseout
			toast.addEventListener('mouseout', () => {
				this.timer(toast);
			});
			
			// remove toast on click
			toast.addEventListener('click', () => {
				this.removeToast(toast);
			});
		}
	}
	
	timer(toast) {
		return setTimeout(() => {
			this.removeToast(toast);
		}, this.duration);
	}
	
	removeToast(toast) {
		gsap.to(toast, {opacity: 0, y: -50, onComplete: () => toast.remove()});
	}
}
