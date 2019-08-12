import classnames from "classnames";
import { bindAll } from "lodash";
import * as React from "react";
import { BehaviorSubject } from "rxjs";

import s from "./mouse.scss";

export type MouseMode = "drag" | "cursor";

interface MouseState {
    isMouseDown: boolean;
    instructions: boolean;
    mode: MouseMode;
    hasMouse: boolean;
}

export class Mouse extends React.Component<{}, MouseState> {
    static get mode(): MouseMode { return Mouse.modeEvent.value; }
    static set mode( value: MouseMode ) { Mouse.modeEvent.next( value ); }

    static get instructionsVisible(): boolean { return Mouse.instructionsEvent.value; }
    static set instructionsVisible( value: boolean ) { Mouse.instructionsEvent.next( value ); }

    private static modeEvent = new BehaviorSubject<MouseMode>( "cursor" );
    private static instructionsEvent = new BehaviorSubject<boolean>( false );

    private wrapperRef = React.createRef<HTMLDivElement>();

    state = {
        hasMouse: false,
        isMouseDown: false,
        instructions: false,
        mode: "cursor" as MouseMode,
    };

    constructor( props: {} ) {
        super( props );

        bindAll( this, "onMouseMoveOnce", "onMouseMove" );
    }

    componentDidMount() {
        if ( this.wrapperRef.current ) {
            window.addEventListener( "mousemove", this.onMouseMoveOnce );
            window.addEventListener( "mousemove", this.onMouseMove );
            document.addEventListener( "mousedown", () => this.setState( { isMouseDown: true } ) );
            document.addEventListener( "mouseup", () => this.setState( { isMouseDown: false } ) );

            Mouse.instructionsEvent.subscribe( value => this.setState( { instructions: value } ) );
            Mouse.modeEvent.subscribe( value => this.setState( { mode: value } ) );
        }
    }

    render() {
        return <div className={
                        classnames( s.wrapper, {
                            [ s.hidden ]: !this.state.hasMouse,
                            [ s.mouseDown ]: this.state.isMouseDown,
                            [ s.cursor ]: this.state.mode === "cursor"
                        } )
                    }
                    ref={ this.wrapperRef }>
            <div className={ classnames( s.center, s.element ) }></div>
            <div className={ classnames( s.centerFrame, s.element ) }></div>
            <div className={ classnames( s.label, s.element, { [ s.hidden ]: !this.state.instructions } ) }>
                Drag &amp; Click
            </div>
        </div>;
    }

    private onMouseMove( event: MouseEvent ) {
        this.wrapperRef.current!.style.transform = `translate( ${ event.pageX - 50 }px, ${ event.pageY - 50 }px )`;
    }

    private onMouseMoveOnce() {
        this.setState( { hasMouse: true } );
        window.removeEventListener( "mousemove", this.onMouseMoveOnce );
    }
}
