import { Observable, BehaviorSubject } from "rxjs";
import { filter, startWith, pairwise, map } from "rxjs/operators";

const route = new BehaviorSubject<string>( "" );
const forwards = new Map<string, string>();

export function onRouteChange(): Observable<[string, string]> {
    return route.pipe(
        startWith( "/" ),
        pairwise()
    );
}

export function observeRoute( value: RegExp ): Observable<boolean> {
    return onRouteChange().pipe(
        filter( ( [ previous, current ] ) =>  !!( value.test( current ) || value.test( previous ) ) ),
        map( ( [ _, current ] ) => value.test( current ) ),
    );
}

export function onRoute( value: string ): Observable<string> {
    return route.pipe( filter( ( url: string ) => url.startsWith( value ) ) );
}

export function setRoute( value: string ) {
    if ( forwards.has( value ) ) {
        setRoute( forwards.get( value )! );
        return;
    }

    window.history.pushState( null, "", value );
    resolveRoute();
}

export function getRoute(): string {
    return window.location.pathname;
}

export function setForward( from: string, to: string ) {
    forwards.set( from, to );
}

export function initRouter() {
    const initialValue = window.location.pathname;

    if ( forwards.has( initialValue ) ) {
        setRoute( forwards.get( initialValue )! );
        return;
    }

    resolveRoute();
}

function resolveRoute() {
    route.next( window.location.pathname );
}

window.addEventListener( "popstate", resolveRoute );
