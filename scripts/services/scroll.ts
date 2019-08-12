import { Subscription, Subject } from "rxjs";

const observable = new Subject<number>();
const states: number[] = [];

let element: HTMLElement | undefined;

export function setScrollElement( ref: HTMLElement ) {
    element = ref;
}

export function pushScrollState() {
    if ( element ) {
        states.push( element.scrollTop );

        element.scrollTo( {
            top: 0,
            behavior: "smooth"
        } );
    }
}

export function popScrollState() {
    if ( element ) {
        const target = states.pop() || 0;

        element.scrollTo( {
            top: target,
            behavior: "smooth"
        } );
    }
}

export function onScrollUpdate( callback: ( pixels: number ) => void ): Subscription {
    return observable.subscribe( callback );
}
