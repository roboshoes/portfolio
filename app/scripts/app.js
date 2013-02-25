define( [

	"jquery",
	"tiles/tile-factory"

	], function( $, TileFactory ) {

	var App = function() {

		var self = this;
		var content;
		var tiles = [];
		var container = $( "#container" );
		var numLoaded = 0;

		this.loadJSON = function( onCompleteClosure ) {
			$.getJSON( "content.json", function( data ) {
				content = data;
				onCompleteClosure.call();
			} );
		}

		this.initialize = function() {

			for ( var i = 0; i < content.tiles.length; i++ ) {
				var info = content.tiles[ i ];
				var tile = TileFactory.create( info.template );

				tile.build( info, onTileComplete );

				tiles.push( tile );
			}
		}

		var onTileComplete = function( tile ) {
			numLoaded++;

			if ( numLoaded >= tiles.length ) {
				initUI();
			}
		}

		var initUI = function() {
			setTimeout( function() {
				$( "header" ).removeClass( "hidden" );
			}, 200 )

			setTimeout( insertTiles, 600 );
		}

		var insertTiles = function() {
			var tile;

			for (var i = 0; i < tiles.length; i++ ) {
				tile = tiles[ i ];

				container.append( tile.getContainer() );
				fadeInTile( tile, i );
			}
		}

		var fadeInTile = function( tile, index ) {
			setTimeout( function() {
				tile.fadeIn();
			}, index * ( Math.random() * 100 + 100 ) );
		}

	}

	return new App();
} );
