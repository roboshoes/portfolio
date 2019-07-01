export interface ImagePayload {
    image: HTMLImageElement;
    url: string;
}

export function loadImage( url: string ): Promise<ImagePayload> {
    return new Promise<ImagePayload>( ( resolve ) => {
        const image = new Image();
        image.src = url;
        image.onload = () => {
            resolve( { image, url } );
        };
    } );
}

export function loadImages( urls: string[] ): Promise<ImagePayload[]> {
    return Promise.all( urls.map( url => loadImage( url ) ) );
}
