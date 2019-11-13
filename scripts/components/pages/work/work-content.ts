import { html, TemplateResult } from "lit-html";
import { clamp } from "lodash";

import { Project, work } from "../../../content";

export function getContentForID( id: number ): TemplateResult {
    const project: Project = work[ clamp( id, 0, work.length - 1 ) ];
    return generateContent( project );
}

function* swapSide( side: "right" | "left" = "right" ) {
    while ( true ) {
        side = side === "left" ? "right" : "left";
        yield side;
    }
}

function generateContent( project: Project ) {

    const nextSide = swapSide( "right" );

    const amount = Math.min( project.images.length, project.paragraphs.length );
    const array = new Array( amount ).fill( 0 );

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

            .section-right {
                flex-direction: row-reverse;
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

            ${ array.map( ( _, i: number ) => html`
                <section class="section-${ nextSide.next().value }">

                    <div class="text">
                        ${ project.paragraphs[ i ] }
                    </div>

                    <div class="image">
                        <img src="${ project.images[ i ] }" />
                    </div>

                </section>
            ` ) }

        </div>
    `;
}
