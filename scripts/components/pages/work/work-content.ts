import { html } from "lit-html";

import nasaDetail from "../../../../assets/nasa/detail-1.png";
import nasaHero from "../../../../assets/nasa/hero.png";

export function getContentForID( id: number ) {
    return id === 0 ? getNasa() : getWonderland();
}

function getNasa() {
    return html`
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
    `;
}

function getWonderland() {
    return html`
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
                    Here3 is some other text of course.
                </div>

                <div class="image">
                    <img src="${ nasaHero }" />
                </div>

            </section>
        </div>
    `;
}
