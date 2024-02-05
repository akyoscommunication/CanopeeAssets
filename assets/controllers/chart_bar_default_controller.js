import {Controller} from "@hotwired/stimulus";
import {Tooltip} from "chart.js";

export default class extends Controller {
	connect() {
		this.element.addEventListener('chartjs:pre-connect', this._onPreConnect);
		this.element.addEventListener('chartjs:connect', this._onConnect);
	}

	disconnect() {
		this.element.removeEventListener('chartjs:pre-connect', this._onPreConnect);
		this.element.removeEventListener('chartjs:connect', this._onConnect);
	}

	_onPreConnect(event) {
		let target = event.target;
		let unit = target.getAttribute('data-unit') ?? '';

		event.detail.config.options = {
			plugins: {
				tooltip: {
					backgroundColor: 'rgba(255,255,255,1)',
					titleColor: '#000',
					bodyColor: '#000',
					borderWidth: 1,
					borderColor: '#EAEDF1',
					displayColors: false,
					padding: 10,
					boxPadding: 10,
					position: 'myCustomPositioner',
					titleFont: {
						size: 14,
					},
					callbacks: {
						label: function (context) {
							return context.parsed.y + ' ' + unit;
						},
						title: function (context) {
							return context[0].label;
						}
					}
				},
				legend: {
					display: false
				}
			}
		}
	}


	_onConnect(event) {
	}
}

Tooltip.positioners.myCustomPositioner = function (elements, eventPosition) {
	const tooltip = this;

	if (elements[0]) {
		return {
			x: elements[0].element.x,
			y: elements[0].element.y + (elements[0].element.height / 2)
		};
	}

	return false;
};
