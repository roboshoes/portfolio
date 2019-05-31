import * as React from "react";
import { render } from "react-dom";
import { Header } from "./scripts/components/header";

const App: React.FunctionComponent = () => (
    <Header />
);


render( <App/>, document.getElementById( "root" ) );
