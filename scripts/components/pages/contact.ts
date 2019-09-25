import "../shared/link";
import "../shared/transition";

import { css, customElement, html, LitElement } from "lit-element";

@customElement( "app-contact" )
export class ContactElement extends LitElement {
    static get styles() {
        return css`
            :host {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
            }

            .container {
                box-sizing: border-box;
                padding: 180px 200px 0px 200px;
                width: 100%;
            }
        `;
    }

    render() {
        return html`
            <div class="container">
                <app-transition route="\/contact">
                    <style>
                        .text {
                            font-family: Merriweather, serif;
                            font-size: 30px;
                            font-weight: 300;
                            letter-spacing: 0.9px;
                            line-height: 150%;
                            margin-top: 10px;
                        }

                        ul {
                            list-style: none;
                            padding: 20px 0;
                        }
                    </style>

                    <div class="text">
                        You can reach me on various channels:
                        <ul>
                            <li> <app-link href="mailto:mail@mathias-paumgarten.com">mail@mathias-paumgarten.com</app-link> </li>
                            <li> <app-link href="https://www.twitter.com/roboshoes">Twitter</app-link> </li>
                            <li> <app-link href="https://www.linkedin.com/in/mathiaspaumgarten/">LinkedIn</app-link> </li>
                        </ul>
                    </div>
                </app-transition>
            </div>
        `;
    }
}
