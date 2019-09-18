import { LitElement, customElement, html, css } from "lit-element";

@customElement( "app-menu" )
export class MenuElement extends LitElement {
    private menuItems = [ "WHO", "WORK", "CONTACT" ];

    static get styles() {
        return css`
            li {
                list-style: none;
            }

            ul {
                padding: 20px 20px 20px 0;
            }

            .menu {
                background-color: #F6F6F6;
                left: 0;
                position: absolute;
                top: 40px;
            }

            .menu-item {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                margin-bottom: 20px;
            }

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
                width: 40px;
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

            .name {
                font-size: 18px;
            }
        `;
    }

    private createMenuItem( name: string, index: number ) {
        return html`
            <li class="menu-item">
                <div class="line">0${ index + 1 }</div>
                <div class="name">${ name }</div>
            </li>
        `;
    }

    render() {
        return html`
            <ul class="menu">
                ${ this.menuItems.map( this.createMenuItem.bind( this ) ) }
            </ul>
        `;
    }
}
