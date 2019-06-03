import { Renderable } from "../renderer";

export class Header implements Renderable {
    render( context: CanvasRenderingContext2D ) {
        context.fillStyle = "white";
        context.fillRect( 0, 0, 70, 19 );
        context.font = "21px 'Reem Kufi'";
        context.fillText( "MATHIAS PAUMGARTEN", 90, 17 );
    }
}
