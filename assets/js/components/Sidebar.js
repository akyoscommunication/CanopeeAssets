import gsap from 'gsap';
import {setCookie, getCookie} from '@canopee_app/assets/js/utils';

const COOKIE_SIDEBAR = 'sidebar-closed';
const COOKIE_COLLAPSABLE_PREFIX = 'sidebar-collapsed';

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
		
		this._mm = gsap.matchMedia(),
			this._mobileBreakpoint = 768,
			
		this._mm.add({
			isMobile: `(max-width: ${this._mobileBreakpoint - 1}px) and (prefers-reduced-motion: no-preference)`
		}, (context) => {
			let { isMobile } = context;
			
			if (isMobile) {
				this._main.addEventListener('scroll', (e) => {
					const scrollTop = e.target.scrollTop;
					if (scrollTop > 100) {
						gsap.to(this._header, {
							y: -this.navbarHeight,
						})
					}
					else {
						gsap.to(this._header, {
							y: 0,
						})
					}
				});
			} else {
				this._main.removeEventListener('scroll', (e) => {});
			}
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
				
				el.classList.toggle('is-collapsed');
				target.classList.toggle('is-collapsed');
				this.collapseSidebar(target)
			})
			
			// check cookie
			const cookieName = COOKIE_COLLAPSABLE_PREFIX + target.getAttribute('id');
			const isCollapsed = getCookie(cookieName);
			if (isCollapsed === '1') {
				el.classList.add('is-collapsed');
				target.classList.add('is-collapsed');
			} else {
				el.classList.remove('is-collapsed');
				target.classList.remove('is-collapsed');
			}
			
			this.collapseSidebar(target)
		})
		
		// check cookie
		const isClosed = getCookie(COOKIE_SIDEBAR);
		if (isClosed === '1') {
			this.app.classList.add('is-sidebar-closed');
		} else {
			this.app.classList.remove('is-sidebar-closed');
		}
		
		this._mainInnerHeight = this._main.offsetHeight;
		this._sidebarInnerHeight = this._sidebar.offsetHeight;
		
		this.toggleSidebar()
	}
	
	toggleSidebar() {
		this.app.classList.toggle('is-sidebar-closed');
		
		const isClosed = this.app.classList.contains('is-sidebar-closed');
		
		this._mm.add({
			isMobile: `(max-width: ${this._mobileBreakpoint - 1}px) and (prefers-reduced-motion: no-preference)`
		}, (context) => {
			let { isMobile } = context;
			
			if (isMobile) {
				if (this._mm.isMobile) {
					if (isClosed) {
						gsap.to(this._main, {
							height: this._mainInnerHeight,
						});
						
						gsap.to(this._sidebar, {
							height: '40px',
						});
					} else {
						gsap.to(this._sidebar, {
							height: "50vh",
						});
						
						gsap.to(this._main, {
							height: this._mainInnerHeight - (window.innerHeight / 2),
						})
						
						gsap.to(this._sidebar, {
							height: "50vh",
						})
					}
				}
			}
		})
	}
	
	collapseSidebar(target) {
		if (target === null) return;
		
		const isCollapsed = target.classList.contains('is-collapsed');
		// set cookie
		const cookieName = COOKIE_COLLAPSABLE_PREFIX + target.getAttribute('id');
		
		if (isCollapsed) {
			setCookie(cookieName, '1', 365);
			gsap.to(target, {
				height: 0,
				duration: 0.3,
			})
		} else {
			setCookie(cookieName, '0', 365);
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
