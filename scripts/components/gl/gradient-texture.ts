import { random } from "lodash";
import { CanvasTexture, Texture } from "three";

export function generateTexture(): Texture {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d")!;

    canvas.width = 64;
    canvas.height = 1;

    const gradient = context.createLinearGradient(0, 0, 64, 0);
    const switches = random(1, 7, false);
    const step = 1 / switches;

    let isOn = false;

    for (let i = 0; i < switches; i++) {
        const point = i * step + random(0, step);

        gradient.addColorStop(point, isOn ? "red" : "black");

        isOn = !isOn;
    }

    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 1);

    return new CanvasTexture(canvas);
}
