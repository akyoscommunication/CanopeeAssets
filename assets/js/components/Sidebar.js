import gsap from 'gsap';
import {setCookie, getCookie} from '@canopee_app/assets/js/utils';

const COOKIE_SIDEBAR = 'sidebar-closed';
const COOKIE_COLLAPSABLE_PREFIX = 'sidebar-collapsed';
const COLLAPSABLE_CLASS = 'is-collapsed';

export default class Sidebar {
	constructor() {
		this.app = document.querySelector('.l-app');
		if (this.app === null) return;
		
		this._sidebar = document.querySelector('.l-sidebar');
		this._sidebar_brandMinified = this._sidebar.querySelector('.l-sidebar__brand--minified');
		this._main = document.querySelector('.l-main');
		this._header = document.querySelector('.l-header');
		this._navbar = this._header.querySelector('.l-header__nav');
		this.navbarHeight = this._navbar.offsetHeight;
		this._currentItemCollapsed = [];
		
		this._mm = gsap.matchMedia(),
			this._mobileBreakpoint = 768,
			
		this._mm.add({
			isMobile: `(max-width: ${this._mobileBreakpoint - 1}px) and (prefers-reduced-motion: no-preference)`
		}, (context) => {
			let { isMobile } = context.conditions;
			
			if (isMobile) {
				this._main.addEventListener('scroll', (e) => {
					const scrollTop = e.target.scrollTop;
					if (scrollTop > 100) {
						gsap.to(this._header, {
							y: -this._navbar.offsetHeight,
						})
					}
					else {
						gsap.to(this._header, {
							y: 0,
						})
					}
				});
			}
			
			return () => {
				this._main.removeEventListener('scroll', (e) => {});
				this.reset();
			};
		})
		
		document.querySelectorAll('*[trigger-sidebar]').forEach((el) => {
			el.addEventListener('click', (e) => {
				e.preventDefault();
				
				// set cookie
				const isClosed = this.app.classList.contains('is-sidebar-closed');
				if (isClosed) {
					setCookie(COOKIE_SIDEBAR, '1', 365);
				} else {
					setCookie(COOKIE_SIDEBAR, '0', 365);
				}
				
				this.toggleSidebar(e);
			});
		})
		
		document.querySelectorAll('*[collapsable]').forEach((el) => {
			const target = document.querySelector(el.getAttribute('collapsable'));
			const icon = document.createElement('i');
			icon.classList.add('icomoon-arrow-down', 'c-collapsable-trigger');
			el.appendChild(icon);
			
			icon.addEventListener('click', (e) => {
				const target = document.querySelector(el.getAttribute('collapsable'));
				if (target === null) return;
				
				e.preventDefault();
				
				el.classList.toggle(COLLAPSABLE_CLASS);
				target.classList.toggle(COLLAPSABLE_CLASS);
				this.collapseTarget(target)
			})
			
			// check cookie
			const cookieName = COOKIE_COLLAPSABLE_PREFIX + target.getAttribute('id');
			const isCollapsed = getCookie(cookieName);
			if (isCollapsed === '1') {
				el.classList.add(COLLAPSABLE_CLASS);
				target.classList.add(COLLAPSABLE_CLASS);
			} else {
				el.classList.remove(COLLAPSABLE_CLASS);
				target.classList.remove(COLLAPSABLE_CLASS);
			}
			
			this.collapseTarget(target)
		})
		
		// check cookie
		const isClosed = getCookie(COOKIE_SIDEBAR);
		if (isClosed === '1') {
			this.app.classList.add('is-sidebar-closed');
		} else {
			this.app.classList.remove('is-sidebar-closed');
		}
		
		this.toggleSidebar()
	}
	
	toggleSidebar() {
		this.app.classList.toggle('is-sidebar-closed');
		
		const isClosed = this.app.classList.contains('is-sidebar-closed');
		
		this._mm.add({
			isMobile: `(max-width: ${this._mobileBreakpoint - 1}px) and (prefers-reduced-motion: no-preference)`
		}, (context) => {
			let { conditions } = context;
			
			if (conditions.isMobile) {
				if (isClosed) {
					gsap.to(this._main, {
						height: window.innerHeight - 24 - this._sidebar_brandMinified.offsetHeight,
					});
					
					gsap.to(this._sidebar, {
						height: '40px',
					});
				} else {
					gsap.to(this._sidebar, {
						height: "50vh",
					});
					
					gsap.to(this._main, {
						height: this._main.offsetHeight - (window.innerHeight / 2),
					})
					
					gsap.to(this._sidebar, {
						height: "50vh",
					})
				}
			}
			
			return () => {
				this.reset();
			}
		})
		
		if (isClosed) {
			this._sidebar.querySelectorAll('*[collapsable]').forEach((el) => {
				const id = el.getAttribute('collapsable');
				const target = this._sidebar.querySelector(id);
				if (target === null) return;
				
				const wasCollapsed = el.classList.contains(COLLAPSABLE_CLASS);
				
				el.classList.remove(COLLAPSABLE_CLASS);
				target.classList.remove(COLLAPSABLE_CLASS);
				
				this.collapseTarget(target)
				
				if (wasCollapsed) {
					this._currentItemCollapsed.push(id);
				};
			});
		} else {
			this._currentItemCollapsed.forEach((el) => {
				const trigger = this._sidebar.querySelector("*[collapsable='" + el + "']");
				const target = this._sidebar.querySelector(el);
				if (target === null) return;
				
				this.removeItemCollapsed(target.getAttribute('id'));
				
				trigger.classList.add(COLLAPSABLE_CLASS);
				target.classList.add(COLLAPSABLE_CLASS);
				
				this.collapseTarget(target)
			});
		}
	}
	
	reset() {
		this._sidebar.style.height = 'auto';
		this._main.style.height = 'auto';
	}
	
	collapseTarget(target) {
		if (target === null) return;
		
		const isCollapsed = target.classList.contains(COLLAPSABLE_CLASS);
		// set cookie
		const cookieName = COOKIE_COLLAPSABLE_PREFIX + target.getAttribute('id');
		
		if (isCollapsed) {
			setCookie(cookieName, '1', 365);
			gsap.set(target, {
				height: 'auto',
			})
			this._currentItemCollapsed.push("#"+target.getAttribute('id'))
		} else {
			setCookie(cookieName, '0', 365);
			gsap.to(target, {
				height: 0,
				duration: 0.3,
			})
			this.removeItemCollapsed(target.getAttribute('id'))
		}
	}
	
	removeItemCollapsed(id) {
		this._currentItemCollapsed = this._currentItemCollapsed.filter((el) => {
			return el !== "#"+id;
		})
	}
}
