import { Pointlike } from "./point";

export interface  View {

    position: Pointlike;
    children?: View[];

    render( context: CanvasRenderingContext2D ): void;
}
