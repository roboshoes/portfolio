import { css, customElement, html, LitElement, property } from "lit-element";

import { COLORS_CSS } from "../constants";

@customElement( "app-menu" )
export class MenuElement extends LitElement {
    private menuItems = [ "WHO", "WORK", "CONTACT" ];

    @property() private selected = 0;

    static get styles() {
        return css`
            :host {
                position: absolute;
                left: 0;
            }

            li {
                list-style: none;
            }

            .background {
                background-color: #F6F6F6;
                height: 100%;
                width: 150px;
                position: absolute;
                top: 0;
                left: 0;
                z-index: -1;
            }

            .menu {
                padding: 20px 20px 20px 0;
                position: relative;
            }

            .menu-item {
                cursor: pointer;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                margin-bottom: 20px;
                position: relative;
            }

            .menu-item::before {
                bottom: 4px;
                content: " ";
                height: 7px;
                left: 0;
                position: absolute;
                width: 100%;
            }

            .menu-item.selected::before {
                height: 14px;
            }

            .menu-item:nth-child( 1 )::before {
                background-color: #${ COLORS_CSS[ 0 ] };
                width: 70px;
            }
            .menu-item:nth-child( 1 ).selected::before { width: 247px; }

            .menu-item:nth-child( 2 )::before {
                background-color: #${ COLORS_CSS[ 1 ] };
                width: 80px;
            }
            .menu-item:nth-child( 2 ).selected::before { width: 255px; }

            .menu-item:nth-child( 3 )::before {
                background-color: #${ COLORS_CSS[ 2 ] };
                width: 110px;
            }
            .menu-item:nth-child( 3 ).selected::before { width: 283px; }


            .menu-item:last-child {
                margin-bottom: 0;
            }

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
                width: 30px;
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
                z-index: 1;
            }
        `;
    }

    private onMenuClick( index: number ) {
        this.selected = index;
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
        return html`
            <style>
                :host {
                    top: ${ 110 - this.selected * 38 }px;
                }
            </style>

            <ul class="menu">
                ${ this.menuItems.map( this.createMenuItem.bind( this ) ) }
            </ul>
            <div class="background"></div>
        `;
    }
}
