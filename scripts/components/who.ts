import "./link";
import "./route-outlet";

import { LitElement, html, css, CSSResult, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

import { MAIL, LINKEDIN, CV_URL } from "../constants";

@customElement("app-who")
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
                        Mathias is a founding engineer who wrote this intro in third-person to sound professional, but
                        that's just a facade for the playful Austrian coder now based in Oakland.
                    </p>

                    <p>
                        He's spent decades building everything from award-winning campaigns with agencies to patented 3d
                        animation software at Google to RPA systems aiming at eliminating and automating tedious work at
                        <app-link href="https://proper.ai">Proper AI</app-link>. After five years leading engineering
                        teams, he's back to what he loves most: hands-on building at
                        <app-link href="https://99ravens.com">99 Ravens</app-link>.
                    </p>

                    <p>
                        If it's programmable, he can work with it. If it's not programmable then he can probably ... eat
                        it?
                    </p>

                    <h2 class="seperator">CONTACT</h2>

                    <p>
                        So if you want to get in touch, reach out via
                        <app-link href="${MAIL}">e-mail</app-link>. If you want some more dates and places check out his
                        <app-link href="${LINKEDIN}">linkedin</app-link> profile. If you want to print out proof that
                        Mathias exists, weird, but sure. Download this <app-link href="${CV_URL}">CV</app-link> here.
                    </p>
                </app-route-outlet>
            </div>
        `;
    }
}
