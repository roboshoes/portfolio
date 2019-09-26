import "../shared/transition";

import { css, customElement, html, LitElement } from "lit-element";

import nasaHero from "../../../assets/nasa/hero.png";

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
                height: 100vh;
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
                            font-size: 20px;
                            font-weight: 300;
                            letter-spacing: 0.3px;
                            line-height: 150%;
                            margin-top: 10px;
                        }

                        img {
                            margin: 20px 0;
                            display: block;
                        }
                    </style>

                    <div class="text">
                        NASA’s Frontier Development Lab partnered with Google Cloud to understand how artificial
                        intelligence can help accelerate existing research to find life on other planets.

                        <img src="${ nasaHero }" width="70%" />

                        We created a user experience that utalizes an artistic geneerative interpretation of
                        exoplanets to guide the user through both the problem of finding life as well as the
                        process that has been made.

                        We created a user experience that utalizes an artistic geneerative interpretation of
                        exoplanets to guide the user through both the problem of finding life as well as the
                        process that has been made.

                        We created a user experience that utalizes an artistic geneerative interpretation of
                        exoplanets to guide the user through both the problem of finding life as well as the
                        process that has been made.
                    </div>
                </app-transition>
            </div>
        `;
    }
}
