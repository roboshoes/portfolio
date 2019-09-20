import { CanvasTexture, Texture } from "three";

export function generateTexture(): Texture {

    const canvas = document.createElement( "canvas" );
    const context = canvas.getContext( "2d" )!;

    canvas.width = 64;
    canvas.height = 1;

    const gradient = context.createLinearGradient( 0, 0, 64, 0 );

    gradient.addColorStop( 0, "black" );
    gradient.addColorStop( 0.3, "black" );
    gradient.addColorStop( 0.5, "red" );
    gradient.addColorStop( 0.7, "red" );
    gradient.addColorStop( 0.9, "black" );

    context.fillStyle = gradient;
    context.fillRect( 0, 0, 64, 1 );

    return new CanvasTexture( canvas );
}
