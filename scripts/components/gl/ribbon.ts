import { Color, DoubleSide, Mesh, PlaneBufferGeometry, ShaderLib, ShaderMaterial, UniformsUtils } from "three";

import { generateTexture } from "./gradient-texture";

const projectVertex = `
    #include <common>
    #include <uv_pars_vertex>
    #include <uv2_pars_vertex>
    #include <envmap_pars_vertex>
    #include <color_pars_vertex>
    #include <fog_pars_vertex>
    #include <morphtarget_pars_vertex>
    #include <skinning_pars_vertex>
    #include <logdepthbuf_pars_vertex>
    #include <clipping_planes_pars_vertex>

    uniform vec3 uColor;
    uniform sampler2D uTexture;

    void main() {
        vColor = uColor;

        vec4 transformed = vec4( position, 1.0 );
        vec4 glPosition = projectionMatrix * modelViewMatrix * transformed;

        vec3 screenCoords = glPosition.xyz / glPosition.w;
        vec2 uv = screenCoords.xy * 0.5 + 0.5;

        float offset = texture2D( uTexture, uv ).r;

        transformed.z -= smoothstep( 0.0, 1.0, offset ) * 4.0;

        gl_Position = projectionMatrix * modelViewMatrix * transformed;
    }
`;

const geometry = new PlaneBufferGeometry( 5, 1, 100, 50 );
const material = new ShaderMaterial( {
    uniforms: UniformsUtils.merge( [
        ShaderLib.basic.uniforms,
        {
            uColor: { value: new Color( 1, 0, 0 ) },
            uTexture: { value: generateTexture() },
        }
    ] ),

    defines: {
        USE_COLOR: "1"
    },

    side: DoubleSide,

    vertexShader: projectVertex,
    fragmentShader: ShaderLib.basic.fragmentShader,
} );

export class Ribbon extends Mesh {
    private start: number ;
    private y: number;
    private z: number;

    constructor() {
        const m = material.clone();
        const tone = Math.random() * 0.7 + 0.3;

        m.uniforms.uColor.value = new Color( tone, 1, 1 );

        super( geometry, m );

        this.start = Math.random();
        this.y = -10 + Math.random() * 20;
        this.z = Math.random() * 5;

        this.scale.set( Math.random() + 0.5, Math.random(), 1 );
    }

    update( t: number ) {
        const p = ( 1 - t + this.start ) % 1;
        const x = 15 + p * -30;

        this.position.set( x, this.y, this.z );
    }
}
