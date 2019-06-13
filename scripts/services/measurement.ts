const element = document.createElement( "div" );

element.style.position = "fixed";
element.style.top = "-100px";

export function measureTextWidth( text: string ): number {
    element.innerText = text;

    document.body.appendChild( element );

    const width = element.getBoundingClientRect().width;

    document.body.removeChild( element );

    return Math.ceil( width );
}
