import { LitElement, html, css, customElement } from "lit-element";

@customElement( "app-mathias" )
export class MathiasElement extends LitElement {

    static get styles() {
        return css`
            .logo {
                font-size: 30px;
                left: 200px;
                letter-spacing: 1px;
                position: absolute;
                top: 40px;
            }
        `;
    }

    render() {
        return html`
            <div class="logo">MATHIAS PAUMGARTEN</div>
        `;
    }
}
