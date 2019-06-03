
export interface Renderable {
    render( context: CanvasRenderingContext2D ): void;
}

export class Renderer {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private isRendering = false;
    private children: Renderable[] = [];

    get domElement(): HTMLCanvasElement {
        return this.canvas;
    }

    constructor() {
        this.canvas = document.createElement( "canvas" );
        this.context = this.canvas.getContext( "2d" )!;

        this.render = this.render.bind( this );
        this.onResize();

        window.addEventListener( "resize", () => this.onResize() );
    }

    add( object: Renderable ) {
        this.children.push( object );

        if ( !this.isRendering && this.children.length > 0 ) {
            this.isRendering = true;
            this.render();
        }
    }

    remove( object: Renderable ) {
        const index = this.children.indexOf( object );

        if ( index > -1 ) {
            this.children.splice( index, 1 );
        }

        if ( this.children.length === 0 ) {
            this.isRendering = false;
        }
    }

    private render() {
        this.canvas.width = this.canvas.width;
        this.context.beginPath();

        for ( let i = 0; i < this.children.length; i++ ) {
            this.children[ i ].render( this.context );
        }

        if ( this.isRendering ) {
            requestAnimationFrame( this.render );
        }
    }

    private onResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
}
