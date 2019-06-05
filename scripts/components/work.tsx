import { bindAll } from "lodash";
import * as React from "react";

import { padStart } from "lodash";
import sharedStyles from "../../styles/shared.scss";
import { Project, work } from "../content";
import { ImagePayload, loadImage } from "../services/loader";
import styles from "./work.scss";
import { measureTextWidth } from "../services/measurement";


class Picture {
    private image?: HTMLImageElement;

    get width(): number {
        return this.image ? this.image.width : 0;
    }

    get url(): string {
        return this.project.mainImage;
    }

    get name(): string {
        return this.project.title;
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

interface TabProps { selected: boolean; index: number; name: string; }
const Tab: React.FunctionComponent<TabProps> = ( { selected, index, name } ) => {
    const [ width, setWidth ] = React.useState( 0 );
    const content = `| ${ name }`;

    React.useEffect( () => {
        setWidth( measureTextWidth( content ) );
    }, [ name ] );

    return <>
        <span>{ padStart( index.toString(), 2, "0" ) }</span>&nbsp;
        <span className={ [ styles.tab, selected ? styles.open : "" ].join( " " ) }
              style={ { width: `${ selected ? width : 0 }px` } }>
            <span className={ styles.tabHolder } style={ { width: `${ width }px` } }>{ content }</span>
        </span>
    </>;
};

export class Work extends React.Component {

    private latestY = 0;
    private mouseY = 0;
    private raf = -1;
    private pictures = work.map( project => new Picture( project ) );
    private selected = 0;

    state = {
        anchor: 0,
        totalWidth: 0,
        startingPoint: 0,
    };

    constructor( props: {} ) {
        super( props );

        bindAll( this, "onMouseDown", "onMouseMove", "onMouseUp", "loop" );

        Promise.all( this.pictures.map( picture => picture.load() ) ).then( () => {
            const totalWidth = this.pictures.reduce( ( previous, p ) => previous + p.width + 20 + 30 , 0 );
            const startingPoint = window.innerWidth - totalWidth;

            this.setState( { totalWidth, startingPoint } );
        } );
    }

    render() {
        let found = false;

        return (
            <div>
                <div className={ sharedStyles.titleWrapper }>
                    <div className={ sharedStyles.bar }></div>
                    <div className={ sharedStyles.title }>WORK</div>
                </div>
                <div className={ sharedStyles.paragraph }>
                    {
                        this.pictures.map( ( picture, i ) => {
                            return <span key={ i }>
                                { i > 0 ? " - " : null }
                                <Tab  selected={ i === this.selected } index={ i + 1 } name={ picture.name } />
                            </span>;
                        } )
                    }
                </div>
                <div className={ styles.container } onMouseDown={ this.onMouseDown }>
                    { this.pictures.map( ( picture: Picture, i ) =>  {
                        let offset = this.state.startingPoint + this.state.anchor + this.widthUntil( i );

                        if ( offset > window.innerWidth ) {
                            offset -= this.state.totalWidth;
                        }

                        if ( offset > 0 && ! found ) {
                            this.selected = i;
                            found = true;
                        }

                        return <PictureOutlet x={ offset } image={ picture.url } key={ i } />;
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
            delta += this.state.totalWidth;
        }

        delta %= this.state.totalWidth;

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

