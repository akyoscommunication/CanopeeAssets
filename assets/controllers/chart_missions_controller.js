import {Controller} from "@hotwired/stimulus";
import Chart from "chart.js/auto";
import {Tooltip} from 'chart.js';


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
							let percentage = 0;

							if (context.parsed._stacks.y) {
								let stacks = context.parsed._stacks.y;
								let total = 0;
								delete stacks._bottom
								delete stacks._top

								for (let stack in stacks) {
									total += stacks[stack];
								}
								percentage = Math.round((context.parsed.y / total) * 100);
							}

							let label = '';
							if (context.parsed.y !== null) {
								let seconds = context.parsed.y;

								let hours = Math.floor(seconds / 3600);
								let minutes = Math.floor((seconds % 3600) / 60);

								let time = hours + "h" + (minutes < 10 ? "0" : "") + minutes;

								label += percentage + '% (' + time + ')';
							}

							return label;
						},
						title: function (context) {
							let arrayString = context[0].dataset.label.split(' - ');
							return arrayString[1];
						}
					}
				}
			},
			scales: {
				y: {
					'stacked': true,
					display: false,
					grid: {
						display: false
					}
				},
				x: {
					'stacked': true,
					grid: {
						display: false
					}
				},
				borderRadius: 10,
			},
			elements: {
				bar: {
					borderRadius: 5,
				}
			},
			onClick: function (evt, item) {

				//Je trouve que ca deg comme facon de faire mais je n'ai pas trouvé mieux

				let datasetIndex = item[0].datasetIndex;
				let dataIndex = item[0].index;
				let datasetLabel = evt.chart.data.datasets[datasetIndex].label;
				let value = evt.chart.data.datasets[datasetIndex].data[dataIndex];
				let label = evt.chart.data.labels[dataIndex];
				let arrayString = datasetLabel.split(' - ');

				return window.location.href = 'http://127.0.0.1:8002/missions/' + arrayString[0];
			}
		};
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
