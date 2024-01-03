// @ts-ignore
import * as React from "react";
import NotificationCenter from "./NotificationCenter";
// @ts-ignore
import {createRoot} from "react-dom/client";

class GalaxyElement extends HTMLElement {
    static observedAttributes() {
        return ['host']
    }

    connectedCallback() {
        const host = this.getAttribute('host') || 'http://localhost:8000';
        const root = createRoot(this);
        root.render(<NotificationCenter host={host}/>);
    }

    disconnectedCallback() {}
}

customElements.define('notification-center', GalaxyElement);
