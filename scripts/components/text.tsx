import classnames from "classnames";
import { Power2, Power3, SlowMo, TimelineMax } from "gsap";
import * as React from "react";

import ss from "../../styles/shared.scss";
import s from "./text.scss";

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
    private whiteAnchors: Point[] = [];
    private darkAnchors: Point[] = [];

    constructor( props: TextProps ) {
        super( props );

        this.parentRef = React.createRef<HTMLDivElement>();
        this.canvasRef = React.createRef<HTMLCanvasElement>();

        for ( let i = 0; i < 4; i++ ) {
            this.whiteAnchors.push( { x: 0, y: 0 } );
            this.darkAnchors.push( { x: 0, y: 0 } );
        }
    }

    componentDidMount() {
        if ( this.parentRef.current && this.canvasRef.current ) {
            const canvas = this.canvasRef.current;
            const context = canvas.getContext( "2d" )!;
            const size = this.parentRef.current.getBoundingClientRect();
            const backgroundColor = "#0F0F0F";

            const width = canvas.width = size.width;
            const height = canvas.height = size.height;

            this.darkAnchors[ 1 ] = { x: width, y: 0 };
            this.darkAnchors[ 2 ] = { x: width, y: height };
            this.darkAnchors[ 3 ] = { x: 0, y: height };

            context.fillStyle = "white";
            context.fillRect( 0, 0, canvas.width, canvas.height );

            const timeline: TimelineMax = this.createTimeline( width, height );

            timeline.eventCallback( "onUpdate", () => {
                context.clearRect( 0, 0, width, height );

                this.renderQuad( context, this.darkAnchors, backgroundColor );
                this.renderQuad( context, this.whiteAnchors );
            } );

            timeline.play();
        }
    }

    render() {
        return <div ref={ this.parentRef } className={ classnames( s.parent, ss.paragraph ) }>
            { this.props.text }
            <canvas ref={ this.canvasRef } className={ s.canvas }></canvas>
        </div>;
    }

    private createTimeline( width: number, height: number ) {
        const timeline = new TimelineMax( { paused: true, autoRemoveChildren: true } );

        timeline.to( this.whiteAnchors[ 1 ], 1.1, { x: width, ease: SlowMo.ease.config( 0.3, 0.3, false ) } );
        timeline.to( this.whiteAnchors[ 2 ], 0.3, { y: height, ease: Power2.easeOut }, 0.1 );
        timeline.to( this.whiteAnchors[ 3 ], 0.3, { y: height, ease: Power2.easeOut }, 0.1 );
        timeline.to( this.whiteAnchors[ 2 ], 0.7, { x: width, ease: Power2.easeInOut }, 0.41 );

        timeline.to( this.whiteAnchors[ 0 ], 0.5, { x: width, ease: Power3.easeInOut }, 0.9 );
        timeline.to( this.whiteAnchors[ 3 ], 0.6, { x: width, ease: Power3.easeInOut }, 0.96 );

        timeline.to( this.darkAnchors[ 0 ], 0.5, { x: width, ease: Power3.easeInOut }, 0.9 );
        timeline.to( this.darkAnchors[ 3 ], 0.6, { x: width, ease: Power3.easeInOut }, 0.96 );

        return timeline;
    }

    private renderQuad( context: CanvasRenderingContext2D, quad: Point[], color = "white" ) {
        context.beginPath();
        context.moveTo( quad[ 0 ].x, quad[ 0 ].y );
        context.lineTo( quad[ 1 ].x, quad[ 1 ].y );
        context.lineTo( quad[ 2 ].x, quad[ 2 ].y );
        context.lineTo( quad[ 3 ].x, quad[ 3 ].y );
        context.closePath();
        context.fillStyle = color;
        context.fill();
    }
}
