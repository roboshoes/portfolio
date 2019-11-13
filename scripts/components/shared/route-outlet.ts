import autobind from "autobind-decorator";
import { css, CSSResult, customElement, html, LitElement, property, TemplateResult } from "lit-element";
import { clamp } from "lodash";
import { fromEvent, Subscription } from "rxjs";

import { observeRoute } from "../../services/router";

@customElement( "app-route-outlet" )
export class RouteOutletElement extends LitElement {

    @property( { type: String } ) route?: string;
    @property( { type: String } ) padding = "180px 200px 0px 200px";

    private timeout = -1;
    private maskHeight = -1;
    private contentHeight = -1;
    private left?: HTMLDivElement;
    private right?: HTMLDivElement;
    private leftMover?: HTMLDivElement;
    private rightMover?: HTMLDivElement;
    private container?: HTMLDivElement;
    private primarySlot?: HTMLSlotElement;
    private targetOffset = 0;
    private leftOffset = 0;
    private rightOffset = 0;
    private raf = -1;
    private isScrollable = false;
    private isVisible = false;
    private isMasked = true;
    private subscription = new Subscription();

    static get styles(): CSSResult {
        return css`
            .container {
                position: relative;
                height: 100%;
            }

            .left,
            .right {
                box-sizing: border-box;
                height: 100%;
                transition: clip-path 1.7s ease-in-out;
                width: 100%;
            }

            .left {
                clip-path: polygon( 1px 0%, calc( 100% + 1px ) 100%, 0% 100% );
            }

            .left.unmasked {
                clip-path: none;
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

            .mover.animated {
                transition: transform 1.7s cubic-bezier( 0.680, 0.040, 0.025, 1.000 );
            }

            .hide .mover {
                transition: transform 1.7s cubic-bezier( 0.970, 0.010, 0.550, 0.960 );
            }

            .hide .right .mover {
                transform: translateX( -100% );
            }

            .hide .left .mover {
                transform: translateX( 100% );
            }

            .wrapper {
                height: 100%;
                overflow: hidden;
                width: 100%;
            }
        `;
    }

    firstUpdated() {
        this.primarySlot = this.shadowRoot!.querySelector( ".left slot" ) as HTMLSlotElement;
        this.left = this.shadowRoot!.querySelector( ".left" ) as HTMLDivElement;
        this.right = this.shadowRoot!.querySelector( ".right" ) as HTMLDivElement;
        this.rightMover = this.shadowRoot!.querySelector( ".right .mover" ) as HTMLDivElement;
        this.leftMover = this.shadowRoot!.querySelector( ".left .mover" ) as HTMLDivElement;
        this.container = this.shadowRoot!.querySelector( ".container" ) as HTMLDivElement;

        this.connectRouting();

        this.subscription.add( fromEvent( window, "resize" ).subscribe( this.onResize ) );
        this.subscription.add( fromEvent( this.primarySlot, "slotchange").subscribe( this.updateSlotCopy ) );
    }

    disconnectedCallback() {
        super.disconnectedCallback();

        clearTimeout( this.timeout );
        cancelAnimationFrame( this.raf );

        this.subscription.unsubscribe();
    }

    @autobind
    updateSlotCopy() {
        this.rightMover!.innerHTML = "";

        this.primarySlot!.assignedElements().forEach( node => {
            this.rightMover!.appendChild( node.cloneNode( true ) );
        } );

        this.onResize();
    }

    render(): TemplateResult {
        return html`
            <style>
                .left,
                .right {
                    padding: ${ this.padding };
                }
            </style>

            <div class="container hide" style="display: none">
                <div class="left">
                    <div class="wrapper">
                        <div class="mover animated">
                            <slot></slot>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="wrapper">
                        <div class="mover animated"></div>
                    </div>
                </div>
            <div>
        `;
    }

    private connectRouting() {
        if ( this.route ) {

            const regex = new RegExp( this.route );
            const listener = observeRoute( regex ).subscribe( this.onRouteChange );

            this.subscription.add( listener );
        }
    }

    @autobind
    private onRouteChange( on: boolean ) {
        clearTimeout( this.timeout );

        if ( !on && this.isVisible ) {
            this.animateOut();
        } else if ( on && !this.isVisible ) {
            this.animateIn();
        }
    }

    private animateIn() {
        this.container!.style.display = null;
        this.leftMover!.style.transform = "";
        this.rightMover!.style.transform = "";
        this.leftOffset = 0;
        this.rightOffset = 0;
        this.targetOffset = 0;
        this.isVisible = true;

        this.timeout = setTimeout( () => {
            this.container!.classList.remove( "hide" );

            this.onResize();

            this.timeout = setTimeout( () => {
                this.leftMover!.classList.remove( "animated" );
                this.rightMover!.classList.remove( "animated" );

                this.loop();
                this.isScrollable = true;
            }, 1700 );
        }, 1300 );
    }

    private animateOut() {
        this.isScrollable = false;

        this.leftMover!.classList.add( "animated" );
        this.rightMover!.classList.add( "animated" );

        this.left!.classList.remove( "unmasked" );
        this.right!.style.display = null;

        this.isMasked = true;

        cancelAnimationFrame( this.raf );

        requestAnimationFrame( () => {
            this.container!.classList.add( "hide" );

            this.leftMover!.style.transform = `translate( 100%, ${ this.leftOffset }px )`;
            this.rightMover!.style.transform = `translate( -100%, ${ this.rightOffset }px )`;

        } );

        this.timeout = setTimeout( () => {
            this.container!.style.display = "none";
            this.isVisible = false;
        }, 2000 );
    }

    @autobind
    private onResize() {
        window.removeEventListener( "wheel", this.onScroll );
        window.addEventListener( "wheel", this.onScroll );

        const left = this.shadowRoot!.querySelector( ".left .wrapper" ) as HTMLDivElement;

        this.maskHeight = left.getBoundingClientRect().height;
        this.contentHeight = this.leftMover!.getBoundingClientRect().height;
    }

    @autobind
    private onScroll( event: WheelEvent ) {
        if ( ! this.isScrollable ) {
            return;
        }

        const difference = Math.max( this.contentHeight - this.maskHeight + 20, 0 );

        this.targetOffset += event.deltaY * -1 / 4;
        this.targetOffset = clamp( this.targetOffset, - difference, 0 );
    }

    @autobind
    private loop() {
        cancelAnimationFrame( this.raf );

        this.leftOffset += ( this.targetOffset - this.leftOffset ) / 5;
        this.rightOffset += ( this.targetOffset - this.rightOffset ) / 10;

        this.rightMover!.style.transform = `translateY( ${ this.rightOffset }px )`;
        this.leftMover!.style.transform = `translateY( ${ this.leftOffset }px )`;

        if ( Math.abs( this.rightOffset - this.leftOffset ) < 1 && this.isMasked ) {
            this.left!.classList.add( "unmasked" );
            this.right!.style.display = "none";

            this.isMasked = false;
        } else if ( Math.abs( this.rightOffset - this.leftOffset ) >=  1 && ! this.isMasked ) {
            this.left!.classList.remove( "unmasked" );
            this.right!.style.display = null;

            this.isMasked = true;
        }

        this.raf = requestAnimationFrame( this.loop );
    }
}
