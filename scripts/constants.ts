import { toCSS } from "./services/css";
import { CSSResult } from "lit-element";
import { work } from "./content";

export const COLORS: number[] = [ 0x00FFFF, 0xFF00E5, 0xFAFF00 ];
export const COLORS_CSS: CSSResult[] = COLORS.map( color => toCSS( color ) );

/* eslint-disable max-len */
export const TIROL_LINK = "https://www.google.com/maps/place/Tyrol,+Austria/@47.1959687,10.9717807,9z/data=!3m1!4b1!4m5!3m4!1s0x47777a6f8add95bd:0xcd7e55459f84a64f!8m2!3d47.2537414!4d11.601487";
export const OAKLAND_LINK = "https://www.google.com/maps/place/Oakland,+CA/@37.7586346,-122.3753906,11z/data=!3m1!4b1!4m5!3m4!1s0x80857d8b28aaed03:0x71b415d535759367!8m2!3d37.8043514!4d-122.2711639";
/* eslint-enable max-len */

export const projects = work.map( project => project.title );

