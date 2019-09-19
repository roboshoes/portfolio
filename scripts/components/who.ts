import { LitElement, customElement, html, css } from "lit-element";
import "./link";
import { TIROL_LINK, OAKLAND_LINK } from "../constants";

@customElement( "app-who" )
export class WhoElement extends LitElement {
    static get styles() {
        return css`
            .container {
                width: 100%;
                padding: 150px 50px 0px 200px;
                box-sizing: border-box;
            }

            p {
                font-family: Merriweather, serif;
                font-weight: 300;
                line-height: 150%;
                font-size: 30px;
                letter-spacing: 0.9px;
            }
        `;
    }

    render() {
        return html`
            <div class="container">
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
            </div>
        `;
    }
}
