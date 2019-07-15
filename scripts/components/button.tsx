import * as React from "react";
import classnames from "classnames";
import s from "./button.scss";

interface ButtonProps {
    name: string;
    link: string;
}

export class Button extends React.Component<ButtonProps> {

    private timeout = -1;

    state = {
        before: true,
    };

    componentDidMount() {
        this.timeout = setTimeout( () => this.setState( { before: false } ), 1000 );
    }

    componentWillUnmount() {
        clearTimeout( this.timeout );
    }

    render() {
        return <a className={ classnames( s.button, { [ s.before ]: this.state.before } ) }
                  target="_blank"
                  href={ this.props.link }>
            <span >{ this.props.name }</span>
        </a>;
    }
}
