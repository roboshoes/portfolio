import * as React from "react";
import s from "./background.scss";
import { times } from "lodash";

export class Background extends React.Component {

    private canvasRef = React.createRef<HTMLCanvasElement>();
    private animation?: Animation;

    componentDidMount() {
        if ( this.canvasRef.current ) {
            const canvas = this.canvasRef.current;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            this.animation = new Animation( canvas );
            this.animation.render();
        }
    }

    render() {
        return <canvas className={ s.canvas } ref={ this.canvasRef }></canvas>;
    }
}

class Animation {
    private context: CanvasRenderingContext2D;
    private lines: Line[];

    constructor( private canvas: HTMLCanvasElement ) {
        this.context = canvas.getContext( "2d" )!;
        this.context.fillStyle = "rgb( 20, 20, 20 )";
        this.lines = times( 10, i => new Line( i * 50 ) );
    }

    render() {
        this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
        this.lines.forEach( line => line.render( this.context ) );
    }
}

class Line {
    private blocks: Block[];

    constructor( public y: number ) {
        this.blocks = times<Block>( 10, i => ( {
            start: i * 30,
            end: i * 30 + 10,
         } ) );
    }

    render( context: CanvasRenderingContext2D ) {
        this.blocks.forEach( block => {
            context.fillRect( block.start, this.y , block.end - block.start, 30 );
        } );
    }
}

interface Block {
    start: number;
    end: number;
}
