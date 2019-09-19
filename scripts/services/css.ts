import { CSSResult, unsafeCSS } from "lit-element";
import { padStart } from "lodash";

export function toCSS( value: number ): CSSResult {
    return unsafeCSS( padStart( value.toString( 16 ), 6, "0" ) );
}
