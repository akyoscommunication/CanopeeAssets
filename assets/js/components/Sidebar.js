import gsap from 'gsap';

export default class Sidebar {
	constructor() {
		this.app = document.querySelector('.l-app');
		if (this.app === null) return;
		
		document.querySelectorAll('*[trigger-sidebar]').forEach((el) => {
			el.addEventListener('click', this.toggleSidebar.bind(this));
		})
		
		document.querySelectorAll('*[collapsable]').forEach((el) => {
			const icon = document.createElement('i');
			icon.classList.add('icomoon-arrow-down', 'c-collapsable-trigger');
			el.appendChild(icon);
			
			icon.addEventListener('click', (e) => {
				const target = document.querySelector(el.getAttribute('collapsable'));
				if (target === null) return;
				
				e.preventDefault();
				
				el.classList.toggle('is-collapsed');
				target.classList.toggle('is-collapsed');
				this.collapseSidebar(target)
			})
			
			if (el.classList.contains('is-collapsed')) {
				const target = document.querySelector(el.getAttribute('collapsable'));
				if (target === null) return;
				
				this.collapseSidebar(target)
			}
		})
	}
	
	toggleSidebar(e) {
		e.preventDefault();
		
		this.app.classList.toggle('is-sidebar-closed');
	}
	
	collapseSidebar(target) {
		const isCollapsed = target.classList.contains('is-collapsed');
		
		if (isCollapsed) {
			gsap.to(target, {
				height: 0,
				duration: 0.3,
			})
		} else {
			gsap.set(target, {
				height: 'auto',
			})
			
			gsap.from(target, {
				height: 0,
				duration: 0.3,
			})
		}
	}
}
