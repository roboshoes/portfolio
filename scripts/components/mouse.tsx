import classnames from "classnames";
import * as React from "react";

import s from "./mouse.scss";
import { BehaviorSubject } from "rxjs";

interface MouseState {
    isMouseDown: boolean;
}

export class Mouse extends React.Component<{}, MouseState> {
    static set visible( value: boolean ) { Mouse.visibleEvent.next( value ); }
    static get visible(): boolean { return Mouse.visibleEvent.value; }

    private static visibleEvent = new BehaviorSubject<boolean>( false );

    private wrapperRef = React.createRef<HTMLDivElement>();

    state = {
        isMouseDown: false,
    };

    componentDidMount() {
        if ( this.wrapperRef.current ) {
            window.addEventListener( "mousemove", this.onMouseMove.bind( this ) );
            document.addEventListener( "mousedown", () => this.setState( { isMouseDown: true } ) );
            document.addEventListener( "mouseup", () => this.setState( { isMouseDown: false } ) );
        }
    }

    render() {
        return <div className={ classnames( s.wrapper, { [ s.mouseDown ]: this.state.isMouseDown } ) }
                    ref={ this.wrapperRef }>
            <div className={ classnames( s.center, s.element ) }></div>
            <div className={ classnames( s.centerFrame, s.element ) }></div>
            <div className={ classnames( s.label, s.element ) }>Drag &amp; Click</div>
        </div>;
    }

    private onMouseMove( event: MouseEvent ) {
        this.wrapperRef.current!.style.transform = `translate( ${ event.pageX - 50 }px, ${ event.pageY - 50 }px )`;
    }
}
