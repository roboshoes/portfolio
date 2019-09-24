import { Color, DoubleSide, Mesh, PlaneBufferGeometry, ShaderLib, ShaderMaterial, UniformsUtils } from "three";

import { generateTexture } from "./gradient-texture";

const vertex = /* glsl */`
    uniform vec3 uColor;
    uniform sampler2D uTexture;

    varying vec3 vColor;
    varying float vFade;

    void main() {
        vec4 transformed = vec4( position, 1.0 );
        vec4 worldPosition = modelMatrix * transformed;

        vec4 glPosition = projectionMatrix * modelViewMatrix * transformed;

        vec3 screenCoords = glPosition.xyz / glPosition.w;
        float z = ( worldPosition.z + 15.0 ) / 30.0;

        float offset = texture2D( uTexture, vec2( z, 0 ) ).r;

        transformed.y += smoothstep( 0.0, 1.0, offset ) * 4.0;

        vColor = uColor;
        vFade = ( worldPosition.z + 15.0 ) / 25.0;

        gl_Position = projectionMatrix * modelViewMatrix * transformed;
    }
`;

const fragment = /* glsl */`
    varying vec3 vColor;
    varying float vFade;

    const vec3 white = vec3( 1 );

    void main() {
        gl_FragColor = vec4( mix( vColor, white, vFade ), 1 );
    }
`;

const geometry = new PlaneBufferGeometry( 1, 5, 10, 50 );

geometry.rotateX( Math.PI / 2 );

const material = new ShaderMaterial( {
    uniforms: {
        uColor: { value: new Color( 1, 0, 0 ) },
        uTexture: { value: generateTexture() },
    },

    side: DoubleSide,

    vertexShader: vertex,
    fragmentShader: fragment,
} );

export class Ribbon extends Mesh {
    private start: number ;
    private y: number;
    private x: number;

    constructor() {
        const m = material.clone();
        const tone = Math.random() * 0.7 + 0.3;

        m.uniforms.uColor.value = new Color( tone, tone, 1 );
        m.uniforms.uTexture.value = generateTexture();

        super( geometry, m );

        this.start = Math.random();
        this.y = -5 + Math.random() * 10;
        this.x = -10 + Math.random() * 20;

        this.scale.set( Math.random() + 0.5, Math.random(), 1 );
    }

    update( t: number ) {
        const p = ( 1 - t + this.start ) % 1;
        const z = 15 + p * -30;

        this.position.set( this.x, this.y, z );
    }
}
