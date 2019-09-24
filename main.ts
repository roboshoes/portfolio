import "./scripts/components/mathias";
import "./scripts/components/menu";
import "./scripts/components/pages/who";

import { customElement, html, LitElement } from "lit-element";
import * as Webfont from "webfontloader";

import { backgroundElement } from "./scripts/components/gl/background";

@customElement( "app-app" )
class AppElement extends LitElement {
    render() {
        return html`
            <app-menu></app-menu>
            <app-who></app-who>
            <app-mathias></app-mathias>
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
