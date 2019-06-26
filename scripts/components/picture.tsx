import * as React from "react";
import classnames from "classnames";

import { setRoute } from "../services/router";
import s from "./picture.scss";

interface PictureOutletProps {
    x: number;
    image: string;
    index: number;
    selected: boolean;
    hidden: boolean;
}

export class PictureOutlet extends React.Component<PictureOutletProps> {

    private mouseDown = Infinity;
    private animated = false;

    componentWillReceiveProps( nextProps: PictureOutletProps ) {
        if ( nextProps.selected || nextProps.hidden ) {
            this.animated = true;
        } else if ( this.animated && ! nextProps.hidden && ! nextProps.selected ) {
            setTimeout( () => this.animated = false, 50 );
        }
    }

    render() {
        let x = this.props.x;
        let y = 0;

        if ( this.props.selected ) {
            x = 77;
            y = -325;
        } else if ( this.props.hidden ) {
            x = Math.sign( this.props.x - window.innerWidth / 2 ) * window.innerWidth;
        }

        return (
            <div style={ { transform: `translate( ${ x }px, ${ y }px )` } }
                 className={ classnames( s.frame, { [ s.animate ]: this.animated } ) }
                 onMouseDown={ () => this.onMouseDown()  }
                 onMouseUp={ () => this.onMouseUp() }>
                <img src={ this.props.image } className={ s.workImage }/>
            </div>
        );
    }

    private onMouseDown() {
        this.mouseDown = Date.now();
    }

    private onMouseUp() {
        if ( Date.now() - this.mouseDown < 100 ) {
            setRoute( `/work/${ this.props.index }` );
        }
    }
}
