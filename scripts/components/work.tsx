import { bindAll } from "lodash";
import * as React from "react";

import wonderland from "../../assets/wonderland.jpg";
import sharedStyles from "../../styles/shared.scss";
import { Project, work } from "../content";
import { ImagePayload, loadImage } from "../services/loader";
import styles from "./work.scss";


class Picture {
    private image?: HTMLImageElement;

    get width(): number {
        return this.image ? this.image.width : 0;
    }

    constructor( private readonly project: Project ) {}

    load(): Promise<void> {
        return loadImage( this.project.mainImage ).then( ( payload: ImagePayload ) => {
            this.image = payload.image;
        } );
    }
}

const PictureOutlet: React.FunctionComponent<{ x: number, image: string }> = ( { x, image } ) => (
    <div style={ { transform: `translateX( ${ x }px )` } } className={ styles.frame }>
        <img src={ image } className={ styles.workImage }/>
    </div>
);

export class Work extends React.Component {

    private latestY = 0;
    private mouseY = 0;
    private raf = -1;
    private pictures = work.map( project => new Picture( project ) );

    state = {
        anchor: 0,
        totalWidth: 0,
    };

    constructor( props: {} ) {
        super( props );

        bindAll( this, "onMouseDown", "onMouseMove", "onMouseUp", "loop" );

        Promise.all( this.pictures.map( picture => picture.load() ) ).then( () => {
            const totalWidth = this.pictures.reduce( ( previous, p ) => previous + p.width + 20 + 30 , 0 );

            this.setState( { totalWidth } );
        } );
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
                    { this.pictures.map( ( picture: Picture, i ) =>  {
                        const offset = this.state.anchor + this.widthUntil( i );

                        return <PictureOutlet x={ offset } image={ wonderland } key={ i } />
                    } ) }
                </div>
            </div>
        );
    }

    private widthUntil( amount: number ): number {
        let total = 0;

        for ( let i = 0; i < amount; i++ ) {
            total += this.pictures[ i ].width + 20 + 30;
        }

        return total;
    }

    private loop() {
        cancelAnimationFrame( this.raf );

        let delta = this.state.anchor + ( this.mouseY - this.latestY );

        while ( delta < 0 ) {
            delta += window.innerWidth;
        }

        delta %= window.innerWidth;

        this.setState( { anchor: delta } );

        this.raf = requestAnimationFrame( this.loop );
        this.latestY = this.mouseY;
    }

    private onMouseDown( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) {
        event.preventDefault();

        this.mouseY = event.pageX;
        this.latestY = event.pageX;

        window.addEventListener( "mousemove", this.onMouseMove );
        window.addEventListener( "mouseup", this.onMouseUp );

        this.loop();
    }

    private onMouseMove( event: MouseEvent ) {
        this.mouseY = event.pageX;
    }

    private onMouseUp() {
        window.removeEventListener( "mousemove", this.onMouseMove );
        window.removeEventListener( "mouseup", this.onMouseUp );

        this.latestY = 0;

        cancelAnimationFrame( this.raf );
    }
}

