import * as WebFontLoader from "webfontloader";
import { Renderer } from "./scripts/renderer";
import { Header } from "./scripts/components/header";
import { Who } from "./scripts/components/who";

WebFontLoader.load( {
    active: init,
    google: {
        families: [ "Droid Sans", "Reem Kufi" ]
    },
} );

const renderer = new Renderer();

function init() {
    document.body.appendChild( renderer.domElement );

    renderer.add( new Header() );
    renderer.add( new Who() );
}
