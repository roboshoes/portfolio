export type Color = [ number, number, number ];

export function rgbToHsl( r: number, g: number, b: number ): Color {
    r /= 255, g /= 255, b /= 255;

    const max = Math.max( r, g, b ), min = Math.min( r, g, b );
    const l = ( max + min ) / 2;

    let h = 0;
    let s: number;

    if ( max === min ) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / ( 2 - max - min ) : d / ( max + min );

        switch ( max ) {
            case r: h = ( g - b ) / d + ( g < b ? 6 : 0 ); break;
            case g: h = ( b - r ) / d + 2; break;
            case b: h = ( r - g ) / d + 4; break;
        }

        h /= 6;
    }

    return [ h, s, l ];
}

export function hslToCss( color: Color ) {
    return `hsl( ${ color[ 0 ] }, ${ Math.round( color[ 1 ] * 100 ) }%, ${ Math.round( color[ 2 ] * 100 ) }% )`;
}
