import * as React from "react";
import classnames from "classnames";

import ss from "../../styles/shared.scss";
import s from "./text.scss";
import { TimelineLite } from "gsap";

interface TextProps {
    text: string;
}

interface Point {
    x: number;
    y: number;
}

export class Text extends React.Component<TextProps> {

    private parentRef: React.RefObject<HTMLDivElement>;
    private canvasRef: React.RefObject<HTMLCanvasElement>;
    private anchors: Point[];

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

            canvas.width = size.width;
            canvas.height = size.height;

            context.fillStyle = "white";
            context.fillRect( 0, 0, canvas.width, canvas.height );
        }
    }

    render() {
        return <div ref={ this.parentRef } className={ classnames( s.parent, ss.paragraph ) }>
            { this.props.text }
            <canvas ref={ this.canvasRef } className={ s.canvas }></canvas>
        </div>;
    }

    private createTimeline( width: number, height: number ) {
        const timeline = new TimelineLite( { paused: true } );
    }
}
