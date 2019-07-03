import * as React from "react";
import classnames from "classnames";

import ss from "../../styles/shared.scss";
import s from "./title.scss";

export class Title extends React.Component<{ value: string }> {

    state = {
        hidden: true,
    };

    componentDidMount() {
        setTimeout( () => this.setState( { hidden: false  } ), 100 );
    }

    render() {
        return <div className={ classnames( ss.titleWrapper, { [ ss.before ]: this.state.hidden } ) }>
            <div className={ ss.bar }></div>
            <div className={ classnames( ss.title, s.title,  { [ s.before ]: this.state.hidden } ) }>
                { this.props.value.split( "" ).map( ( char, i ) => <span key={ i }>{ char }</span> ) }
            </div>
        </div>;
    }
}
