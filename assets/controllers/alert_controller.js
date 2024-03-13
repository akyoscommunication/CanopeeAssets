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
				const action = target.dataset.liveActionParam;
				if(action) {
					let directives = parseDirectives(action);
					for (let directive of directives) {
						this.component.action(directive.action, directive.named);
					}
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

function parseDirectives(content) {
	const directives = [];
	if (!content) {
		return directives;
	}
	let currentActionName = '';
	let currentArgumentValue = '';
	let currentArguments = [];
	let currentModifiers = [];
	let state = 'action';
	const getLastActionName = function () {
		if (currentActionName) {
			return currentActionName;
		}
		if (directives.length === 0) {
			throw new Error('Could not find any directives');
		}
		return directives[directives.length - 1].action;
	};
	const pushInstruction = function () {
		directives.push({
			action: currentActionName,
			args: currentArguments,
			modifiers: currentModifiers,
			getString: () => {
				return content;
			}
		});
		currentActionName = '';
		currentArgumentValue = '';
		currentArguments = [];
		currentModifiers = [];
		state = 'action';
	};
	const pushArgument = function () {
		currentArguments.push(currentArgumentValue.trim());
		currentArgumentValue = '';
	};
	const pushModifier = function () {
		if (currentArguments.length > 1) {
			throw new Error(`The modifier "${currentActionName}()" does not support multiple arguments.`);
		}
		currentModifiers.push({
			name: currentActionName,
			value: currentArguments.length > 0 ? currentArguments[0] : null,
		});
		currentActionName = '';
		currentArguments = [];
		state = 'action';
	};
	for (let i = 0; i < content.length; i++) {
		const char = content[i];
		switch (state) {
			case 'action':
				if (char === '(') {
					state = 'arguments';
					break;
				}
				if (char === ' ') {
					if (currentActionName) {
						pushInstruction();
					}
					break;
				}
				if (char === '|') {
					pushModifier();
					break;
				}
				currentActionName += char;
				break;
			case 'arguments':
				if (char === ')') {
					pushArgument();
					state = 'after_arguments';
					break;
				}
				if (char === ',') {
					pushArgument();
					break;
				}
				currentArgumentValue += char;
				break;
			case 'after_arguments':
				if (char === '|') {
					pushModifier();
					break;
				}
				if (char !== ' ') {
					throw new Error(`Missing space after ${getLastActionName()}()`);
				}
				pushInstruction();
				break;
		}
	}
	switch (state) {
		case 'action':
		case 'after_arguments':
			if (currentActionName) {
				pushInstruction();
			}
			break;
		default:
			throw new Error(`Did you forget to add a closing ")" after "${currentActionName}"?`);
	}
	return directives;
}
