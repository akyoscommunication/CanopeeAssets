// @ts-ignore
import * as React from "react";
import Galaxy from "./Galaxy";
// @ts-ignore
import {createRoot} from "react-dom/client";

class GalaxyElement extends HTMLElement {
    static observedAttributes() {
        return ['endpoint', 'host', 'customer']
    }

    connectedCallback() {
        const modules = this.getAttribute('modules') || '[]';
        const host = this.getAttribute('host') || "https://127.0.0.1:8000";
        const endpoint = this.getAttribute('endpoint') || 'api/external_links';
        const url = `${host}/${endpoint}`;
        const domains = this.getAttribute('domains') || '[]';
        const customer = this.getAttribute('customer') || null;


        const root = createRoot(this);
        root.render(<Galaxy url={url} domains={JSON.parse(domains)} modules={JSON.parse(modules)} defaultCustomer={customer}/>);
    }

    disconnectedCallback() {}
}

customElements.define('my-galaxy', GalaxyElement);
