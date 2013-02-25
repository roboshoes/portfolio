define( [

	"tiles/basic-tile",
	"tiles/twitter-tile"

	], function( BasicTile, TwitterTile ) {

	var TileFactory = function() {

		this.create = function( template ) {
			switch( template ) {
				case "twitter":
					return new TwitterTile();
					break;
				default:
					return new BasicTile();
					break;
			}
		}

	}

	return new TileFactory();

} );