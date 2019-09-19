import { LitElement, customElement, property, html, css } from "lit-element";
import { COLORS_CSS } from "../constants";

@customElement( "app-link" )
export class LinkElement extends LitElement {

    @property( { type: "string" } ) href = "";

    static get styles() {
        return css`
            a {
                color: inherit;
                position: relative;
                text-decoration: none;
            }

            a::before {
                background-color: #${ COLORS_CSS[ 0 ] };
                bottom: 8px;
                content: " ";
                height: 12px;
                position: absolute;
                transition: all 0.4s cubic-bezier( 0.77, 0, 0.175, 1 );
                width: 100%;
                z-index: -1;
            }

            a:hover::before {
                bottom: 15px;
                height: 20px;
            }
        `;
    }

    render() {
        return html`<a href="${ this.href }" target="_blank"><slot></slot></a>`;
    }
}
