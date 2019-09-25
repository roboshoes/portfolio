import "./scripts/components/mathias";
import "./scripts/components/menu";
import "./scripts/components/pages/contact";
import "./scripts/components/pages/who";

import { customElement, html, LitElement } from "lit-element";
import * as Webfont from "webfontloader";

import { backgroundElement } from "./scripts/components/gl/background";

@customElement( "app-app" )
class AppElement extends LitElement {
    render() {
        return html`
            <app-who></app-who>
            <app-contact></app-contact>
            <app-mathias></app-mathias>
            <app-menu></app-menu>
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
