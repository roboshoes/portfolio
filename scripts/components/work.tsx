import classnames from "classnames";
import { Power3, TweenLite } from "gsap";
import { bindAll, padStart } from "lodash";
import * as React from "react";

import ss from "../../styles/shared.scss";
import { work } from "../content";
import { Picture } from "../models/picture";
import { stableSort } from "../services/array";
import { measureTextWidth } from "../services/measurement";
import { getRoute, observeRoute } from "../services/router";
import { backgroundColor, defaultBackground } from "./background";
import { Buffer } from "./buffer";
import { DETAIL_ROUTE } from "./detail";
import { PictureOutlet } from "./picture-outlet";
import { Title } from "./title";
import s from "./work.scss";
import { Wrapper } from "./wrapper";

const IMAGE_PADDING = 50;
const IMAGE_HEIGHT = 480;
const WINDOW_PADDING = 77;

interface TileSize {
    x: number;
    percentage: number;
    index: number;
}

interface TabProps {
    selected: boolean;
    index: number;
    name: string;
    onSelected: ( id: number ) => void;
}

const Tab: React.FunctionComponent<TabProps> = ( { selected, index, name, onSelected } ) => {
    const [ width, setWidth ] = React.useState( 0 );
    const content = `${ name }`;

    React.useEffect( () => {
        setWidth( measureTextWidth( content ) );
    }, [ name ] );

    return <>
        <span className={ classnames( s.tabSize, { [ s.selected ]: selected } ) }
              onClick={ () => onSelected( index - 1 ) }>
            { padStart( index.toString(), 2, "0" ) }
        </span>&nbsp;
        <span className={ classnames( s.tab, s.tabSize, { [ s.selected ]: selected } ) }
              style={ { width: `${ selected ? width : 0 }px` } }>
            <span className={ s.tabHolder } style={ { width: `${ width }px` } }>{ content }</span>
            <span className={ s.tabCover }></span>
        </span>
    </>;
};

interface WorkState {
    anchor: number;
    totalWidth: number;
    startingPoint: number;
    selection: number;
    tabHidden: boolean;
}

interface WorkProps {
    delay: number;
}

export class Work extends React.Component<WorkProps, WorkState> {

    private latestY = 0;
    private mouseY = 0;
    private speed = 0;
    private raf = -1;
    private pictures = work.map( project => new Picture( project ) );
    private focused = 0;

    state: WorkState = {
        anchor: 0,
        totalWidth: 0,
        startingPoint: 0,
        selection: -1,
        tabHidden: true,
    };

    constructor( props: WorkProps ) {
        super( props );

        bindAll( this, "onMouseDown", "onMouseMove", "onMouseUp", "loop", "setOffset", "onSelect" );
    }

    componentDidMount() {
        Promise.all( this.pictures.map( picture => picture.load() ) )
            .then( () => this.calculateOffsets( true ) )
            .then( () => {
                window.addEventListener( "resize", () => this.calculateOffsets() );
            } );

        observeRoute( DETAIL_ROUTE ).subscribe( ( on: boolean ) => {
            if ( on ) {
                const id = getRoute().split( "/" )[ 2 ];

                if ( id ) {
                    const index = parseInt( id, 10 );
                    this.setState( { selection: index } );
                    backgroundColor.next( this.pictures[ index ].color );
                } else {
                    this.setState( { selection: -1 } );
                    backgroundColor.next( defaultBackground );
                }
            } else {
                this.setState( { selection: -1 } );
                backgroundColor.next( defaultBackground );
            }
        } );

        setTimeout( () => {
            this.setState( { tabHidden: false  } );
        }, this.props.delay );
    }

    render() {
        const [ layout, sizes ] = this.renderTiles();

        this.focused = this.calculateFocus( sizes );

        return (
            <div>
                <Wrapper>
                    <Title value="WORK" delay={ this.props.delay } />

                    <div className={ classnames(
                        ss.paragraph,
                        ss.textWrapper,
                        s.tabAnimation,
                        { [s.tabHidden]: this.state.tabHidden }
                    ) }>
                        {
                            this.pictures.map( ( picture, i ) => {
                                return <span key={ i } className={ s.tabContainer }>
                                    { i > 0 ? <>&nbsp;-&nbsp;</> : null }
                                    <Tab selected={ i === this.focused }
                                         index={ i + 1 }
                                         name={ picture.name }
                                         onSelected={ this.onSelect } />
                                </span>;
                            } )
                        }
                    </div>
                </Wrapper>

                <Buffer />

                <div className={ s.container } onMouseDown={ this.onMouseDown }>
                    { this.state.totalWidth > 0 ? layout : null }
                </div>
            </div>
        );
    }

