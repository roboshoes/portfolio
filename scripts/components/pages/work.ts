import "../shared/transition";

import { css, customElement, html, LitElement } from "lit-element";

import nasaDetail from "../../../assets/nasa/detail-1.png";
import nasaHero from "../../../assets/nasa/hero.png";
import { projects } from "../../constants";
import { onRouteChange, setRoute } from "../../services/router";

@customElement( "app-work" )
export class WorkElement extends LitElement {

    private currentID = 1;

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

    firstUpdated() {
        onRouteChange().subscribe( ( [ _, current ] ) => {
            const parts = current.split( "/" );

            this.currentID = parseInt( parts[ 2 ] || "1", 10 );
        } );
    }

    private onNext() {
        let newID = this.currentID + 1;

        if ( newID > projects.length ) {
            newID = 1;
        }

        setRoute( `/work/${ newID }` );
    }

    private onPrevious() {
        let newID = this.currentID - 1;

        if ( newID < 1 ) {
            newID = projects.length;
        }

        setRoute( `/work/${ newID }` );
    }

    render() {
        return html`
            <div class="container">
                <app-transition route="\/work">
                    <style>
                        .block {
                            font-family: var( --serif );
                            font-size: 20px;
                            font-weight: 300;
                            letter-spacing: 0.3px;
                            line-height: 150%;
                            margin-top: 10px;
                        }

                        .header {
                            display: flex;
                            flex-direction: row;
                            margin-bottom: 80px;
                        }

                        .title {
                            background-color: black;
                            color: white;
                            display: inline-block;
                            font-family: var( --sans-serif );
                            font-size: 28px;
                            padding: 13px 13px 5px 13px;
                        }

                        .button {
                            background-color: black;
                            cursor: pointer;
                            display: inline-block;
                            height: 48px;
                            margin-left: 3px;
                            position: relative;
                            width: 48px;
                        }

                        .button::before,
                        .button::after {
                            background-color: white;
                            content: " ";
                            height: 3px;
                            left: 50%;
                            position: absolute;
                            width: 20px;
                        }

                        .button::before {
                            top: 37%;
                            transform: translate( -50%, -50% ) rotate( 45deg );
                        }

                        .button::after {
                            top: 63%;
                            transform: translate( -50%, -50% ) rotate( -45deg );
                        }

                        .button.previous {
                            transform-origin: center center;
                            transform: rotate( 180deg );
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
                        <div class="header">
                            <div class="title">NASA FDL - Google Cloud</div>
                            <div class="button previous" @click="${ this.onPrevious }"></div>
                            <div class="button next" @click="${ this.onNext }"></div>
                        </div>

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
            </div>
        `;
    }
}
