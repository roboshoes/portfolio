import { css, customElement, html, LitElement, property } from "lit-element";

const TRANSITION = css`all 0.3s ease-in-out`;

@customElement( "app-menu" )
export class MenuElement extends LitElement {
    private menuItems = [ "WHO", "WORK", "CONTACT" ];

    @property() private selected = 0;
    @property() private collapsed = false;

    static get styles() {
        return css`
            :host {
                --line-width: 30px;

                position: absolute;
                transition: ${ TRANSITION };
            }

            li {
                list-style: none;
            }

            .menu {
                padding: 20px 20px 20px 0;
                position: relative;
                width: 200px;
                height: 80px;
            }

            .menu-item {
                cursor: pointer;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                position: absolute;
                transition: ${ TRANSITION };
            }

            .menu-item:nth-child( 1 ) { top: 0; }
            .menu-item:nth-child( 2 ) { top: 35px; }
            .menu-item:nth-child( 3 ) { top: 70px; }

            .collapsed .menu-item:nth-child( 2 ) { top: 10px; }
            .collapsed .menu-item:nth-child( 3 ) { top: 20px; }

            .collapsed .menu-item.selected .line { margin-right: 141px; }

            .line, .name {
                display: inline-block;
            }

            .line {
                display: flex;
                flex-direction: row;
                font-size: 12px;
                height: 14px;
                justify-content: flex-end;
                margin-right: 6px;
                position: relative;
                width: var( --line-width );
                transition: ${ TRANSITION };;
            }

            .collapsed .menu-item.selected .line {
                width: var( --line-width );
            }

            .collapsed .line {
                color: rgba( 0, 0, 0, 0 );
            }

            .line::before {
                background-color: black;
                bottom: 0;
                content: " ";
                height: 3px;
                left: 0;
                position: absolute;
                width: 100%;
            }

            .menu-item.selected .line {
                width: 195px;
            }

            .name {
                font-size: 18px;
                transition: ${ TRANSITION };;
                z-index: 1;
            }

            .collapsed .name {
                opacity: 0;
            }

            .collapsed .menu-item.selected .name {
                opacity: inherit;
            }
        `;
    }

    private onMenuClick( index: number ) {
        this.selected = index;
    }

    private onMouseOver() {
        this.collapsed = false;
    }

    private onMouseOut() {
        this.collapsed = true;
    }

    private createMenuItem( name: string, index: number ) {
        const selected = index === this.selected ? "selected" : "";

        return html`
            <li class="menu-item ${ selected }" @click="${ () => this.onMenuClick( index ) }">
                <div class="line">0${ index + 1 }</div>
                <div class="name">${ name }</div>
            </li>
        `;
    }

    render() {
        const top = this.collapsed ?
            140 - this.selected * 10 :
            140 - this.selected * 35;

        const collapsed = this.collapsed ? "collapsed" : "";

        return html`
            <style>
                :host {
                    top: ${ top }px;
                    left: ${ this.collapsed ? 30 : 0 }px;
                }
            </style>

            <ul class="menu ${ collapsed }"
                @mouseenter="${ this.onMouseOver }"
                @mouseleave="${ this.onMouseOut }">
                ${ this.menuItems.map( this.createMenuItem.bind( this ) ) }
            </ul>
        `;
    }
}
