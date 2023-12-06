import {Controller} from '@hotwired/stimulus';

import {Sortable, Plugins} from "@shopify/draggable";
import {getComponent} from "@symfony/ux-live-component";

export default class extends Controller {
	static values = {
		draggable: String,
		updateAction: String,
	};
	
	static targets = ['handle'];
	
	async initialize() {
		// TODO: ça ça sert à rien, c'est de la grosse merde. Je suis obligé de le refaire dans les fonctions pour que ça marche sinon c'est undefined
		this.component = await getComponent(this.element);
		this.isSortable = false;
		this.sortables = [];
		
		console.log('initialize sortable');
		
		window.addEventListener('sortable:toggle-sortable', () => this.toggleSortable());
	}
	
	connect() {
		this.initializeSortable();
	}
	
	async initializeSortable() {
		if (!this.isSortable) return;
		
		const component = await getComponent(this.element);
		this.handleTargets.forEach((element) => {
			element.classList.add('is-draggable-active');
			const sortable = this.sortable(element);
			this.sortables.push(sortable);
			
			if (component) {
				if (this.updateActionValue) {
					sortable.on('sortable:stop', (e) => {
						const el = e.data.dragEvent.data.originalSource
						const _id = parseInt(el.getAttribute('_id'))
						
						component.action(this.updateActionValue, {instance: _id, newPosition: e.newIndex})
					})
				}
			}
		});
	}
	
	toggleSortable() {
		console.log('toggle sortable');
		this.isSortable = !this.isSortable;
		if (this.isSortable) {
			this.initializeSortable();
		} else {
			this.sortables.forEach((sortable) => {
				sortable.destroy();
			});
			
			this.handleTargets.forEach((element) => {
				element.classList.remove('is-draggable-active');
			});
		}
	}
	
	sortable(handle) {
		return new Sortable(handle, {
			draggable: this.draggableValue,
			mirror: {
				constrainDimensions: true,
			},
			plugins: [Plugins.SortAnimation],
			swapAnimation: {
				duration: 200,
				easingFunction: 'ease-in-out',
			},
		});
	}
}
