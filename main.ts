import "./scripts/components/mathias";
import "./scripts/components/menu";
import "./scripts/components/pages/contact";
import "./scripts/components/pages/who";
import "./scripts/components/pages/work/work";
import "./scripts/components/pages/work/work-menu";

import { customElement, html, LitElement } from "lit-element";
import * as Webfont from "webfontloader";

import { backgroundElement } from "./scripts/components/gl/background";
import { setForward, initRouter } from "./scripts/services/router";

@customElement( "app-app" )
class AppElement extends LitElement {
    render() {
        return html`
            <app-who></app-who>
            <app-contact></app-contact>
            <app-mathias></app-mathias>
            <app-work></app-work>
            <app-work-menu></app-work-menu>
            <app-menu></app-menu>
        `;
    }
}

setForward( "/work", "/work/1" );

Webfont.load( {
    active: () => {
        document.body.appendChild( backgroundElement );
        document.body.appendChild( new AppElement() );

        initRouter();
    },
    google: {
        families: [ "Reem Kufi", "Merriweather:300,400" ]
    },
} );
