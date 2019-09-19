import { toCSS } from "./services/css";
import { CSSResult } from "lit-element";

export const colors: number[] = [ 0x00FFFF, 0xFF00E5, 0xFAFF00 ];
export const colorsCSS: CSSResult[] = colors.map( color => toCSS( color ) );
