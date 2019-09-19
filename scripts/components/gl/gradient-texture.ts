import { Texture } from "three";

export function generateTexture(): Texture {

    const canvas = document.createElement( "canvas" );
    const context = canvas.getContext( "2d" )!;

    canvas.width = 64;
    canvas.height = 1;

    const texture = new Texture( canvas );

    return texture;
}
