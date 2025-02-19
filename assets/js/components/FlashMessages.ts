import Toast from './Toast';

type FlashMessage = {
    data: [];
    type: string;
};

class FlashMessagesElement extends HTMLElement {
    static observedAttributes() {
        return ['data']
    }

    connectedCallback() {
        const _flashMessages = JSON.parse(this.getAttribute('data') || '[]');
        _flashMessages.forEach((flashMessage: FlashMessage) => {
            new Toast(flashMessage.type, flashMessage.data, 5000);
        })

        window.addEventListener('flash-message:add', (event: CustomEvent) => {
            const flashMessage: FlashMessage = event.detail;
            new Toast(flashMessage.type, flashMessage.data, 5000);
        })
    }

    disconnectedCallback() {}
}

export class FlashMessages {
    static register() {
        if(!customElements.get('flash-messages')) {
            customElements.define('flash-messages', FlashMessagesElement);
        }
    }
}
