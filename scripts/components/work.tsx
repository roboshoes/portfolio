import classname from "classnames";
import { bindAll, padStart } from "lodash";
import * as React from "react";
import { TweenLite } from "gsap";

import ss from "../../styles/shared.scss";
import { Project, work } from "../content";
import { ImagePayload, loadImage } from "../services/loader";
import { measureTextWidth } from "../services/measurement";
import s from "./work.scss";


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
    <div style={ { transform: `translateX( ${ x }px )` } } className={ s.frame }>
        <img src={ image } className={ s.workImage }/>
    </div>
);

interface TabProps { selected: boolean; index: number; name: string; }
const Tab: React.FunctionComponent<TabProps> = ( { selected, index, name } ) => {
    const [ width, setWidth ] = React.useState( 0 );
    const content = `${ name }`;

    React.useEffect( () => {
        setWidth( measureTextWidth( content ) );
    }, [ name ] );

    return <>
        <span className={ classname( s.tabSize, { [ s.selected ]: selected } ) }>
            { padStart( index.toString(), 2, "0" ) }
        </span>&nbsp;
        <span className={ classname( s.tab, s.tabSize, { [ s.selected ]: selected } ) }
              style={ { width: `${ selected ? width : 0 }px` } }>
            <span className={ s.tabHolder } style={ { width: `${ width }px` } }>{ content }</span>
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
        let width = 0;

        return (
            <div>
                <div className={ ss.titleWrapper }>
                    <div className={ ss.bar }></div>
                    <div className={ ss.title }>WORK</div>
                </div>
                <div className={ ss.paragraph }>
                    {
                        this.pictures.map( ( picture, i ) => {
                            return <span key={ i } className={ s.tabContainer }>
                                { i > 0 ? <>&nbsp;-&nbsp;</> : null }
                                <Tab selected={ i === this.selected } index={ i + 1 } name={ picture.name } />
                            </span>;
                        } )
                    }
                </div>
                <div className={ s.container } onMouseDown={ this.onMouseDown }>
                    { this.pictures.map( ( picture: Picture, i ) =>  {
                        let offset = this.state.startingPoint + this.state.anchor + width;

                        width += picture.width + 20 + 30;

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

    private loop() {
        cancelAnimationFrame( this.raf );

        this.setOffset();

        this.raf = requestAnimationFrame( this.loop );
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
        cancelAnimationFrame( this.raf );

        window.removeEventListener( "mousemove", this.onMouseMove );
        window.removeEventListener( "mouseup", this.onMouseUp );

        TweenLite.to( this, 2.6, { mouseY: this.mouseY + 100, onUpdate: () => {
            this.setOffset();
        } } );
    }

    private setOffset() {
        let delta = this.state.anchor + ( this.mouseY - this.latestY );

        while ( delta < 0 ) {
            delta += this.state.totalWidth;
        }

        delta %= this.state.totalWidth;

        this.setState( { anchor: delta } );

        this.latestY = this.mouseY;
    }
}

