import * as React from "react";
import classnames from "classnames";

import s from "./header.scss";
import { Wrapper } from "./wrapper";


export class Header extends React.Component<{ delay: number }> {

    state = {
        hidden: true,
    };

    componentDidMount() {
        setTimeout( () => this.setState( { hidden: false  } ), this.props.delay );
    }

    render() {
        return <Wrapper>
            <header className={ classnames( s.header, { [ s.before ]: this.state.hidden } ) }>
                <span className={ s.bar }></span>
                <span className={ s.title }>
                { "MATHIAS PAUMGARTEN".split( "" ).map( ( char, i ) => {
                    return <span key={ i }>{ char === " " ? "\u00a0\u00a0" : char }</span>;
                } ) }
                </span>
            </header>
        </Wrapper>;
    }
}

