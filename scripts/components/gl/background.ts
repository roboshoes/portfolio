import { Color, PerspectiveCamera, Scene, WebGLRenderer } from "three";

import { Ribbon } from "./ribbon";

const camera = new PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 1, 10000 );
const scene = new Scene();
const renderer = new WebGLRenderer();
const style: CSSStyleDeclaration = renderer.domElement.style;

style.position = "absolute";
style.top = "0";
style.left = "0";
style.zIndex = "-1";

camera.position.set( 0, 0, -10 );
camera.lookAt( 0, 0, 0 );

renderer.setSize( window.innerWidth, window.innerHeight );

window.addEventListener( "resize", () => {
    renderer.setSize( window.innerWidth, window.innerHeight );

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
} );

const ribbon = new Ribbon();

scene.add( ribbon );
scene.background = new Color( "white" );

const start = Date.now() / 1000;

function loop() {
    const delta = Date.now() / 1000 - start;

    ribbon.update( ( delta % 6 ) / 6 );

    renderer.render( scene, camera );

    requestAnimationFrame( loop );
}

loop();

export const backgroundElement: HTMLCanvasElement = renderer.domElement;
