import "./link";
import "./route-outlet";

import { LitElement, html, css, CSSResult, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

import { MAIL, TWITTER } from "../constants";

@customElement( "app-who" )
export class WhoElement extends LitElement {
    static get styles(): CSSResult {
        return css`
            .container {
                box-sizing: border-box;
                height: 100vh;
                width: 100%;
            }
        `;
    }

    render(): TemplateResult {
        return html`
            <div class="container">
                <app-route-outlet>
                    <style>
                        p {
                            font-family: Merriweather, serif;
                            font-size: 30px;
                            font-weight: 300;
                            letter-spacing: 0.9px;
                            line-height: 150%;
                            text-align: justify;
                            margin: 0 0 20px 0;
                        }

                        @media (max-width: 500px) {
                            p {
                                font-size: 15px;
                                letter-spacing: 0.4px;
                            }
                        }

                        h1 {
                            font-size: 14px;
                        }

                        .seperator {
                            margin-top: 100px;
                        }
                    </style>

                    <h2>WHO</h2>

                    <p>
                        Mathias is a freelance, award winning creative developer. He wrote this intro
                        in third-person to appear serious and professional, but make no mistake: It’s merely
                        a facade to the playful and at times silly coder that was born and raised in
                        Austria, and currently resides in Oakland.
                    </p>

                    <p>
                        I spent years working at world-class agencies such as B-Reel, Firstborn and most
                        recently worked as a Creative Engineer at Google.
                    </p>

                    <p>
                        Over the last decade I have worked with clients of all sizes, from
                        huge international corporations to small projects executed by a single person.
                    </p>

                    <p>
                        Past work has come in all forms and shapes. Websites, Apps, VR/AR, IoT, you name. If it's
                        programmable I can build with it.
                    </p>

                    <h2 class="seperator">CONTACT</h2>

                    <p>
                        So if you wanna get in touch, reach out via
                        <app-link href="${ MAIL }">e-mail</app-link> or on
                        <app-link href="${ TWITTER }">twitter</app-link>.
                    </p>
                </app-route-outlet>
            </div>
        `;
    }
}
