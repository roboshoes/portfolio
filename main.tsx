import * as React from "react";
import { render } from "react-dom";

import { Brag } from "./scripts/components/brag";
import { Header } from "./scripts/components/header";
import { Who } from "./scripts/components/who";
import { Contact } from "./scripts/components/contact";

const App: React.FunctionComponent = () => (
    <>
        <Header />
        <Who />
        <Brag />
        <Contact />
    </>
);


render( <App/>, document.getElementById( "root" ) );
