define( function() {

    return function( callback, time ) {

        var over = false;
        var called = false;

        setTimeout( function() {
            over = true;
            check();
        }, time );

        function check() {
            if ( over && called ) {
                callback();
            }
        }

        return function() {
            called = true;
            check();
        };
    };

} );