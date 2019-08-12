import * as React from "react";

export class Link extends React.Component {
    render() {
        return <span>{ this.props.children }</span>;
    }
}
