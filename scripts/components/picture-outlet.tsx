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

interface PictureOutletState {
    collapse: boolean;
    before: boolean;
    idle: boolean;
}

export class PictureOutlet extends React.Component<PictureOutletProps, PictureOutletState> {

    private mouseDown = Infinity;
    private mousePosition = { x: -1, y: -1 };
    private animated = false;

    state: PictureOutletState = {
        collapse: false,
        before: true,
        idle: false,
    };

    componentWillReceiveProps( nextProps: PictureOutletProps ) {
        if ( nextProps.selected || nextProps.hidden ) {
            this.animated = true;
            this.setState( { collapse: false } );
        } else if ( this.animated && ! nextProps.hidden && ! nextProps.selected ) {
            this.setState( { collapse: true } );

            setTimeout( () => this.animated = false, 50 );
            setTimeout( () => this.setState( { collapse: false } ), 1000 );
        }
    }

    componentDidMount() {
        setTimeout( () => this.setState( { before: false } ), 300 );
        setTimeout( () => this.setState( { idle: true } ), 1000 );
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

        let frameWidth: number | undefined;
        let framePadding: number | undefined;

        if ( ! this.state.idle ) {
            frameWidth = this.state.before ? 0 : ( this.getImageWidthForHeight( 500 - 20 ) || 0 ) + 20;
            framePadding = this.state.before ? 0 : 10;
        }

        return (
            <div style={ styles }
                 className={ classnames( s.frame, { [ s.animate ]: this.animated, [ s.before ]: this.state.before } ) }
                 onMouseDown={ e => this.onMouseDown( e )  }
                 onMouseUp={ e => this.onMouseUp( e ) }>

                {
                    this.props.selected || this.state.collapse ?
                        <div className={ s.imageList }>
                            <ImageList images={ this.props.picture.images }
                                       top={ ( styles.height || 0 ) as number + 20 }
                                       width={ halfWidth }
                                       collapse={ this.state.collapse } />
                        </div> : null
                }

                <span className={ s.border } style={ { width: frameWidth, padding: framePadding } }>
                    <img src={ this.props.picture.url } className={ s.workImage } />
                </span>

                <div className={ classnames( s.tag, { [ s.hideTag ]: this.props.selected || this.state.before } ) }>
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

    private getImageWidthForHeight( targetHeight: number ): number | undefined {
        const { width, height } = this.props.picture;
        const scale = targetHeight / height;

        return ( width * scale ) || undefined;
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
