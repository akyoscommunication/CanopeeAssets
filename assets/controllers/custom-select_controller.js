// assets/controllers/custom-autocomplete_controller.js
import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
	initialize() {
		this._onConnect = this._onConnect.bind(this);
	}

	connect() {
		this.element.addEventListener('autocomplete:connect', this._onConnect);
	}

	disconnect() {
		this.element.removeEventListener('autocomplete:connect', this._onConnect);
	}

	_onConnect(event) {
		window.addEventListener('js:refresh', () => {
			event.detail.tomSelect.clear();
		});
	}
}
