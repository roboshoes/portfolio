export function nextFrame(): Promise<void> {
    return new Promise( resolve => requestAnimationFrame( () => resolve() ) );
}

export function waitForSeconds( seconds: number ): Promise<void> {
    return new Promise( resolve => setTimeout( () => resolve(), seconds * 1000 ) );
}
