import {Controller} from '@hotwired/stimulus';
import { getComponent } from '@symfony/ux-live-component';

import { trans,
	ALERT_CONFIRM_BUTTON_TEXT,
	ALERT_CONFIRM_DENY_BUTTON_TEXT,
	ALERT_CONFIRM_INPUT_VALIDATOR_TEXT,
	ALERT_CONFIRM_TEXT,
	ALERT_CONFIRM_TITLE
} from '../translator';

import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'

export default class extends Controller {

	async initialize() {
		this.component = await getComponent(this.element);
	}


	confirm(e) {
		const target = e.currentTarget;
		e.preventDefault();

		const inputValidator = target.dataset.inputValidator;

		const mixin = Swal.mixin({
			customClass: {
				confirmButton: 'c-button c-button--style-default c-button--secondary',
				denyButton: 'c-button c-button--style-default c-button--danger',
			},
			buttonsStyling: false,
		})

		let config = {
			title: target.dataset.title ?? "trans(ALERT_CONFIRM_TITLE, {}, 'js.alert')",
			html: target.dataset.text ?? trans(ALERT_CONFIRM_TEXT, {}, 'js.alert'),
			showDenyButton: true,
			denyButtonText: trans(ALERT_CONFIRM_DENY_BUTTON_TEXT, {}, 'js.alert'),
			confirmButtonText: trans(ALERT_CONFIRM_BUTTON_TEXT, {}, 'js.alert'),
		};

		let callback = (result) => {
			if (result.isConfirmed) {
				const action = e.params.action;
				if(action) {
					let params = e.params
					delete params.action;
					this.component.action(action, params);
				}
			}
		};

		if (inputValidator) {
			config.input = 'text';
			config.inputValidator = (value) => {
				return new Promise((resolve) => {
					if (value === inputValidator) {
						resolve();
					} else {
						resolve(trans(ALERT_CONFIRM_INPUT_VALIDATOR_TEXT, {value: inputValidator}, 'js.alert'))
					}
				})
			};
		}

		const swal = mixin.fire(config);

		if (callback) {
			swal.then(callback);
		}
	}
}