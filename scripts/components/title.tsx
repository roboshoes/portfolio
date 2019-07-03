import * as React from "react";
import classnames from "classnames";

import ss from "../../styles/shared.scss";

export class Title extends React.Component<{ value: string }> {

    state = {
        hidden: true,
    };

    componentDidMount() {
        setTimeout( () => this.setState( { hidden: false  } ), 500 );
    }

    render() {
        return <div className={ classnames( ss.titleWrapper, { [ ss.before ]: this.state.hidden } ) }>
            <div className={ ss.bar }></div>
            <div className={ ss.title }>{ this.props.value }</div>
        </div>;
    }
}
