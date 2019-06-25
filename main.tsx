import * as React from "react";
import { render } from "react-dom";

import { Brag } from "./scripts/components/brag";
import { Header } from "./scripts/components/header";
import { Who } from "./scripts/components/who";
import { Contact } from "./scripts/components/contact";
import { Work } from "./scripts/components/work";
import { Detail } from "./scripts/components/detail";
import ss from "./styles/shared.scss";

const App: React.FunctionComponent = () => (
    <div className={ ss.site }>
        <Header />
        <Who />
        <Work />
        <Brag />
        <Contact />
        <Detail />
    </div>
);

render( <App/>, document.getElementById( "root" ) );
