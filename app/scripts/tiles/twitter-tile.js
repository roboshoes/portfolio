define( [

		"tiles/basic-tile",
		"frame/network/isLocal"

	], function( BasicTile, isLocal ) {

	var TwitterTile = function() {

		this.build = function( content, callback ) {

			$.ajax( {
	            url : "server/twitter.php",
	            dataType: "text",
	            success : function ( data ) {
	               	if ( !isLocal ) content.quote = data.toUpperCase();
	               	else content.quote = '@<a href="http://google.com">JoeZaph</a> I wish I wouldn\'t know what you are talking about'.toUpperCase();

					TwitterTile.prototype.build( content, callback );
	            }
	        } );

		}

	}

	TwitterTile.prototype = new BasicTile();

	return TwitterTile;
} );