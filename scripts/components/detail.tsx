import classnames from "classnames";
import * as React from "react";

import { observeRoute, getRoute } from "../services/router";
import s from "./detail.scss";
import ss from "../../styles/shared.scss";
import { Text } from "./text";
import { work } from "../content";

export const DETAIL_ROUTE = /^\/work(?:\/.*)?$/;

export class Detail extends React.Component {

    state = {
        open: false,
        text: "",
    };

    componentDidMount() {
        observeRoute( DETAIL_ROUTE ).subscribe( on => {
            this.setState( { open: on } );

            if ( on ) {
                const id = getRoute().split( "/" )[ 2 ];

                if ( id ) {
                    const index = parseInt( id, 10 );
                    const project = work[ index ];

                    this.setState( { text: project.description } );
                }
            }
        } );
    }

    render() {
        return (
            <div className={ classnames( s.wrapper, { [ s.open ]: this.state.open } ) }>
                <div className={ s.imageContainer }></div>
                <div className={ s.textContainer }>
                    {
                        this.state.open ? <div className={ s.contentWrapper }>
                            <h2 className={ ss.title }>TABEL</h2>
                            <div className={ s.text }>
                                <Text text={ this.state.text }/>
                            </div>
                        </div> : null
                    }
                </div>
            </div>
        );
    }
}
