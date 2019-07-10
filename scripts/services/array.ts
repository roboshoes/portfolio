/**
 * A stable sort implementation for arrays of any type. This algorithm does not run in-place. The
 * array returned is a shallow copy.
 *
 * @param array to be sorted
 * @param compareFn function that revieves to entries at a time returning -1 if a is smaller than b,
 *                  0 if neutral and 1 if a is larger.
 */
export function stableSort<T>( array: T[], compareFn: ( a: T, b: T ) => number ): T[] {
    const indeces = array.map( ( x: T, i: number ) => ( { element: x, index: i } ) );

    return indeces.sort( ( a, b ) => {
        const result = compareFn( a.element, b.element );
        return result === 0 ? a.index - b.index : result;
    } ).map( x => x.element );
}
