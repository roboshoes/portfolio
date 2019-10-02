import { Observable, Subscriber } from "rxjs";

export function observeHitAreaX( max: number, initial = false ): Observable<boolean> {
    return new Observable( ( subscriber: Subscriber<boolean> ) => {
        subscriber.next( initial );

        window.addEventListener( "mousemove", ( event: MouseEvent ) => {
            if ( event.pageX < max && !initial ) {
                initial = true;
                subscriber.next( true );
            } else if ( event.pageX > max && initial ) {
                initial = false;
                subscriber.next( false );
            }
        } );
    } );
}
