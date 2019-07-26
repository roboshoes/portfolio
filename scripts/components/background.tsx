import { Linear, TweenLite, Power3 } from "gsap";
import { random, times } from "lodash";
import * as React from "react";
import { BehaviorSubject } from "rxjs";

import { Color } from "../services/color";
import { observeRoute } from "../services/router";
import s from "./background.scss";
import { DETAIL_ROUTE } from "./detail";

const TAU = Math.PI * 2;

export const defaultBackground: Color = [ 20, 20, 20 ];

interface Block {
    offset: number;
    size: number;
    startRepetition: number;
    startOffset: number;
    endRepetition: number;
    endOffset: number;
    t: number;
 }

class Line {
    public timeScale = 1;

    private blocks: Block[];
    private t = 0;
    private speed = random( 0.001, 0.006, true );

    private readonly BLOCK_AMOUNT = random( 3, 8, false );
    private maxBlockSize = window.innerWidth / this.BLOCK_AMOUNT;
    private fullWidth = window.innerWidth + this.maxBlockSize;

    constructor( public y: number, public height: number ) {
        this.blocks = times( this.BLOCK_AMOUNT, i => ( {
            offset: ( i / this.BLOCK_AMOUNT ) + 1,
            size: random( 0.8, true ),
            startRepetition: random( 1, 4 ),
            startOffset: Math.random(),
            endRepetition: random( 1, 4 ),
            endOffset: Math.random(),
            t: 0,
        } ) );

        window.addEventListener( "resize", () => {
            this.maxBlockSize = window.innerWidth / this.BLOCK_AMOUNT;
            this.fullWidth = window.innerWidth + this.maxBlockSize;
        } );
    }

    render( context: CanvasRenderingContext2D ) {
        const t = this.t = ( this.t + this.speed * this.timeScale ) % 1;

        for ( let i = 0; i < this.BLOCK_AMOUNT; i++ ) {
            const block = this.blocks[ i ];
            const offset = block.offset * this.fullWidth;
            const x = ( ( offset + t * this.fullWidth ) % this.fullWidth ) - this.maxBlockSize;

            const start = this.sineLoop( ( block.startRepetition * t + block.startOffset ) % 1 ) *
                this.maxBlockSize / 2 * block.size;
            const end = this.maxBlockSize - this.sineLoop( ( block.endRepetition * t + block.endOffset ) % 1 ) *
                ( this.maxBlockSize / 2 ) * block.size;

            const size = Math.abs( end - start );

            context.fillRect( x + Math.min( start, end ), this.y, size * block.t, this.height * this.timeScale );
        }
    }

    animteIn() {
        this.blocks.forEach( block => {
            TweenLite.to( block, random( 1, 4, true ), {
                t: 1,
                delay: random( 3, 9, true ),
                ease: Power3.easeIn
            } );
        } );
    }

    private sineLoop( t: number ): number {
        return Math.sin( TAU * t );
    }
}

class Animation {
    private context: CanvasRenderingContext2D;
    private lines: Line[] = [];
    private raf = -1;
    private timeScale = 1;
    private fillStyle: string;

    set slowMo( value: boolean ) {
        TweenLite.to( this, 0.8, { timeScale: value ? 0.15 : 1, ease: Linear.ease, onUpdate: () => {
            this.lines.forEach( line => line.timeScale = this.timeScale );
        } } );
    }

    constructor( private canvas: HTMLCanvasElement ) {
        this.fillStyle = `rgb( ${ defaultBackground.join( "," ) } )`;
        this.context = canvas.getContext( "2d" )!;
        this.render = this.render.bind( this );

        const makeSize = this.sizeGenerator( 5, 50, false );

        let y = 0;
        let size = makeSize();

        while ( y < window.innerHeight ) {
            const line = new Line( y, size - Math.random() * size / 2 );

            y += size;
            size = makeSize();

            this.lines.push( line );
        }
    }

    render() {
        this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
        this.context.fillStyle = this.fillStyle;

        this.lines.forEach( line => line.render( this.context ) );

        requestAnimationFrame( this.render );
    }

    start() {
        requestAnimationFrame( this.render );
    }

    stop() {
        cancelAnimationFrame( this.raf );
    }

    animateIn() {
        this.lines.forEach( line => line.animteIn() );
    }

    private sizeGenerator( min: number, max: number, float: Boolean ): () => number  {
        return () => random( min, max, float );
    }
}

export class Background extends React.Component {

    private canvasRef = React.createRef<HTMLCanvasElement>();
    private animation?: Animation;

    componentDidMount() {
        if ( this.canvasRef.current ) {
            const canvas = this.canvasRef.current;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            this.animation = new Animation( canvas );
            this.animation.start();

            observeRoute( DETAIL_ROUTE ).subscribe( ( on: boolean ) => {
                this.animation!.slowMo = on;
            } );

            window.addEventListener( "resize", () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            } );

            setTimeout( () => this.animation!.animateIn(), 1000 );
        }
    }

    componentWillUnmount() {
        if ( this.animation ) {
            this.animation.stop();
        }
    }

    render() {
        return <canvas className={ s.canvas } ref={ this.canvasRef }></canvas>;
    }
}
