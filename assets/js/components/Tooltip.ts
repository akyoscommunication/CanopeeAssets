// @ts-ignore
import {getStatusIcon, positioningElement} from "../utils";
// @ts-ignore
import gsap from "gsap";

export default class Tooltip {
    private _tooltip: HTMLElement | null;
    // @ts-ignore
    private _tl: GSAPTimeline | null;

    static register() {
        document.querySelectorAll('[tooltip]').forEach((el) => {
            return new Tooltip(el);
        })
    }

    constructor(el) {
        this._tooltip = null;
        this._tl = null;

        el.addEventListener('mouseenter', this.showTooltip);
        el.addEventListener('mouseleave', this.hideTooltip);
    }


    showTooltip(e) {
        const el = e.target;

        // call template named tooltip-template
        const template = document.getElementById('tooltip-template') as HTMLTemplateElement;
        const tooltipTemplate = template.content.cloneNode(true) as HTMLElement;
        const tooltip = document.createElement('div');
        tooltip.innerHTML = tooltipTemplate.querySelector('.c-tooltip').innerHTML;
        tooltip.classList.add('c-tooltip');

        // @ts-ignore
        const data = JSON.parse(el.getAttribute('tooltip') as string);
        tooltip.innerHTML = tooltip.innerHTML.replace(/%(\w+)%/g, (match, key) => {
            switch (key) {
                case 'ico':
                    return getStatusIcon('info'); // Replace with the actual value
                default:
                    return data[key] || match; // Use the data or keep the placeholder
            }
        });
        this._tooltip = tooltip;

        document.body.appendChild(this._tooltip);
        positioningElement(el, this._tooltip, 0, 16)

        this._tl = gsap.timeline({paused: true});
        this._tl.fromTo(this._tooltip, {opacity: 0, y: 10}, {opacity: 1, y: 0, duration: .2})

        window.addEventListener('resize', () => {
            positioningElement(el, this._tooltip, 0, 16)
        })

        window.addEventListener('scroll', () => {
            positioningElement(el, this._tooltip, 0, 16)
        })

        this._tl.play();
    }
    hideTooltip() {
        if (this._tooltip) {
            this._tl.reverse().then(() => {
                document.body.removeChild(this._tooltip);
            });
        }
    }
}
