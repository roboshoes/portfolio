import * as React from "react";
import { render } from "react-dom";

import { Brag } from "./scripts/components/brag";
import { Header } from "./scripts/components/header";
import { Who } from "./scripts/components/who";

const App: React.FunctionComponent = () => (
    <>
        <Header />
        <Who />
        <Brag />
    </>
);


render( <App/>, document.getElementById( "root" ) );
