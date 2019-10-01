import { LitElement, customElement, TemplateResult, html, css } from "lit-element";
import { observeRoute } from "../../services/router";

@customElement( "app-work-menu" )
export class WorkMenuElement extends LitElement {
    private projects = [ "Tabel", "NASA", "Window Wonderland", "Cloud City", "Pinglr", "Tango" ];
    private listElements: HTMLLIElement[] = [];

    static get styles() {
        return css`
            ul {
                position: fixed;
                top: 60vh;
                left: 30px;
                list-style: none;
                padding: 0;
                height: ${ 6 * 10 }px;
                width: 40px;
            }

            li {
                position: absolute;
                left: 0;
            }

            .bar {
                transition: all 0.3s ease-in-out;
                height: 3.5px;
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

            li.selected .name {
                opacity: 1
            }

            ul.hidden li .bar {
                width: 0px;
            }

            ul.highlight li.selected .bar {
                height: 12px;
            }
        `;
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
        this.listElements.forEach( ( element: HTMLLIElement, i: number ) => {
            element.style.top = `${ i * 10 }px`;
            element.classList[ i === index ? "add" : "remove" ]( "selected" );
        } );
    }

    private onMouseEnter() {

    }

    private onMouseLeave() {

    }

    firstUpdated() {
        this.listElements = Array.from( this.shadowRoot!.querySelectorAll( "li" ) );

        this.setHighlight( 0 );

        const ul = this.shadowRoot!.querySelector( "ul" )!;

        observeRoute( /\work/ ).subscribe( ( on ) => {
            ul.classList[ on ? "remove" : "add" ]( "hidden" );
        } );
    }

    render(): TemplateResult {
        return html`
            <ul @mouseenter="${ this.onMouseEnter }" @mouseleave="${ this.onMouseLeave }">
                ${ this.projects.map( this.buildLine.bind( this ) ) }
            </ul>
        `;
    }
}
