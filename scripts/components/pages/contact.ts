import "../shared/link";

import { css, customElement, html, LitElement } from "lit-element";


@customElement( "app-contact" )
export class ContactElement extends LitElement {
    static get styles() {
        return css`
            .container {
                box-sizing: border-box;
                padding: 150px 200px 0px 200px;
                width: 100%;
            }

            p {
                font-family: Merriweather, serif;
                font-size: 30px;
                font-weight: 300;
                letter-spacing: 0.9px;
                line-height: 150%;
                text-align: justify;
            }
        `;
    }

    render() {
        return html`
            <div class="container">
                <p>
                    Let's talk about it. You can reach me at
                    <app-link href="mailto:mail@mathias-paumgarten.com">mail@mathias-paumgarten.com</app-link> or you
                    can listen to be babble on Twitter at
                    <app-link href="https://www.twitter.com/roboshoes">@roboshoes</app-link>
                </p>
            </div>
        `;
    }
}
