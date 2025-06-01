import { Color, DoubleSide, Mesh, PlaneGeometry, ShaderMaterial, Vector2 } from "three";

import { generateTexture } from "./gradient-texture";

const vertex = /* GLSL */`
    uniform vec3 uColor;
    uniform sampler2D uTexture;

    varying vec3 vColor;
    varying float vFade;
    varying vec2 vUV;

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
        vUV = worldPosition.xy;

        gl_Position = projectionMatrix * modelViewMatrix * transformed;
    }
`;

const fragment = /* GLSL */`
    uniform vec2 uResolution;

    varying vec3 vColor;
    varying float vFade;
    varying vec2 vUV;

    const vec3 white = vec3( 1 );

    float rand( vec2 n ) {
	    return fract( sin( dot( n, vec2( 12.9898, 4.1414 ) ) ) * 43758.5453 );
    }

    float noise( vec2 p ) {
        vec2 ip = floor( p );
        vec2 u = fract( p );

        u = u * u * ( 3.0 - 2.0 * u );

        float res = mix(
            mix( rand( ip ), rand( ip + vec2( 1.0,0.0 ) ), u.x ),
            mix( rand( ip + vec2( 0.0,1.0 ) ), rand( ip + vec2( 1.0,1.0 ) ), u.x ),
            u.y
        );

        return res * res;
    }

    void main() {
        vec2 uv = gl_FragCoord.xy / uResolution;

        vec3 color = vColor;

        float threshold = noise( vUV * 5.0 );

        if ( mod( threshold, 0.2 ) > 0.1 ) {
            discard;
        }

        gl_FragColor = vec4( mix( color, white, vFade ), 1 );
    }
`;

const geometry = new PlaneGeometry( 1, 5, 10, 100 );

geometry.rotateX( Math.PI / 2 );

const material = new ShaderMaterial( {
    uniforms: {
        uColor: { value: new Color( 1, 0, 0 ) },
        uTexture: { value: generateTexture() },
        uResolution: { value: new Vector2( window.innerWidth, window.innerHeight ) },
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
        const tone = Math.random() * 0.5 + 0.5;

        m.uniforms.uColor.value = new Color( tone, tone, 1 ).multiplyScalar( Math.random() * 0.3 + 0.7 );
        m.uniforms.uTexture.value = generateTexture();

        super( geometry, m );

        this.start = Math.random();
        this.y = -5 + Math.random() * 10;
        this.x = -10 + Math.random() * 20;

        this.scale.set( Math.random(), Math.random(), Math.random() + 0.5 );

        window.addEventListener( "resize", () => {
            m.uniforms.uResolution.value.x = window.innerWidth;
            m.uniforms.uResolution.value.y = window.innerHeight;
        } );
    }

    update( t: number ): void {
        const p = ( 1 - t + this.start ) % 1;
        const z = 15 + p * -30;

        this.position.set( this.x, this.y, z );
    }
}
