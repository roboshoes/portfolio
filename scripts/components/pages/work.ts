import "../shared/transition";

import { LitElement, html, css, customElement } from "lit-element";

@customElement( "app-work" )
export class WorkElement extends LitElement {

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
                <app-transition route="\/work">
                    <style>
                        .text {
                            font-family: Merriweather, serif;
                            font-size: 30px;
                            font-weight: 300;
                            letter-spacing: 0.9px;
                            line-height: 150%;
                            margin-top: 10px;
                        }
                    </style>

                    <div class="text">
                        Here is some text
                    </div>
                </app-transition>
            </div>
        `;
    }
}
