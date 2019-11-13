import "./work-title";

import { css, customElement, html, LitElement, property } from "lit-element";

import { getContentForID } from "./work-content";
import { observeRoute, onRouteChange } from "../../../services/router";
import { Subscription } from "rxjs";
import { RouteOutletElement } from "../../shared/route-outlet";

@customElement( "app-work" )
export class WorkElement extends LitElement {

    private subscription = new Subscription();
    private content!: RouteOutletElement;

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
        this.content = this.shadowRoot!.querySelector<RouteOutletElement>( "#transition-container" )!;

        observeRoute( /^\/work\/\d+/ ).subscribe( ( on: boolean ) => {
            this.subscription.unsubscribe();

            if ( on ) {
                this.subscription.add( onRouteChange().subscribe( ( [ _, current ] ) => {
                    const parts = current.split( "/" );
                    const id = parseInt( parts[ 2 ] || "1", 10 ) - 1;

                    if ( id !== this.index ) {
                        this.index = id;

                        requestAnimationFrame( () => this.content.updateSlotCopy() );
                    }
                } ) );
            }
        } );
    }

    render() {
        return html`
            <div class="container">
                <app-route-outlet route="\/work" padding="240px 200px 0px 200px" id="transition-container">

                    ${ getContentForID( this.index ) }

                </app-route-outlet>

                <app-work-title></app-work-title>
            </div>
        `;
    }
}
