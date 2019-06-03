import { Renderable } from "../renderer";

export class Who implements Renderable {

    x = 0;
    y = 100;

    render( context: CanvasRenderingContext2D ) {
        context.translate( this.x, this.y );
        context.fillStyle = "white";
        context.fillRect( 0, 8, 70, 3 );
        context.font = "17px 'Reem Kufi'";
        context.fillText( "WHO", 90, 15 );

        context.
        context.translate( - this.x, - this.y );
    }
}
