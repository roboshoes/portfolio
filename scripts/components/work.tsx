import classnames from "classnames";
import { Power3, TweenLite } from "gsap";
import { bindAll, padStart } from "lodash";
import * as React from "react";

import ss from "../../styles/shared.scss";
import { work } from "../content";
import { Picture } from "../models/picture";
import { measureTextWidth } from "../services/measurement";
import { getRoute, observeRoute } from "../services/router";
import { DETAIL_ROUTE } from "./detail";
import { PictureOutlet } from "./picture-outlet";
import s from "./work.scss";
import { Wrapper } from "./wrapper";
import { Title } from "./title";
import { Buffer } from "./buffer";

const IMAGE_PADDING = 50;

interface TabProps { selected: boolean; index: number; name: string; }
const Tab: React.FunctionComponent<TabProps> = ( { selected, index, name } ) => {
    const [ width, setWidth ] = React.useState( 0 );
    const content = `${ name }`;

    React.useEffect( () => {
        setWidth( measureTextWidth( content ) );
    }, [ name ] );

    return <>
        <span className={ classnames( s.tabSize, { [ s.selected ]: selected } ) }>
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
}

export class Work extends React.Component<{}, WorkState> {

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
    };

    constructor( props: {} ) {
        super( props );

        bindAll( this, "onMouseDown", "onMouseMove", "onMouseUp", "loop", "setOffset" );

        Promise.all( this.pictures.map( picture => picture.load() ) )
            .then( () => {
                const totalWidth = this.pictures.reduce( ( previous, p ) => {
                    return previous + p.width + 20 + IMAGE_PADDING;
                }, 0 );

                const startingPoint = window.innerWidth - totalWidth;

                this.setState( { totalWidth, startingPoint, anchor: totalWidth - window.innerWidth + 77 } );
            } );
    }

    componentDidMount() {
        observeRoute( DETAIL_ROUTE ).subscribe( ( on: boolean ) => {
            if ( on ) {
                const id = getRoute().split( "/" )[ 2 ];

                if ( id ) {
                    const index = parseInt( id, 10 );
                    this.setState( { selection: index } );
                } else {
                    this.setState( { selection: -1 } );
                }
            } else {
                this.setState( { selection: -1 } );
            }
        } );
    }

    render() {
        let found = false;
        let width = 0;

        return (
            <div>
                <Wrapper>
                    <Title value="WORK" />

                    <div className={ classnames( ss.paragraph, ss.textWrapper ) }>
                        {
                            this.pictures.map( ( picture, i ) => {
                                return <span key={ i } className={ s.tabContainer }>
                                    { i > 0 ? <>&nbsp;-&nbsp;</> : null }
                                    <Tab selected={ i === this.focused } index={ i + 1 } name={ picture.name } />
                                </span>;
                            } )
                        }
                    </div>
                </Wrapper>

                <Buffer />

                <div className={ s.container } onMouseDown={ this.onMouseDown }>
                    { this.state.totalWidth > 0 ? this.pictures.map( ( picture: Picture, i ) =>  {
                        let offset = this.state.startingPoint + this.state.anchor + width;

                        width += picture.width + 20 + IMAGE_PADDING;

                        if ( offset > window.innerWidth ) {
                            offset -= this.state.totalWidth;
                        }

                        if ( offset > 70 && ! found ) {
                            this.focused = i;
                            found = true;
                        }

                        return <PictureOutlet x={ offset }
                                              key={ i }
                                              index={ i }
                                              picture={ picture }
                                              hidden={ this.state.selection > -1 }
                                              selected={ this.state.selection === i } />;
                    } ) : null }
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

        let delta = this.state.anchor + this.speed;

        while ( delta < 0 ) {
            delta += this.state.totalWidth;
        }

        delta %= this.state.totalWidth;

        this.setState( { anchor: delta } );

        this.latestY = this.mouseY;
    }
}

