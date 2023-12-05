import {Controller} from '@hotwired/stimulus';

export default class extends Controller {
	static targets = ['content', 'filter'];
	
	connect() {
		this.filter(this.filterTargets[0])
	}
	
	filtered(e) {
		const target = e.currentTarget;
		e.preventDefault();
		
		this.filter(target);
	}
	
	filter(target) {
		this.clear()
		
		target.classList.add('active');
		this.contentTargets.filter((content) => {
			return content.dataset.filter === target.dataset.filter;
		}).forEach((content) => {
			content.removeAttribute('hidden');
			content.classList.add('active');
		})
	}
	
	clear() {
		this.filterTargets.forEach((target) => {
			target.classList.remove('active');
		});
		
		this.contentTargets.forEach((target) => {
			target.setAttribute('hidden', 'hidden');
			target.classList.remove('active');
		});
	}
}
