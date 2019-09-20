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
        vec4 worldPosition = modelMatrix * transformed;

        vec4 glPosition = projectionMatrix * modelViewMatrix * transformed;

        vec3 screenCoords = glPosition.xyz / glPosition.w;
        float z = ( worldPosition.z + 15.0 ) / 30.0;

        float offset = texture2D( uTexture, vec2( z, 0 ) ).r;

        transformed.y += smoothstep( 0.0, 1.0, offset ) * 4.0;

        gl_Position = projectionMatrix * modelViewMatrix * transformed;
    }
`;

const geometry = new PlaneBufferGeometry( 1, 5, 10, 50 );

geometry.rotateX( Math.PI / 2 );

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
    private x: number;

    constructor() {
        const m = material.clone();
        const tone = Math.random() * 0.7 + 0.3;

        m.uniforms.uColor.value = new Color( tone, tone, 1 );

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
