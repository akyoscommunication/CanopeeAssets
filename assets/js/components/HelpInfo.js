export default class HelpInfo {
	constructor() {
		this._class = '.form-group__info';
		this._helpInfo = document.querySelectorAll(this._class);
		if (!this._helpInfo.length) return;


		this._helpInfo.forEach((info) => {
			info.querySelector('i').addEventListener('click', (e) => {
				this.toggleHelpInfo(e);
			});
		})

		this.default();
	}

	toggleHelpInfo(e) {
		let target = e.target;
		this._data_target = target.getAttribute('data-help-btn');

		target.parentNode.querySelector('[data-help-content="' + this._data_target + '"]').classList.toggle('show');
	}

	default() {
		window.addEventListener('click', (e) => {
			if (e.target.closest(this._class)) return;
			this._helpInfo.forEach((info) => {
				info.querySelector('[data-help-content]').classList.remove('show');
			})
		})
	}
}
