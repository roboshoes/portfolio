import classnames from "classnames";
import * as React from "react";

import { setRoute } from "../services/router";
import s from "./picture-outlet.scss";
import { Picture } from "../models/picture";


interface PictureOutletProps {
    x: number;
    index: number;
    selected: boolean;
    hidden: boolean;
    picture: Picture;
}

export class PictureOutlet extends React.Component<PictureOutletProps> {

    private mouseDown = Infinity;
    private mousePosition = { x: -1, y: -1 };
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

        const styles: React.CSSProperties = {
            transform: `translate( ${ x }px, ${ y }px )`,
        };

        if ( this.props.selected ) {
            styles.height = this.getImageHeightForWidth( window.innerWidth / 2 - 77 - 20 );
        }

        return (
            <div style={ styles }
                 className={ classnames( s.frame, { [ s.animate ]: this.animated } ) }
                 onMouseDown={ e => this.onMouseDown( e )  }
                 onMouseUp={ e => this.onMouseUp( e ) }>
                <img src={ this.props.picture.url } className={ s.workImage } />
                <div className={ s.tag }>{ this.props.picture.name }</div>
            </div>
        );
    }

    private getImageHeightForWidth( targetWidth: number ): number {
        const { width, height } = this.props.picture;
        const scale = targetWidth / width;

        return height * scale;
    }

    private onMouseDown( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) {
        this.mouseDown = Date.now();
        this.mousePosition.x = event.pageX;
        this.mousePosition.y = event.pageY;
    }

    private onMouseUp( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) {
        const x = event.pageX - this.mousePosition.x;
        const y = event.pageY - this.mousePosition.y;
        const distance = Math.sqrt( x * x + y * y );

        if ( Date.now() - this.mouseDown < 100 && distance < 5 ) {
            setRoute( `/work/${ this.props.index }` );
        }
    }
}
