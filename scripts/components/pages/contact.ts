import "../shared/link";
import "../shared/route-outlet";

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
                height: 100vh;
                width: 100%;
            }
        `;
    }

    render() {
        const links = [
            { url: "mailto:mail@mathias-paumgarten.com", text: "mail@mathias-paumgarten.com" },
            { url: "https://www.twitter.com/roboshoes", text: "Twitter" },
            { url: "https://www.linkedin.com/in/mathiaspaumgarten", text: "LinkedIn" },
        ];

        return html`
            <div class="container">
                <app-route-outlet route="\/contact">
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
                            ${ links.map( link => html`
                                <li> <app-link href="${ link.url }">${ link.text }</app-link> </li>
                            ` ) }
                        </ul>
                    </div>
                </app-route-outlet>
            </div>
        `;
    }
}
