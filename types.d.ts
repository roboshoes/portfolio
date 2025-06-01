declare module "*.scss";
declare module "*.jpg";
declare module "*.png";
declare module "*.gif";

declare module "normalize-wheel" {
    export default function (event: Event): { pixelX: number; pixelY: number };
}
