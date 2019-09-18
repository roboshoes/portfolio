import * as Webfont from "webfontloader";
import { MenuElement } from "./scripts/components/menu";

Webfont.load( {
    active: () => {
        document.body.appendChild( new MenuElement() );
    },
    google: {
        families: [ "Reem Kufi", "Droid Sans" ]
    },
} );
