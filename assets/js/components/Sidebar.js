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
				let {isMobile} = context.conditions;

				if (isMobile) {
					this._main.addEventListener('scroll', (e) => {
						const scrollTop = e.target.scrollTop;
						if (scrollTop > 100) {
							gsap.to(this._header, {
								y: -this._navbar.offsetHeight,
							})
						} else {
							gsap.to(this._header, {
								y: 0,
							})
						}
					});
				}

				return () => {
					this._main.removeEventListener('scroll', (e) => {
					});
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
			const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			icon.setAttribute('viewBox', '0 0 44 32');
			icon.setAttribute('width', '44');
			icon.setAttribute('height', '32');
			icon.setAttribute('fill', 'currentColor');
			icon.setAttribute('aria-hidden', 'true');
			icon.setAttribute('version', '1.1');
			icon.classList.add('c-icon', 'c-collapsable-trigger');
			
			const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			path.setAttribute('d', 'M3.157 3.093c-1.556 0.424-2.741 1.666-3.075 3.223l-0.005 0.028c-0.049 0.239-0.077 0.514-0.077 0.795 0 0.848 0.255 1.636 0.693 2.291l-0.009-0.015c0.155 0.234 4.309 4.438 9.529 9.65 7.932 7.916 9.324 9.274 9.717 9.479 0.565 0.304 1.237 0.483 1.95 0.483 0.741 0 1.437-0.193 2.041-0.531l-0.021 0.011c0.485-0.255 1.408-1.145 9.834-9.474 6.369-6.298 9.399-9.341 9.608-9.658 0.413-0.626 0.66-1.394 0.66-2.219 0-0.296-0.032-0.585-0.092-0.863l0.005 0.027c-0.413-1.91-2.077-3.324-4.076-3.348h-0.003c-0.669 0-1.195 0.125-1.864 0.439-0.652 0.313 0.092-0.393-8.998 8.559l-7.092 6.975-7.64-7.636c-7.489-7.477-7.656-7.636-8.221-7.899-0.544-0.276-1.186-0.438-1.866-0.438-0.354 0-0.697 0.044-1.025 0.126l0.029-0.006z');
			icon.appendChild(path);
			
			el.appendChild(icon);

			const eventCollapse = (e) => {
				const target = document.querySelector(el.getAttribute('collapsable'));
				if (target === null) return;

				e.preventDefault();

				el.classList.toggle(COLLAPSABLE_CLASS);
				target.classList.toggle(COLLAPSABLE_CLASS);
				this.collapseTarget(target)
			}

			if (el.getAttribute('href') === '#') {
				el.addEventListener('click', eventCollapse)
			} else {
				icon.addEventListener('click', eventCollapse)
			}


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
			let {conditions} = context;

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
				}
				;
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
			this._currentItemCollapsed.push("#" + target.getAttribute('id'))
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
			return el !== "#" + id;
		})
	}
}
