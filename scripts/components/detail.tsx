import * as React from "react";

import { observeRoute } from "../services/router";
import s from "./detail.scss";

export class Detail extends React.Component {

    state = {
        open: false
    };

    constructor( props: {} ) {
        super( props );

        observeRoute( /$\/work\/*/ ).subscribe( on => this.setState( { open: on } ) );
    }

    render() {
        return <div className={ s.wrapper }>
            Work overlay
        </div>;
    }
}
