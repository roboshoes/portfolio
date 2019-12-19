import "../shared/link";
import "../shared/route-outlet";

import { css, customElement, html, LitElement } from "lit-element";

import { MAIL, OAKLAND_LINK, TIROL_LINK, TWITTER } from "../../constants";

@customElement( "app-who" )
export class WhoElement extends LitElement {
    static get styles() {
        return css`
            .container {
                box-sizing: border-box;
                height: 100vh;
                width: 100%;
            }
        `;
    }

    render() {
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

                        h1 {
                            font-size: 14px;
                        }

                        .seperator {
                            margin-top: 100px;
                        }
                    </style>

                    <h2>WHO<h2>

                    <p>
                        Mathias is a freelance, award winning creative developer. He wrote this short bio
                        in third-person to appear serious and professional, but make no mistake: It’s merely
                        a facade to the playful and at times silly coder that was born and raised in
                        <app-link href="${ TIROL_LINK }">Austria</app-link>, and currently resides in
                        <app-link href="${ OAKLAND_LINK }">Oakland</app-link>.
                    </p>

                    <p>
                        He spent years working at world class agencies such as B-Reel, Firstborn and others
                        and has dabbled with the best of Silicon Valley working as creative engineer at Google.
                    </p>

                    <p>
                        Who am I kidding, everyone knows I'm writing this.
                    </p>

                    <p>
                        Where was I? ... Right. Over the last decade I have worked with clients of all sizes, from
                        huge international corporations to small projects executed by a single person.
                    </p>

                    <p>
                        Past work has come in all forms and shapes. Apps, Websites, VR/AR, IoT, you name. If it's
                        programmable I can build with it.
                    </p>

                    <p> And here we are. </p>

                    <h2 class="seperator">CONTACT<h2>

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
