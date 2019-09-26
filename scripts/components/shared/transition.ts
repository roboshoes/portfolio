import { css, CSSResult, customElement, html, LitElement, property, TemplateResult } from "lit-element";

import { observeRoute } from "../../services/router";

import { clamp } from "lodash";

@customElement( "app-transition" )
export class TransitionElement extends LitElement {

    @property( { type: String } ) route?: String;

    private timeout = -1;
    private maskHeight = -1;
    private contentHeight = -1;
    private leftMover?: HTMLDivElement;
    private rightMover?: HTMLDivElement;
    private container?: HTMLDivElement;
    private leftOffset = 0;
    private rightOffset = 0;
    private raf = -1;
    private active = false;

    static get styles(): CSSResult {
        return css`
            .container {
                position: relative;
                height: 100%;
            }

            .left,
            .right {
                transition: clip-path 1.7s ease-in-out;
                height: 100%;
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

            .mover.animated {
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

    constructor() {
        super();

        this.loop = this.loop.bind( this );
        this.onScroll = this.onScroll.bind( this );
    }

    firstUpdated() {
        const slot = this.shadowRoot!.querySelector( ".left slot" ) as HTMLSlotElement;

        this.rightMover = this.shadowRoot!.querySelector( ".right .mover" ) as HTMLDivElement;
        this.leftMover = this.shadowRoot!.querySelector( ".left .mover" ) as HTMLDivElement;
        this.container = this.shadowRoot!.querySelector( ".container" ) as HTMLDivElement;

        slot.addEventListener( "slotchange", () => {
            this.rightMover!.innerHTML = "";

            slot.assignedElements().forEach( node => {
                this.rightMover!.appendChild( node.cloneNode( true ) );
            } );
        } );

        window.addEventListener( "resize", this.updateHeights.bind( this ) );

        if ( this.route ) {

            observeRoute( new RegExp( this.route as string ) ).subscribe( ( on: boolean ) => {
                clearTimeout( this.timeout );

                if ( !on ) {
                    this.animateOut();
                } else {
                    this.animateIn();
                }
            } );
        }
    }

    private animateIn() {
        this.container!.style.display = null;
        this.leftMover!.style.transform = "";
        this.rightMover!.style.transform = "";
        this.leftOffset = 0;
        this.rightOffset = 0;

        this.timeout = setTimeout( () => {
            this.container!.classList.remove( "hide" );

            this.updateHeights();

            this.timeout = setTimeout( () => {
                this.leftMover!.classList.remove( "animated" );
                this.rightMover!.classList.remove( "animated" );

                this.loop();
                this.active = true;
            }, 1700 );
        }, 1300 );
    }

    private animateOut() {
        this.active = false;

        this.leftMover!.classList.add( "animated" );
        this.rightMover!.classList.add( "animated" );

        cancelAnimationFrame( this.raf );

        requestAnimationFrame( () => {
            this.container!.classList.add( "hide" );

            this.leftMover!.style.transform = `translate( 100%, ${ this.leftOffset }px )`;
            this.rightMover!.style.transform = `translate( -100%, ${ this.rightOffset }px )`;

        } );

        this.timeout = setTimeout( () => {
            this.container!.style.display = "none";
        }, 2000 );
    }

    private updateHeights() {
        window.removeEventListener( "wheel", this.onScroll );
        window.addEventListener( "wheel", this.onScroll );

        const left = this.shadowRoot!.querySelector( ".left" ) as HTMLDivElement;

        this.maskHeight = left.getBoundingClientRect().height;
        this.contentHeight = this.leftMover!.getBoundingClientRect().height;
    }

    private onScroll( event: WheelEvent ) {
        if ( ! this.active ) {
            return;
        }

        const difference = Math.max( this.contentHeight - this.maskHeight + 20, 0 );

        this.leftOffset += event.deltaY * -1 / 2;
        this.leftOffset = clamp( this.leftOffset, - difference, 0 );

        this.leftMover!.style.transform = `translateY( ${ this.leftOffset }px )`;
    }

    private loop() {
        this.rightOffset += ( this.leftOffset - this.rightOffset ) / 3;
        this.rightMover!.style.transform = `translateY( ${ this.rightOffset }px )`;

        this.raf = requestAnimationFrame( this.loop );
    }

    render(): TemplateResult {
        return html`
            <div class="container hide" style="display: none">
                <div class="left">
                    <div class="mover animated">
                        <slot></slot>
                    </div>
                </div>
                <div class="right">
                    <div class="mover animated"></div>
                </div>
            <div>
        `;
    }
}
