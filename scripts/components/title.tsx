import * as React from "react";
import classnames from "classnames";

import s from "./title.scss";

export class Title extends React.Component<{ value: string, delay?: number }> {

    state = {
        hidden: true,
    };

    componentDidMount() {
        setTimeout( () => this.setState( { hidden: false  } ), this.props.delay || 100 );
    }

    render() {
        return <div className={ classnames( s.titleWrapper, { [ s.before ]: this.state.hidden } ) }>
            <div className={ s.bar }></div>
            <div className={ classnames( s.title,  { [ s.before ]: this.state.hidden } ) }>
                { this.props.value.split( "" ).map( ( char, i ) => {
                    return <span key={ i }>{ char === " " ? "\u00a0\u00a0" : char }</span>;
                } ) }
            </div>
        </div>;
    }
}
