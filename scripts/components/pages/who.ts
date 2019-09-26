import "../shared/link";
import "../shared/transition";

import { css, customElement, html, LitElement } from "lit-element";

import { OAKLAND_LINK, TIROL_LINK } from "../../constants";

@customElement( "app-who" )
export class WhoElement extends LitElement {
    static get styles() {
        return css`
            .container {
                box-sizing: border-box;
                height: 100vh;
                padding: 180px 200px 0px 200px;
                width: 100%;
            }
        `;
    }

    render() {
        return html`
            <div class="container">
                <app-transition route="\/$">
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
                    </style>

                    <p>
                        Mathias is a freelance, award winning creative developer. He wrote this short bio
                        in third-person to appear serious and professional, but make no mistake: It’s mearly
                        a facade to the playful and at times inappropriate coder that was born and raised in
                        <app-link href="${ TIROL_LINK }">Austria</app-link>, and currently resides in
                        <app-link href="${ OAKLAND_LINK }">Oakland</app-link>.
                    </p>

                    <p>
                        After years of working at world class agencies such as B-Reel, Firstborn and others
                        he dabbeled with the best of Silicon Valley working as creative engineer at Google.
                        Looking for a wider spectrum of partnerships, he decided to become a freelancer.
                    </p>

                    <p> And here we are. </p>
                </app-transition>
            </div>
        `;
    }
}
