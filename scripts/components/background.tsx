import * as React from "react";
import s from "./background.scss";
import { times, random } from "lodash";
import { onRoute, observeRoute } from "../services/router";
import { DETAIL_ROUTE } from "./detail";
import { TweenLite, Power2 } from "gsap";

const TAU = Math.PI * 2;

interface Block {
    offset: number;
    size: number;
    pulses: number;
}

class Line {
    public timeScale = 1;

    private blocks: Block[];
    private t = 0;
    private speed = random( 0.001, 0.006, true );

    private readonly BLOCK_AMOUNT = random( 3, 12, false );
    private readonly MAX_BLOCK_SIZE = window.innerWidth / this.BLOCK_AMOUNT;

    constructor( public y: number, public height: number ) {
        this.blocks = times<Block>( this.BLOCK_AMOUNT, i => ( {
            offset: ( i / this.BLOCK_AMOUNT ) * window.innerWidth,
            size: random( 0.8, true ),
            pulses: random( 1, 10, false ),
         } ) );
    }

    render( context: CanvasRenderingContext2D ) {
        const t = this.t = ( this.t + this.speed * this.timeScale ) % 1;

        this.blocks.forEach( block => {
            const x = ( block.offset + t * window.innerWidth ) % window.innerWidth;
            const sizeOffset = ( Power2.easeOut.getRatio( Math.sin( TAU * block.pulses * t ) + 1 ) / 2 ) *
                ( this.MAX_BLOCK_SIZE * block.size );

            context.fillRect( x - sizeOffset / 2, this.y, sizeOffset, this.height * this.timeScale );
        } );
    }
}

class Animation {
    private context: CanvasRenderingContext2D;
    private lines: Line[] = [];
    private raf = -1;
    private timeScale = 1;

    set slowMo( value: boolean ) {
        TweenLite.to( this, 0.8, { timeScale: value ? 0.15 : 1, ease: Power2.easeInOut, onUpdate: () => {
            this.lines.forEach( line => line.timeScale = this.timeScale );
        } } );
    }

    constructor( private canvas: HTMLCanvasElement ) {
        this.context = canvas.getContext( "2d" )!;
        this.context.fillStyle = "rgb( 30, 30, 30 )";

        this.render = this.render.bind( this );

        let y = 0;
        let size = random( 10, 30, false );

        while ( y < window.innerHeight ) {
            const line = new Line( y, size - 2 );

            y += size;
            size = random( 10, 30, false );

            this.lines.push( line );
        }
    }

    render() {
        this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
        this.lines.forEach( line => line.render( this.context ) );

        requestAnimationFrame( this.render );
    }

    start() {
        requestAnimationFrame( this.render );
    }

    stop() {
        cancelAnimationFrame( this.raf );
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




