import { loadImage } from "../services/loader";
import { Project } from "./project";

// @ts-ignore
import getPixels from "get-image-pixels";
// @ts-ignore
import getPalette from "get-rgba-palette";

export class Picture {
    private image?: HTMLImageElement;
    private dominantColor?: [ number, number, number ];

    get width(): number {
        return this.image ? this.image.width : 0;
    }

    get height(): number {
        return this.image ? this.image.height : 0;
    }

    get url(): string {
        return this.project.mainImage;
    }

    get name(): string {
        return this.project.title;
    }

    get images(): string[] {
        return this.project.images;
    }

    get color(): [ number, number, number ] {
        return this.dominantColor || [ 0, 0, 0 ];
    }

    constructor( private readonly project: Project ) {}

    async load(): Promise<void> {
        const payload = await loadImage( this.project.mainImage );

        this.image = payload.image;

        const pixels = getPixels( this.image );
        const palette = getPalette( pixels, 1 );

        this.dominantColor = palette[ 0 ];
    }
}
