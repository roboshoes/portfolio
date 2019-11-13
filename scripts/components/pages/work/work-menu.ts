import { css, customElement, html, LitElement, TemplateResult } from "lit-element";
import { Subscription } from "rxjs";
import autobind from "autobind-decorator";

import { projects } from "../../../constants";
import { observeRoute, onRouteChange } from "../../../services/router";
import { observeHitAreaX } from "../../../services/trigger";


@customElement( "app-work-menu" )
export class WorkMenuElement extends LitElement {

    private listElements: HTMLLIElement[] = [];
    private highlight = -1;
    private selected = 0;
    private ul?: HTMLUListElement;
    private ulOffsetY = 0;
    private ulHeight = projects.length * 10;

    static get styles() {
        return css`
            ul {
                cursor: pointer;
                height: ${ projects.length * 10 }px;
                left: 30px;
                list-style: none;
                padding: 0;
                position: fixed;
                top: 60vh;
                transition: all 0.3s ease-in-out;
                width: 180px;
            }

            li {
                left: 0;
                position: absolute;
            }

            .bar {
                background-color: black;
                bottom: 0;
                height: 3px;
                position: absolute;
                transition: all 0.15s ease-out;
                width: 15px;
            }

            .name {
                bottom: -4px;
                left: 33px;
                opacity: 0;
                position: absolute;
            }

            li.selected .bar {
                width: 30px;
            }

            ul.hidden li .bar {
                width: 0px;
            }
        `;
    }

    firstUpdated() {
        const subscription = new Subscription();

        this.ul = this.shadowRoot!.querySelector( "ul" )!;
        this.listElements = Array.from( this.shadowRoot!.querySelectorAll( "li" ) );

        this.setHighlight( 0 );

        observeRoute( /^\/work/ ).subscribe( ( on ) => {
            this.ul!.classList[ on ? "remove" : "add" ]( "hidden" );

            subscription.unsubscribe();

            if ( on ) {
                subscription.add( onRouteChange().subscribe( ( [ _, current ] ) => {
                    const parts = current.split( "/" );

                    this.setHighlight( parseInt( parts[ 2 ] || "1", 10 ) - 1 );
                } ) );
            }
        } );

        observeHitAreaX( 200 ).subscribe( ( isInside ) => {
            this.ul!.classList[ isInside ? "add" : "remove" ]( "highlight" );
        } );
    }

    render(): TemplateResult {
        return html`
            <ul @mouseenter="${ this.onMouseEnter }" @mouseleave="${ this.onMouseLeave }">
                ${ projects.map( this.buildLine ) }
            </ul>
        `;
    }

    @autobind
    private buildLine( name: string ): TemplateResult {
        return html`
            <li>
                <div class="bar"></div>
                <div class="name">${ name }</div>
            </li>
        `;
    }

    private setHighlight( index: number ) {
        if ( index === this.highlight ) {
            return;
        }

        this.highlight = index;

        this.listElements.forEach( ( element: HTMLLIElement, i: number ) => {
            element.style.top = `${ i * 10 }px`;
            element.classList[ i === index ? "add" : "remove" ]( "selected" );
        } );
    }

    private onMouseEnter() {
        this.ulOffsetY = this.ul!.getBoundingClientRect().top;
        this.ul!.addEventListener( "mousemove", this.onMouseMove );
    }

    private onMouseLeave() {
        this.ul!.removeEventListener( "mousemove", this.onMouseMove );
        this.setHighlight( this.selected );
    }

    @autobind
    private onMouseMove( event: MouseEvent ) {
        const percent = ( event.pageY - this.ulOffsetY ) / this.ulHeight;
        const hightlight = Math.round( percent * ( projects.length - 1 ) );

        this.setHighlight( hightlight );
    }
}
