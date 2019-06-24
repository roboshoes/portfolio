import * as React from "react";
import ss from "../../styles/shared.scss";

export class Title extends React.Component<{ value: string }> {
    render() {
        return <div className={ ss.titleWrapper }>
            <div className={ ss.bar }></div>
            <div className={ ss.title }>{ this.props.value }</div>
        </div>;
    }
}
