import { loadImage } from "../services/loader";
import { Project } from "./project";

export class Picture {
    private image?: HTMLImageElement;

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

    constructor( private readonly project: Project ) {}

    async load(): Promise<void> {
        const payload = await loadImage( this.project.mainImage );
        this.image = payload.image;
    }
}
