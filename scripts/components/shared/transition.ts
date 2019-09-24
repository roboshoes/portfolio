import { LitElement, css, html, TemplateResult, CSSResult, customElement, property } from "lit-element";
import { observeRoute, onRoute, onRouteChange } from "../../services/router";

@customElement( "app-transition" )
export class TransitionElement extends LitElement {

    @property( { type: String } ) route?: String;

    static get styles(): CSSResult {
        return css`
            .container {
                position: relative;
            }

            .left {
                clip-path: polygon( 0% 0%, 25% 0%, 75% 100%, 0% 100% );
            }

            .right {
                height: 100%;
                left: 0;
                position: absolute;
                top: 0;
                width: 100%;
                clip-path: polygon( 25% 0%, 100% 0%, 100% 100%, 75% 100% );
            }
        `;
    }

    firstUpdated() {
        const slot = this.shadowRoot!.querySelector( ".left slot" ) as HTMLSlotElement;
        const right = this.shadowRoot!.querySelector( ".right" ) as HTMLDivElement;
        const container = this.shadowRoot!.querySelector( ".container" ) as HTMLDivElement;

        slot.addEventListener( "slotchange", () => {
            right.innerHTML = "";

            slot.assignedElements().forEach( node => {
                right.appendChild( node.cloneNode( true ) );
            } );
        } );

        if ( this.route ) {
            observeRoute( new RegExp( this.route as string ) ).subscribe( ( on: boolean ) => {
                container.style.display = on ? null : "none";
            } );
        }
    }

    render(): TemplateResult {
        return html`
            <div class="container">
                <div class="left">
                    <slot></slot>
                </div>
                <div class="right"></div>
            <div>
        `;
    }
}
