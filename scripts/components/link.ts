import { css, customElement, html, LitElement, property } from "lit-element";

@customElement( "app-link" )
export class LinkElement extends LitElement {

    @property( { type: String } ) href = "";

    static get styles() {
        return css`
            a {
                color: inherit;
                position: relative;
                text-decoration: none;
            }

            a::before {
                background-color: rgba( 0, 0, 0, 0.2 );
                bottom: 8px;
                content: " ";
                height: 12px;
                position: absolute;
                transition: all 0.2s cubic-bezier( 0.77, 0, 0.175, 1 );
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
