import * as React from "react";
import { render } from "react-dom";
import * as Webfont from "webfontloader";

import { Background } from "./scripts/components/background";
import { Brag } from "./scripts/components/brag";
import { Contact } from "./scripts/components/contact";
import { Detail } from "./scripts/components/detail";
import { Header } from "./scripts/components/header";
import { Who } from "./scripts/components/who";
import { Work } from "./scripts/components/work";
import ss from "./styles/shared.scss";

const App: React.FunctionComponent = () => <>
    <Background />
    <div className={ ss.site }>
        <Header delay={ 200 } />
        <Who delay={ 400 } />
        <Work delay={ 600 } />
        <Brag delay={ 1000 }/>
        <Contact delay={ 1200 }/>
        <Detail />
    </div>
</>;

Webfont.load( {
    active: () => render( <App/>, document.getElementById( "root" ) ),
    google: {
        families: [ "Reem Kufi", "Droid Sans" ]
    },
} );

