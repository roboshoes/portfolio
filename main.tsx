import * as React from "react";
import { render } from "react-dom";
import * as Webfont from "webfontloader";

import { Background } from "./scripts/components/background";
import { Brag } from "./scripts/components/brag";
import { Contact } from "./scripts/components/contact";
import { Detail, DETAIL_ROUTE } from "./scripts/components/detail";
import { Header } from "./scripts/components/header";
import { Mouse } from "./scripts/components/mouse";
import { Who } from "./scripts/components/who";
import { Work } from "./scripts/components/work";
import { observeRoute } from "./scripts/services/router";
import ss from "./styles/shared.scss";
import { setScrollElement } from "./scripts/services/scroll";

class App extends React.Component {

    private siteRef = React.createRef<HTMLDivElement>();

    componentDidMount() {
        if ( this.siteRef.current ) {
            setScrollElement( this.siteRef.current );
        }
    }

    render() {
        return <>
            <Background />
            <div className={ ss.site } ref={ this.siteRef }>
                <Header delay={ 200 } />
                <Who delay={ 400 } />
                <Work delay={ 600 } />
                <Brag delay={ 1000 } />
                <Contact delay={ 1200 } />
                <Detail />
            </div>
            <Mouse />
        </>;
    }
}


Webfont.load( {
    active: () => render( <App/>, document.getElementById( "root" ) ),
    google: {
        families: [ "Reem Kufi", "Droid Sans" ]
    },
} );

