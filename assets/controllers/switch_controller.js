import {Controller} from '@hotwired/stimulus';
import { getComponent } from '@symfony/ux-live-component';

export default class extends Controller {
	async initialize() {
		this.component = await getComponent(this.element);
		
		this.component.on('connect', (component) => {
			document.addEventListener('switch_update', (event) => {
				this.component.render();
			})
		});
	}
}