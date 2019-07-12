import * as React from "react";
import classnames from "classnames";
import s from "./button.scss";

interface ButtonProps {
    name: string;
    link: string;
}

export class Button extends React.Component<ButtonProps> {

    state = {
        before: true,
    };

    componentDidMount() {
        setTimeout( () => this.setState( { before: false } ), 1000 );
    }

    render() {
        return <div className={ classnames( s.button, { [ s.before ]: this.state.before } ) }>
            <a target="_blank" href={ this.props.link }>{ this.props.name }</a>
        </div>;
    }
}
