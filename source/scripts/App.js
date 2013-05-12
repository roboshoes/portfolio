define( [

	"text!../server/twitter.php"

], function( twitterText ) {

	var App = function() {

		function initialize() {
			document.getElementById( "twitter-quote" ).innerHTML = twitterText.toUpperCase();
			fadeIn();
		}

		function fadeIn() {
			setTimeout( function() {
				document.getElementById( "header" ).removeAttribute( "class" );
			}, 200 );

			var tiles = document.getElementsByClassName( "tile" );
			var tile;

			for ( var i = 0; i < tiles.length; i++ ) {
				fadeInTile( tiles[ i ], i );
			}
		}

		function fadeInTile( tile, index ) {
			tile.classList.add( "over" );

			setTimeout( function() {

				tile.classList.remove( "over" );
				tile.style.opacity = "1";

			}, index * ( Math.random() * 100 + 100 ) + 400  );
		}

		initialize();

	}

	return App;
} );
