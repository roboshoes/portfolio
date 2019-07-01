import classnames from "classnames";
import * as React from "react";

import { Picture } from "../models/picture";
import { setRoute } from "../services/router";
import { ImageList } from "./picture-list";
import s from "./picture-outlet.scss";


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
        const halfWidth = window.innerWidth / 2 - 77 - 20;

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
            styles.height = this.getImageHeightForWidth( halfWidth );
        }

        return (
            <div style={ styles }
                 className={ classnames( s.frame, { [ s.animate ]: this.animated } ) }
                 onMouseDown={ e => this.onMouseDown( e )  }
                 onMouseUp={ e => this.onMouseUp( e ) }>

                {
                    this.props.selected ?
                        <div className={ s.imageList }>
                            <ImageList images={ this.props.picture.images }
                                       top={ ( styles.height || 0 ) as number + 20 }
                                       width={ halfWidth } />
                        </div> : null
                }

                <span className={ s.border }>
                    <img src={ this.props.picture.url } className={ s.workImage } />
                </span>

                <div className={ classnames( s.tag, { [ s.hideTag ]: this.props.selected } ) }>
                    { this.props.picture.name }
                </div>

                <div className={ classnames( s.close, { [ s.hideTag ]: !this.props.selected } ) }
                     onClick={ () => setRoute( "/" ) }>
                    Close
                </div>
            </div>
        );
    }

    private getImageHeightForWidth( targetWidth: number ): number | undefined {
        const { width, height } = this.props.picture;
        const scale = targetWidth / width;

        return ( height * scale ) || undefined;
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
