import classnames from "classnames";
import * as React from "react";

import { observeRoute, getRoute } from "../services/router";
import s from "./detail.scss";
import ss from "../../styles/shared.scss";
import { Text } from "./text";
import { work } from "../content";
import { Buffer } from "./buffer";
import { Button } from "./button";

export const DETAIL_ROUTE = /^\/work(?:\/.*)?$/;

interface ButtonDetail {
    name: string;
    link: string;
}

interface DetailState {
    open: boolean;
    title: string;
    text: string | JSX.Element;
    buttons: ButtonDetail[];
}

export class Detail extends React.Component<{}, DetailState> {

    private timeout = -1;

    state: DetailState = {
        open: false,
        text: "",
        title: "",
        buttons: [],
    };

    componentWillUnmount() {
        clearTimeout( this.timeout );
    }

    componentDidMount() {
        observeRoute( DETAIL_ROUTE ).subscribe( on => {
            this.setState( { open: on } );

            if ( on ) {
                const id = getRoute().split( "/" )[ 2 ];
                this.setState( { text: "" } );

                if ( id ) {
                    const index = parseInt( id, 10 );
                    const project = work[ index ];

                    this.setState( { title: project.title } );

                    this.timeout = setTimeout( () => {
                        const state: Pick<DetailState, "text" | "buttons"> = {
                            text: project.description,
                            buttons: [],
                        };

                        if ( project.buttons ) {
                            state.buttons = Object.keys( project.buttons ).map<ButtonDetail>( label => ( {
                                name: label,
                                link: project.buttons![ label ],
                            } ) );
                        }

                        this.setState( state );
                    }, 500 );
                }
            } else {
                this.setState( { text: "", buttons: [], title: "" } );
            }
        } );
    }

    render() {
        return (
            <div className={ classnames( s.wrapper, { [ s.open ]: this.state.open } ) }>
                {
                    this.state.open ? <div className={ s.contentWrapper }>
                        <h2 className={ ss.title }>{ this.state.title }</h2>

                        <Buffer />

                        <div className={ s.text }>
                            { this.state.text ? <Text>{ this.state.text }</Text> : null }
                        </div>

                        <Buffer height={ 30 } />

                        { this.state.buttons.map( ( button: ButtonDetail, i ) => {
                            return <div key={ i } className={ s.buttonWrapper }>
                                <Button name={ button.name } link={ button.link } />
                            </div>;
                        } ) }
                    </div> : null
                }
            </div>
        );
    }
}
