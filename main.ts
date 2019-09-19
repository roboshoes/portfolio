import * as Webfont from "webfontloader";
import { MenuElement } from "./scripts/components/menu";
import { WhoElement } from "./scripts/components/who";

Webfont.load( {
    active: () => {
        document.body.appendChild( new MenuElement() );
        document.body.appendChild( new WhoElement() );
    },
    google: {
        families: [ "Reem Kufi", "Merriweather:300,400" ]
    },
} );
