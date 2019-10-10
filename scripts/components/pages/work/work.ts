import "../../shared/transition";
import "./work-title";

import { css, customElement, html, LitElement, property } from "lit-element";

import { getContentForID } from "./work-content";
import { observeRoute, onRouteChange } from "../../../services/router";
import { Subscription } from "rxjs";

@customElement( "app-work" )
export class WorkElement extends LitElement {

    private subscription = new Subscription();

    @property( { type: Number } ) private index = 0;

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
        observeRoute( /^\/work/ ).subscribe( ( on ) => {
            this.subscription.unsubscribe();

            if ( on ) {
                this.subscription.add( onRouteChange().subscribe( ( [ _, current ] ) => {
                    const parts = current.split( "/" );
                    const id = parseInt( parts[ 2 ] || "1", 10 ) - 1;

                    if ( id !== this.index ) {
                        this.index = id;
                    }
                } ) );
            }
        } );
    }

    render() {
        return html`
            <div class="container">
                <app-transition route="\/work" padding="240px 200px 0px 200px">

                    ${ getContentForID( this.index ) }

                </app-transition>

                <app-work-title></app-work-title>
            </div>
        `;
    }
}
