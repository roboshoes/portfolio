import { css, customElement, html, LitElement } from "lit-element";
import { Subscription } from "rxjs";

import { projects } from "../../../constants";
import { observeRoute, onRouteChange, setRoute } from "../../../services/router";

@customElement( "app-work-title" )
export class WorkTitleElement extends LitElement {

    private currentID = 1;
    private subscription = new Subscription();
    private elements: HTMLDivElement[] = [];
    private timeout = -1;

    static get styles() {
        return css`
            .header {
                display: flex;
                flex-direction: row;
                position: absolute;
                top: 180px;
                left: 200px;
            }

            .title {
                background-color: black;
                display: inline-block;
                height: 48px;
                transition: all 0.4s ease-in-out;
            }

            .title .wrapper {
                box-sizing: border-box;
                color: white;
                display: inline-block;
                font-family: var( --sans-serif );
                font-size: 28px;
                height: 48px;
                padding: 13px 13px 5px 13px;
                transition: transform 0.3s ease-in-out;
            }

            .button {
                background-color: black;
                cursor: pointer;
                display: inline-block;
                height: 48px;
                margin-left: 3px;
                width: 48px;
            }

            .button .wrapper {
                position: relative;
                width: 48px;
                height: 48px;
            }

            .button .wrapper::before,
            .button .wrapper::after {
                background-color: white;
                content: " ";
                height: 3px;
                left: 50%;
                position: absolute;
                width: 20px;
            }

            .button .wrapper::before {
                top: 37%;
                transform: translate( -50%, -50% ) rotate( 45deg );
            }

            .button .wrapper::after {
                top: 63%;
                transform: translate( -50%, -50% ) rotate( -45deg );
            }

            .button.previous {
                transform-origin: center center;
                transform: rotate( 180deg );
            }

            .previous {
                transition: all 0.37s 0.1s ease-in-out;
            }

            .next {
                transition: all 0.42s 0.02s ease-in-out;
            }

            .element {
                overflow: hidden;
            }

            .element .wrapper {
                transition: transform 0.3s ease-in-out;
            }

            .element.hidden {
                height: 0;
            }

            .element.hidden .wrapper {
                transform: translateY( 10% );
            }
        `;
    }

    firstUpdated() {
        this.elements = Array.from( this.shadowRoot!.querySelectorAll( ".element" ) );

        this.subscription.add( observeRoute( /^\/work/ ).subscribe( ( on: boolean ) => {
            on ? this.animateIn() : this.animateOut();
        } ) );

        this.subscription.add( onRouteChange().subscribe( ( [ _, current ] ) => {
            const parts = current.split( "/" );

            this.currentID = parseInt( parts[ 2 ] || "1", 10 );
        } ) );
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        this.subscription.unsubscribe();
    }

    private animateOut() {
        clearTimeout( this.timeout );
        this.elements.forEach( div => div.classList.add( "hidden" ) );
    }

    private animateIn() {
        clearTimeout( this.timeout );
        this.timeout = setTimeout( () => {
            this.elements.forEach( div => div.classList.remove( "hidden" ) );
        }, 1300 );
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
            <div class="header">
                <div class="title element">
                    <div class="wrapper">NASA FDL - Google Cloud</div>
                </div>

                <div class="button previous element" @click="${ this.onPrevious }">
                    <div class="wrapper"></div>
                </div>

                <div class="button next element" @click="${ this.onNext }">
                    <div class="wrapper"></div>
                </div>
            </div>
        `;
    }
}
