import * as React from "react";
import classnames from "classnames";

import { observeRoute } from "../services/router";
import s from "./detail.scss";

export const DETAIL_ROUTE = /^\/work(?:\/.*)?$/;

export class Detail extends React.Component {

    state = {
        open: false
    };

    componentDidMount() {
        observeRoute( DETAIL_ROUTE ).subscribe( on => this.setState( { open: on } ) );
    }

    render() {
        return <div className={ classnames( s.wrapper, { [ s.open ]: this.state.open } ) }>

        </div>;
    }
}
