import { LitElement, css, html, TemplateResult, CSSResult, customElement } from "lit-element";

@customElement( "app-transition" )
export class TransitionElement extends LitElement {
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

        slot.addEventListener( "slotchange", () => {
            right.innerHTML = "";

            slot.assignedElements().forEach( node => {
                right.appendChild( node.cloneNode( true ) );
            } );
        } );
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
