import "./scripts/components/mathias";
import "./scripts/components/who";

import { customElement, html, LitElement, property } from "lit-element";
import * as Webfont from "webfontloader";

import { backgroundElement } from "./scripts/components/gl/background";

@customElement( "app-app" )
class AppElement extends LitElement {
    @property( { type: Boolean } ) hideMathias = false;

    render() {
        return html`
            <app-who
                @active="${ () => this.hideMathias = true }"
                @idle="${ () => this.hideMathias = false }"
            ></app-who>
            <app-mathias hide="${ this.hideMathias }"></app-mathias>
        `;
    }

}

Webfont.load( {
    active: () => {
        document.body.appendChild( backgroundElement );
        document.body.appendChild( new AppElement() );
    },
    google: {
        families: [ "Reem Kufi", "Merriweather:300,400" ]
    },
} );
