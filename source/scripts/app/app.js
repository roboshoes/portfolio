define( [

    "mout/array/forEach",
    "cane/style/removeClass",
    "cane/style/addClass",
    "cane/style/css",
    "cane/dom/remove",
    "app/preload",
    "app/utils/after"

], function( forEach, removeClass, addClass, css, remove, preload, after ) {

    var doc = document;

    function app() {

        var tiles = doc.querySelectorAll( ".tile" );
        var header = doc.querySelector( "header" );
        var loader = doc.querySelector( "#loader" );

        function init() {
            setup();

            showLoader();
            preload( after( onLoaded, 2000 ) );
        }

        function onLoaded() {
            removeLoader();
            setTimeout( showTiles, 500 );
        }

        function setup() {
            css( [ tiles, header ],  "display", "block" );

            addClass( header, "hidden" );
            addClass( tiles, "hidden-height" );
        }

        function showTiles() {

            forEach( tiles, function( tile, index ) {
                setTimeout( function() {
                    removeClass( tile, "hidden-height" );
                }, index * 300 );
            } );

            removeClass( header, "hidden" );
        }

        function removeLoader() {
            addClass( loader, "hidden" );
            setTimeout( remove, 1000, loader );
        }

        function showLoader() {
            setTimeout( removeClass, 50, loader, "hidden" );
        }

        init();

    }

    return app;

} );