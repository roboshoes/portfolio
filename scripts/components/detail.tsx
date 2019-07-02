import classnames from "classnames";
import * as React from "react";

import { observeRoute } from "../services/router";
import s from "./detail.scss";
import ss from "../../styles/shared.scss";
import { Text } from "./text";

export const DETAIL_ROUTE = /^\/work(?:\/.*)?$/;

export class Detail extends React.Component {

    state = {
        open: false
    };

    componentDidMount() {
        observeRoute( DETAIL_ROUTE ).subscribe( on => this.setState( { open: on } ) );
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
                                <Text text="Hey there buddy"/>
                            </div>
                        </div> : null
                    }
                </div>
            </div>
        );
    }
}
