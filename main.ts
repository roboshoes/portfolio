import "./scripts/components/mathias";
import "./scripts/components/who";

import { LitElement, html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import * as Webfont from "webfontloader";

import { backgroundElement } from "./scripts/components/gl/background";

@customElement("app-app")
class AppElement extends LitElement {
    @property({ type: Boolean }) hideMathias = false;

    render(): TemplateResult {
        return html`
            <app-who @active="${() => (this.hideMathias = true)}" @idle="${() => (this.hideMathias = false)}"></app-who>
            <app-mathias hide="${this.hideMathias}"></app-mathias>
        `;
    }
}

Webfont.load({
    active: () => {
        document.body.appendChild(backgroundElement);
        document.body.appendChild(new AppElement());
    },
    google: {
        families: ["Reem Kufi", "Merriweather:300,400"]
    }
});
