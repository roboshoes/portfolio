define( [

    "mout/array/forEach"

], function( forEach ) {

    function preload( callback ) {

        var files = [
            "adk.jpg",
            "button-background.jpg",
            "confetti.jpg",
            "counselor.jpg",
            "hair.png",
            "html5games.jpg",
            "marblerun.jpg",
            "mario.png",
            "mathias.jpg",
            "pi.jpg",
            "spread.jpg",
            "swidgets.jpg",
            "swirl.jpg",
            "twitter.jpg",
            "white-stripe.jpg",
            "worms.jpg"
        ];

        var loaded = 0;
        var total = files.length;

        function onImageLoaded() {
            if ( ++loaded === total ) {
                callback();
            }
        }

        forEach( files, function( file ) {

            var path = "images/" + file;
            var image = new Image();

            image.onload = onImageLoaded;
            image.src = path;

        } );

    }

    return preload;

} );