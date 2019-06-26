import classnames from "classnames";
import * as React from "react";

import { Project } from "../content";
import { loadImage } from "../services/loader";
import { setRoute } from "../services/router";
import s from "./picture.scss";

export class Picture {
    private image?: HTMLImageElement;

    get width(): number {
        return this.image ? this.image.width : 0;
    }

    get height(): number {
        return this.image ? this.image.height : 0;
    }

    get url(): string {
        return this.project.mainImage;
    }

    get name(): string {
        return this.project.title;
    }

    constructor( private readonly project: Project ) {}

    async load(): Promise<void> {
        const payload = await loadImage( this.project.mainImage );
        this.image = payload.image;
    }
}

interface PictureOutletProps {
    x: number;
    index: number;
    selected: boolean;
    hidden: boolean;
    picture: Picture;
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

        const styles: React.CSSProperties = {
            transform: `translate( ${ x }px, ${ y }px )`,
        };

        if ( this.props.selected ) {
            styles.height = this.getImageHeightForWidth( window.innerWidth / 2 - 77 - 20 );
        }

        return (
            <div style={ styles }
                 className={ classnames( s.frame, { [ s.animate ]: this.animated } ) }
                 onMouseDown={ () => this.onMouseDown()  }
                 onMouseUp={ () => this.onMouseUp() }>
                <img src={ this.props.picture.url } className={ s.workImage }/>
            </div>
        );
    }

    private getImageHeightForWidth( targetWidth: number ): number {
        const { width, height } = this.props.picture;
        const scale = targetWidth / width;

        return height * scale;
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
