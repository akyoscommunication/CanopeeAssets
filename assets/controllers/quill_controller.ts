// @ts-nocheck
import {Controller} from '@hotwired/stimulus';
import Quill from 'quill';

import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

let isQuillInitialized = false;

export default class extends Controller {
	private quill: Quill | null = null;
	static targets = ['editor', 'output'];
	static values = {options: Object};

	connect() {
		if (!isQuillInitialized) {
			isQuillInitialized = true;
			this.dispatchEvent('init', {
				Quill
			})
		}

		this.quill = new Quill(this.editorTarget, this.optionsValue);

		if (this.optionsValue.data) {
			this.quill.root.innerHTML = this.optionsValue.data;
		}

		this.quill.on('editor-change', () => {
			this.outputTarget.value = this.quill.root.innerHTML.replace(/"/g, '\'');

			// Dispatch change event on the output target when 0,5 seconds have passed
			// since the last change event was dispatched.
			clearTimeout(this.outputTarget.timeout);
			this.outputTarget.timeout = setTimeout(() => {
				this.outputTarget.dispatchEvent(new Event('change', {bubbles: true}));
			}, 500);
		});

		window.addEventListener('js:refresh', () => {
			this.quill.setText('');
		})

		this.dispatchEvent('connect', {quill: this.quill});
	}

	private dispatchEvent(name: string, payload: any) {
		this.dispatch(name, {detail: payload, prefix: 'quill'});
	}
}
