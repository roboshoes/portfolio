import { Observable, BehaviorSubject } from "rxjs";
import { filter, startWith, pairwise, map } from "rxjs/operators";

const route = new BehaviorSubject<string>( "" );

export function onRouteChange(): Observable<[string, string]> {
    return route.pipe(
        startWith( "/" ),
        pairwise()
    );
}

export function observeRoute( value: RegExp ): Observable<boolean> {
    return onRouteChange().pipe(
        filter( [ previous, current ] ) => !!( value.test( current ) || value.test( previous ) ) ),
        map( ( [ previous, current ] ) => {
            return ( value.test( current ) && ! value.test( previous ) ) || ;
        } ),
    );
}

export function onRoute( value: string ): Observable<string> {
    return route.pipe( filter( ( url: string ) => url.startsWith( value ) ) );
}

export function setRoute( value: string ) {
    window.history.pushState( null, "", value );
}

function resolveRoute() {
    route.next( window.location.pathname );
}

window.addEventListener( "popstate", resolveRoute );
