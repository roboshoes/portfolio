import { css, customElement, html, LitElement, property } from "lit-element";
import { classMap } from "lit-html/directives/class-map";

@customElement( "app-mathias" )
export class MathiasElement extends LitElement {

    @property( { type: String } ) hide = "false";

    static get styles() {
        return css`
            .logo {
                font-size: 30px;
                left: 200px;
                letter-spacing: 1px;
                position: absolute;
                top: 40px;
                transition: transform 0.3s ease-in-out;
            }

            .hide {
                transform: translateY( -200px );
            }
        `;
    }

    render() {
        // This is a strange workaround as boolean variable do not trigger updates and the toggle is passed as a string.
        const hide = this.hide === "true";
        return html`
            <div class="${ classMap( { logo: true, hide })}">MATHIAS PAUMGARTEN</div>
        `;
    }
}