    private calculateOffsets( reset = false ) {
        const totalWidth = this.pictures.reduce( ( previous, p ) => {
            return previous + this.imageWidthForHeight( p, IMAGE_HEIGHT ) + 20 + IMAGE_PADDING;
        }, 0 );

        const startingPoint = window.innerWidth - totalWidth;

        this.setState( { totalWidth, startingPoint } );

        if ( reset ) {
            this.setState( {
                anchor: totalWidth - window.innerWidth + WINDOW_PADDING
            } );
        }

    }

    private renderTiles(): [ JSX.Element[], TileSize[] ] {
        const sizes: TileSize[] = [];
        let width = 0;

        const layout = this.pictures.map( ( picture: Picture, i ) =>  {
            const imageWidth = this.imageWidthForHeight( picture, IMAGE_HEIGHT );
            let offset = this.state.startingPoint + this.state.anchor + width;
            let percentage = 1;

            width += imageWidth + 20 + IMAGE_PADDING;

            if ( offset > window.innerWidth ) {
                offset -= this.state.totalWidth;
            }

            if ( offset < 0 ) {
                const left = imageWidth + offset;
                percentage = left > 0 ? left / imageWidth : 0;
            } else if ( offset > window.innerWidth - imageWidth ) {
                const left = window.innerWidth - offset;
                percentage = left > 0 ? left / imageWidth : 0;
            } else if ( offset > window.innerWidth ) {
                percentage = 0;
            } else if ( offset < - imageWidth ) {
                percentage = 0;
            }

            sizes.push( {
                x: offset,
                percentage,
                index: i
            } );

            return <PictureOutlet x={ offset }
                                  key={ i }
                                  index={ i }
                                  focused={ i === this.focused }
                                  delay={ this.props.delay }
                                  picture={ picture }
                                  hidden={ this.state.selection > -1 }
                                  selected={ this.state.selection === i } />;
        } );

        return [ layout, sizes ];
    }

    private loop() {
        cancelAnimationFrame( this.raf );

        this.setOffset();

        this.raf = requestAnimationFrame( this.loop );
    }

    private onSelect( id: number ) {
        let width = 0;

        for ( let i = 0; i < id; i++ ) {
            const picture = this.pictures[ i ];
            width += this.imageWidthForHeight( picture, IMAGE_HEIGHT ) + 20 + IMAGE_PADDING;
        }

        let target = this.state.totalWidth - window.innerWidth - width + WINDOW_PADDING;

        const targetWithOffset = target + this.state.totalWidth;
        const object = { anchor: this.state.anchor };

        // Since all cards are in a carousel, the shourtest way could be by overshooting the full
        // length and coming back around. If so we offset the target by one full rotation.
        if ( Math.abs( target - this.state.anchor ) >
             Math.abs( targetWithOffset - this.state.anchor ) ) {
            target = targetWithOffset;
        }

        TweenLite.to( object, 0.5, { anchor: target, onUpdate: () => {
            this.setState( { anchor: this.overflowAnchor( object.anchor ) } );
        } } );
    }

    private onMouseDown( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) {
        if ( this.state.selection > -1 ) {
            return;
        }

        event.preventDefault();

        TweenLite.killTweensOf( this );

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

        if ( Math.abs( this.speed ) > 1 ) {
            TweenLite.to( this, 1, {
                mouseY: this.mouseY + this.speed * 20,
                onUpdate: this.setOffset,
                ease: Power3.easeOut,
            } );
        }
    }

    private setOffset() {
        this.speed = this.mouseY - this.latestY;

        this.setState( { anchor: this.overflowAnchor( this.state.anchor + this.speed ) } );

        this.latestY = this.mouseY;
    }

    /**
     * Makes sure that the anchor position given lays within the carousel. The method corrects the
     * value by overflowing in both directions.
     */
    private overflowAnchor( delta: number ): number {
        while ( delta < 0 ) {
            delta += this.state.totalWidth;
        }

        delta %= this.state.totalWidth;

        return delta;
    }

    private imageWidthForHeight( image: Picture, height: number ): number {
        return image.width * ( height / image.height );
    }

    private calculateFocus( array: TileSize[] ): number {
        array = stableSort( array, ( a, b ) => a.x - b.x );
        array = stableSort( array, ( a, b ) => b.percentage - a.percentage );

        return array[ 0 ].index;
    }
}

