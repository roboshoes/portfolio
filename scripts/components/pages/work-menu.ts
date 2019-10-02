import { LitElement, customElement, TemplateResult, html, css } from "lit-element";
import { observeRoute } from "../../services/router";
import { observeHitAreaX } from "../../services/trigger";

const projects = [ "Tabel", "NASA", "Window Wonderland", "Cloud City", "Pinglr", "Tango" ];

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
                position: fixed;
                top: 60vh;
                left: 30px;
                list-style: none;
                padding: 0;
                height: ${ projects.length * 10 }px;
                width: 180px;
                transition: all 0.3s ease-in-out;
                cursor: pointer;
            }

            li {
                position: absolute;
                left: 0;
            }

            .bar {
                transition: all 0.15s ease-out;
                height: 3px;
                background-color: black;
                width: 15px;
                position: absolute;
                bottom: 0;
            }

            .name {
                position: absolute;
                bottom: -4px;
                left: 33px;
                opacity: 0;
            }

            li.selected .bar {
                width: 30px;
            }

            ul.hidden li .bar {
                width: 0px;
            }
        `;
    }

    constructor() {
        super();

        this.onMouseMove = this.onMouseMove.bind( this );
    }

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

    private onMouseMove( event: MouseEvent ) {
        const percent = ( event.pageY - this.ulOffsetY ) / this.ulHeight;
        const hightlight = Math.round( percent * ( projects.length - 1 ) );

        this.setHighlight( hightlight );
    }

    firstUpdated() {
        this.ul = this.shadowRoot!.querySelector( "ul" )!;
        this.listElements = Array.from( this.shadowRoot!.querySelectorAll( "li" ) );

        this.setHighlight( 0 );

        observeRoute( /^\/work/ ).subscribe( ( on ) => {
            this.ul!.classList[ on ? "remove" : "add" ]( "hidden" );
        } );

        observeHitAreaX( 200 ).subscribe( ( isInside )  => {
            this.ul!.classList[ isInside ? "add" : "remove" ]( "highlight" );
        } );
    }

    render(): TemplateResult {
        return html`
            <ul @mouseenter="${ this.onMouseEnter }" @mouseleave="${ this.onMouseLeave }">
                ${ projects.map( this.buildLine.bind( this ) ) }
            </ul>
        `;
    }
}
