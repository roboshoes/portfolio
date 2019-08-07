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
import { Buffer } from "./buffer";
import { DETAIL_ROUTE } from "./detail";
import { Mouse } from "./mouse";
import { PictureOutlet } from "./picture-outlet";
import { Title } from "./title";
import s from "./work.scss";
import { Wrapper } from "./wrapper";

const IMAGE_PADDING = 50;
const WINDOW_PADDING = 77;

const IMAGE_HEIGHT_DESKTOP = 480;
const IMAGE_HEIGHT_MOBILE = 300;

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
    private mouseX = 0;
    private speed = 0;
    private raf = -1;
    private isMobile = false;
    private pictures = work.map( project => new Picture( project ) );
    private focused = 0;
    private imageHeight = IMAGE_HEIGHT_DESKTOP;

    state: WorkState = {
        anchor: 0,
        totalWidth: 0,
        startingPoint: 0,
        selection: -1,
        tabHidden: true,
    };

    constructor( props: WorkProps ) {
        super( props );

        bindAll( this,
            "loop",
            "onMouseDown",
            "onMouseMove",
            "onMouseOut",
            "onMouseOver",
            "onMouseUp",
            "onSelect",
            "onTouchStart",
            "onTouchMove",
            "setOffset",
        );
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
                    Mouse.mode = "cursor";
                } else {
                    this.setState( { selection: -1 } );
                }
            } else {
                this.setState( { selection: -1 } );
            }
        } );

        setTimeout( () => {
            this.setState( { tabHidden: false } );
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
                                    { i > 0 && !this.isMobile ? <>&nbsp;-&nbsp;</> : null }
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

                <div className={ s.container }
                     onMouseDown={ this.onMouseDown }
                     onTouchStart={ this.onTouchStart }
                     onMouseOver={ this.onMouseOver }
                     onMouseOut={ this.onMouseOut }>
                    { this.state.totalWidth > 0 ? layout : null }
                </div>
            </div>
        );
    }

    private calculateOffsets( reset = false ) {
        this.isMobile = window.innerWidth < 500;
        this.imageHeight = this.isMobile ? IMAGE_HEIGHT_MOBILE : IMAGE_HEIGHT_DESKTOP;

        const totalWidth = this.pictures.reduce( ( previous, p ) => {
            return previous + this.imageWidthForHeight( p, this.imageHeight ) + 20 + IMAGE_PADDING;
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

        const layout = this.pictures.map( ( picture: Picture, i ) => {
            const imageWidth = this.imageWidthForHeight( picture, this.imageHeight );
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
            width += this.imageWidthForHeight( picture, this.imageHeight ) + 20 + IMAGE_PADDING;
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

        TweenLite.to( object, 0.5, {
            anchor: target,
            onUpdate: () => {
                this.setState( { anchor: this.overflowAnchor( object.anchor ) } );
            }
        } );
    }

    private onTouchStart( event: React.TouchEvent<HTMLDivElement> ) {
        event.stopPropagation();
        // event.preventDefault();

        this.startMove( event.touches[ 0 ].pageX );
    }

    private onMouseDown( event: React.MouseEvent<HTMLDivElement, MouseEvent> ) {
        event.stopPropagation();
        event.preventDefault();

        this.startMove( event.pageX );
    }

    private startMove( x: number ) {
        if ( this.state.selection > -1 ) {
            return;
        }

        TweenLite.killTweensOf( this );

        this.mouseX = x;
        this.latestY = x;

        window.addEventListener( "mousemove", this.onMouseMove );
        window.addEventListener( "touchmove", this.onTouchMove );
        window.addEventListener( "mouseup", this.onMouseUp );
        window.addEventListener( "touchend", this.onMouseUp );

        Mouse.instructionsVisible = false;

        this.loop();
    }

    private onMouseMove( event: MouseEvent ) {
        this.mouseX = event.pageX;
    }

    private onTouchMove( event: TouchEvent ) {
        this.mouseX = event.touches[ 0 ].pageX;
    }

    private onMouseUp() {
        cancelAnimationFrame( this.raf );

        window.removeEventListener( "mousemove", this.onMouseMove );
        window.removeEventListener( "touchmove", this.onTouchMove );
        window.removeEventListener( "mouseup", this.onMouseUp );
        window.removeEventListener( "touchend", this.onMouseUp );


        if ( Math.abs( this.speed ) > 0.5 ) {
            TweenLite.to( this, 1, {
                mouseX: this.mouseX + this.speed * 20,
                onUpdate: this.setOffset,
                ease: Power3.easeOut,
            } );
        }
    }

    private onMouseOver() {
        if ( this.state.selection === -1 ) {
            Mouse.mode = "drag";
        }
    }

    private onMouseOut() {
        Mouse.mode = "cursor";
    }

    private setOffset() {
        this.speed = this.mouseX - this.latestY;

        this.setState( { anchor: this.overflowAnchor( this.state.anchor + this.speed ) } );

        this.latestY = this.mouseX;
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

