import * as React from "react";
import Galaxy from "./Galaxy";
import {createRoot} from "react-dom/client";

class GalaxyElement extends HTMLElement {
    static observedAttributes() {
        return ['endpoint', 'host']
    }

    connectedCallback() {
        // const host = process.env.HOST;
        const host = this.getAttribute('host') || "https://127.0.0.1:8000";
        const endpoint = this.getAttribute('endpoint') || 'api/external_links';
        const url = `${host}/${endpoint}`;

        const root = createRoot(this);
        root.render(<Galaxy url={url}/>);
    }

    disconnectedCallback() {}
}

customElements.define('my-galaxy', GalaxyElement);
