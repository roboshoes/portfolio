import * as Webfont from "webfontloader";

import { backgroundElement } from "./scripts/components/gl/background";
import { MathiasElement } from "./scripts/components/mathias";
import { MenuElement } from "./scripts/components/menu";
import { WhoElement } from "./scripts/components/pages/who";



Webfont.load( {
    active: () => {
        document.body.appendChild( backgroundElement );
        document.body.appendChild( new MenuElement() );
        document.body.appendChild( new WhoElement() );
        document.body.appendChild( new MathiasElement() );
    },
    google: {
        families: [ "Reem Kufi", "Merriweather:300,400" ]
    },
} );
