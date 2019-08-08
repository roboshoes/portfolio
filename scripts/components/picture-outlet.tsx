import classnames from "classnames";
import * as React from "react";

import { Picture } from "../models/picture";
import { setRoute } from "../services/router";
import { ImageList } from "./picture-list";
import s from "./picture-outlet.scss";
import { IMAGE_HEIGHT_DESKTOP } from "./work";


interface PictureOutletProps {
    x: number;
    index: number;
    selected: boolean;
    hidden: boolean;
    picture: Picture;
    delay: number;
    focused?: boolean;
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
    private selected = false;
    private isMobile = window.innerWidth < 500;

    state: PictureOutletState = {
        collapse: false,
        before: true,
        idle: false,
    };

    componentWillReceiveProps( nextProps: PictureOutletProps ) {
        if ( nextProps.selected || nextProps.hidden ) {
            this.animated = true;
            this.selected = nextProps.selected;
            this.setState( { collapse: false } );
        } else if ( this.animated && ! nextProps.hidden && ! nextProps.selected ) {
            if ( this.selected ) {
                this.setState( { collapse: true } );
            }

            setTimeout( () => this.animated = false, 50 );
            setTimeout( () => this.setState( { collapse: false } ), 1000 );

            this.selected = false;
        }
    }

    componentDidMount() {
        setTimeout( () => this.setState( { before: false } ), this.props.delay + 300 );
        setTimeout( () => this.setState( { idle: true } ), this.props.delay + 1000 );

        window.addEventListener( "resize", () => {
            this.isMobile = window.innerWidth < 500;
        } );
    }

    render() {
        const halfWidth = window.innerWidth / 2;
        const styles: React.CSSProperties = {};

        if ( this.props.selected ) {

            const width = this.isMobile ? window.innerWidth - 30 : halfWidth - 77;
            const height: number = Math.min( this.getImageHeightForWidth( width ) || 0, this.isMobile ? 250 : 500 );

            styles.height = height;
            styles.transform = this.isMobile ?
                `translate( 20px, -500px )` :
                `translate( calc( 50vw - 100% - 20px ), -325px )`;

        } else if ( this.props.hidden ) {

            const width = this.getImageWidthForHeight( IMAGE_HEIGHT_DESKTOP ) || 0;
            const x = Math.sign( this.props.x + width / 2 - window.innerWidth / 2 ) > 0 ? window.innerWidth : - width;
            styles.transform = `translate( ${ x }px, 0 )`;

        } else {

            styles.transform = `translate( ${ this.props.x }px, 0 )`;

        }

        let frameWidth: number | undefined;
        let framePadding: number | undefined;

        if ( ! this.state.idle ) {
            frameWidth = this.state.before ? 0 : ( this.getImageWidthForHeight( IMAGE_HEIGHT_DESKTOP ) || 0 ) + 20;
            framePadding = this.state.before ? 0 : 10;
        }

        return (
            <div style={ styles }
                 className={ classnames( s.frame, { [ s.animate ]: this.animated, [ s.before ]: this.state.before } ) }
                 onMouseDown={ e => this.onMouseDown( e )  }
                 onMouseUp={ e => this.onMouseUp( e ) }>

                {
                    ! this.isMobile && ( this.props.selected || this.state.collapse ) ?
                        <div className={ s.imageList }>
                            <ImageList images={ this.props.picture.images }
                                       top={ ( styles.height || 0 ) as number + 20 }
                                       width={ halfWidth }
                                       collapse={ this.state.collapse } />
                        </div> : null
                }

                <span className={ s.border } style={ { width: frameWidth, padding: framePadding } }>
                    <img src={ this.props.picture.url }
                         className={ s.workImage } />
                </span>

                <div className={ classnames( s.tag, { [ s.hideTag ]: this.props.selected || this.state.before } ) }>
                    { this.props.picture.name }
                </div>

                <div className={ classnames( s.close, { [ s.hideTag ]: ! this.props.selected || this.state.before } ) }
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
        if ( this.props.selected ) {
            return;
        }

        const x = event.pageX - this.mousePosition.x;
        const y = event.pageY - this.mousePosition.y;
        const distance = Math.sqrt( x * x + y * y );

        if ( Date.now() - this.mouseDown < 200 && distance < 5 ) {
            setRoute( `/work/${ this.props.index }` );
        }
    }
}
