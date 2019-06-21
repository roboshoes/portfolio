import { Observable, BehaviorSubject } from "rxjs";
import { filter } from "rxjs/operators";

const route = new BehaviorSubject<string>( "" );

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
