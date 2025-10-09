import {Controller} from '@hotwired/stimulus';

export default class extends Controller {

    static targets = ['icon'];

	connect() {
        if(this.hasIconTarget) {
            if(this.iconTarget.ariaLabel) {
                let title = this.iconTarget.ariaLabel;
                if(this.iconTarget.querySelector('title') === null) {
                    let titleElement = document.createElementNS('http://www.w3.org/2000/svg', 'title');
                    titleElement.textContent = title;
                    this.iconTarget.prepend(titleElement);
                } else {
                    this.iconTarget.querySelector('title').textContent = title;
                }
            }
        }
	}
}
