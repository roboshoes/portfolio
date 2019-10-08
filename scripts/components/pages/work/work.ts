import "../../shared/transition";
import "./work-title";

import { css, customElement, html, LitElement } from "lit-element";

import nasaDetail from "../../../../assets/nasa/detail-1.png";
import nasaHero from "../../../../assets/nasa/hero.png";

@customElement( "app-work" )
export class WorkElement extends LitElement {


    static get styles() {
        return css`
            :host {
                left: 0;
                position: fixed;
                top: 0;
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
        return html`
            <div class="container">

                <app-transition route="\/work" padding="240px 200px 0px 200px">
                    <style>
                        .block {
                            font-family: var( --serif );
                            font-size: 20px;
                            font-weight: 300;
                            letter-spacing: 0.3px;
                            line-height: 150%;
                            margin-top: 10px;
                        }

                        .section-left,
                        .section-right {
                            align-items: flex-end;
                            display: flex;
                            flex-direction: row;
                            height: 350px;
                            margin-bottom: 80px;
                        }

                        .text {
                            flex: 30% 0 0;
                            font-family: var( --serif );
                            font-size: 13px;
                            letter-spacing: 0.8px;
                            line-height: 20px;
                        }

                        .section-left .text {
                            padding-right: 20px;
                            text-align: right;
                        }

                        .section-right .text {
                            padding-left: 20px;
                            text-align: left;
                        }

                        .image {
                            flex: 70% 1 1;
                            height: 100%;
                            padding-bottom: 4px;
                        }

                        .section-right .image {
                            text-align: right;
                        }

                        .image img {
                            height: 100%;
                        }
                    </style>

                    <div class="block">

                        <section class="section-left">

                            <div class="text">
                                We created a user experience that utalizes an artistic geneerative interpretation of
                                exoplanets to guide the user through both the problem of finding life as well as the
                                process that has been made.
                            </div>

                            <div class="image">
                                <img src="${ nasaHero }" />
                            </div>

                        </section>

                        <section class="section-right">

                            <div class="image">
                                <img src="${ nasaDetail }" />
                            </div>

                            <div class="text">
                                We created a user experience that utalizes an artistic geneerative interpretation of
                                exoplanets to guide the user through both the problem of finding life as well as the
                                process that has been made.
                            </div>

                        </section>
                    </div>
                </app-transition>

                <app-work-title></app-work-title>
            </div>
        `;
    }
}
