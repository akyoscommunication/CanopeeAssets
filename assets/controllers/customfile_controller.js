import {Controller} from '@hotwired/stimulus';
import {uniqueId} from "./../js/utils";

export default class extends Controller {
	static targets = ['input', 'preview'];
	
	connect() {
		// check if the input change and upload the file to change the preview
		this.inputTarget.addEventListener('change', (e) => {
			this.upload(e);
		})
	}
	
	upload(e) {
		const target = e.currentTarget;
		
		if (target.files && target.files[0]) {
			let reader = new FileReader();
			
			reader.onload = (e) => {
				const img = document.createElement('img');
				img.src = e.target.result;
				img.alt = target.files[0].name;
				
				if(this.hasPreviewTarget) {
					this.previewTarget.innerHTML = '';
					this.previewTarget.appendChild(img);
				}
			}
			
			reader.readAsDataURL(target.files[0]);
		}
	}
}
