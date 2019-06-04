import * as React from "react";
import { bindAll } from "lodash";

import sharedStyles from "../../styles/shared.scss";
import styles from "./work.scss";


export class Work extends React.Component {

    private latestY = 0;
    private mouseY = 0;
    private raf = -1;

    state = {
        anchor: 0
    };

    constructor( props: {} ) {
        super( props );

        bindAll( this, "onMouseDown", "onMouseMove", "onMouseUp", "loop" );
    }

    render() {
        return (
            <div>
                <div className={ sharedStyles.titleWrapper }>
                    <div className={ sharedStyles.bar }></div>
                    <div className={ sharedStyles.title }>WORK</div>
                </div>
                <div className={ sharedStyles.paragraph }>
                    01 - 02 - 03 - Window Wonderland - 05
                </div>
                <div className={ styles.container } onMouseDown={ this.onMouseDown }>
                    <div className={ styles.block } style={ { transform: `translateX( ${ this.state.anchor }px )` } }>

                    </div>
                </div>
            </div>
        );
    }

    private loop() {
        cancelAnimationFrame( this.raf );

        const delta = this.mouseY - this.latestY;

        this.setState( { anchor: this.state.anchor + delta } );

        this.raf = requestAnimationFrame( this.loop );
        this.latestY = this.mouseY;
    }

    private onMouseDown( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) {
        this.mouseY = event.pageX;
        this.latestY = event.pageX;

        window.addEventListener( "mousemove", this.onMouseMove );
        window.addEventListener( "mouseup", this.onMouseUp );

        this.loop();
    }

    private onMouseMove( event: MouseEvent ) {
        this.mouseY = event.pageX;
    }

    private onMouseUp( event: MouseEvent ) {
        window.removeEventListener( "mousemove", this.onMouseMove );
        window.removeEventListener( "mouseup", this.onMouseUp );

        this.latestY = 0;

        cancelAnimationFrame( this.raf );
    }
}

class Picture extends React.Component<{ x: number }> {

    render() {
        return (
            <div style={ { transform: `translateX( ${ this.props.x } )`} }></div>
        );
    }

}
