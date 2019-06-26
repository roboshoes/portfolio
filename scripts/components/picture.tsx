import * as React from "react";
import classnames from "classnames";

import { setRoute } from "../services/router";
import s from "./picture.scss";

interface PictureOutletProps {
    x: number;
    image: string;
    index: number;
    selected: boolean;
}

export class PictureOutlet extends React.Component<PictureOutletProps> {

    private mouseDown = Infinity;
    private animated = false;

    componentWillReceiveProps( nextProps: PictureOutletProps ) {
        if ( nextProps.selected && this.props.selected === false ) {
            this.animated = true;
        } else if ( nextProps.selected === false && this.props.selected ) {
            setTimeout( () => this.animated = false, 50 );
        }
    }

    render() {
        let x = this.props.x;
        let y = 0;

        if ( this.props.selected ) {
            x = 77;
            y = -325;
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
