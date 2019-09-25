import { css, CSSResult, customElement, html, LitElement, property, TemplateResult } from "lit-element";

import { observeRoute } from "../../services/router";

@customElement( "app-transition" )
export class TransitionElement extends LitElement {

    @property( { type: String } ) route?: String;

    private timeout = -1;

    static get styles(): CSSResult {
        return css`
            .container {
                position: relative;
            }

            .left,
            .right {
                transition: clip-path 1.7s ease-in-out;
            }

            .left {
                clip-path: polygon( 0% 0%, 100% 100%, 0% 100% );
            }

            .right {
                clip-path: polygon( 0% 0%, 100% 0%, 100% 100% );
                height: 100%;
                left: 0;
                position: absolute;
                top: 0;
                width: 100%;
            }

            .hide .right {
                clip-path: polygon( 20% 0%, 100% 0%, 120% 100% );
            }

            .right, .left {
                overflow: hidden;
            }

            .mover {
                transition: transform 1.7s cubic-bezier( 0.680, 0.040, 0.025, 1.000 );
            }

            .hide .mover {
                transition: transform 1.7s cubic-bezier(0.970, 0.010, 0.550, 0.960);
            }

            .hide .right .mover {
                transform: translateX( -100% );
            }

            .hide .left .mover {
                transform: translateX( 100% );
            }
        `;
    }

    firstUpdated() {
        const slot = this.shadowRoot!.querySelector( ".left slot" ) as HTMLSlotElement;
        const rightMover = this.shadowRoot!.querySelector( ".right .mover" ) as HTMLDivElement;

        slot.addEventListener( "slotchange", () => {
            rightMover.innerHTML = "";

            slot.assignedElements().forEach( node => {
                rightMover.appendChild( node.cloneNode( true ) );
            } );
        } );

        if ( this.route ) {
            const container = this.shadowRoot!.querySelector( ".container" ) as HTMLDivElement;

            observeRoute( new RegExp( this.route as string ) ).subscribe( ( on: boolean ) => {
                clearTimeout( this.timeout );

                if ( !on ) {
                    container.classList.add( "hide" );
                } else {
                    this.timeout = setTimeout( () => container.classList.remove( "hide" ), 1300 );
                }
            } );
        }
    }

    render(): TemplateResult {
        return html`
            <div class="container hide">
                <div class="left">
                    <div class="mover">
                        <slot></slot>
                    </div>
                </div>
                <div class="right">
                    <div class="mover"></div>
                </div>
            <div>
        `;
    }
}
