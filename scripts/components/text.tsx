import classnames from "classnames";
import { Power2, Power3, TimelineMax } from "gsap";
import { random, times } from "lodash";
import * as React from "react";

import ss from "../../styles/shared.scss";
import s from "./text.scss";

interface TextProps {
    text?: string;
    delay?: number;
}

interface Line {
    begin: number;
    end: number;
}

export class Text extends React.Component<TextProps> {

    private parentRef: React.RefObject<HTMLDivElement>;
    private canvasRef: React.RefObject<HTMLCanvasElement>;

    constructor( props: TextProps ) {
        super( props );

        this.parentRef = React.createRef<HTMLDivElement>();
        this.canvasRef = React.createRef<HTMLCanvasElement>();
    }

    componentDidMount() {
        if ( this.parentRef.current && this.canvasRef.current ) {
            const canvas = this.canvasRef.current;
            const context = canvas.getContext( "2d" )!;
            const size = this.parentRef.current.getBoundingClientRect();
            const backgroundColor = "#0F0F0F";
            const foregroundColor = "#8A8A8A";

            const width = canvas.width = size.width;
            const height = canvas.height = size.height;

            const amount = Math.ceil( height / 24 );
            const lines: Line[] = times( amount, () => ( { begin: 0, end: 0 }  as Line ) );
            const timeline = this.createTimeline( lines, width );

            context.fillStyle = backgroundColor;
            context.fillRect( 0, 0, width, height );

            timeline.eventCallback( "onUpdate", () => {
                context.clearRect( 0, 0, width, height );

                lines.forEach( ( line: Line, i: number ) => {
                    context.fillStyle = backgroundColor;
                    context.fillRect( line.end, i * 24 + 1, width - line.end, 21 );

                    context.fillStyle = foregroundColor;
                    context.fillRect( line.begin, i * 24 + 1, line.end - line.begin, 21 );
                } );
            } );

            timeline.eventCallback( "onComplete", () => {
                canvas.width = canvas.height = 1;
            } );

            setTimeout( () => timeline.play(), this.props.delay || 0 );
        }
    }

    render() {
        return <div ref={ this.parentRef } className={ classnames( s.parent, ss.paragraph ) }>
            { this.props.text || this.props.children }
            <canvas ref={ this.canvasRef } className={ s.canvas }></canvas>
        </div>;
    }

    private createTimeline( lines: Line[], width: number ): TimelineMax {
        const timeline = new TimelineMax( { paused: true, autoRemoveChildren: true } );

        lines.forEach( ( line: Line, i: number ) => {
            const offset = random( 0.2, 0.4, true );
            timeline.to( line, 1.0, { end: width, ease: Power2.easeInOut }, i * 0.05 + offset );
            timeline.to( line, 1.4, { begin: width, ease: Power2.easeInOut }, 0.2 + i * 0.03 + offset );
        } );

        return timeline;
    }
}
