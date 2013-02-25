require.config( {
	shim: {},

	paths: {
		hm: "vendor/hm",
		jquery: "vendor/jquery.min",
		frame: "vendor/frame"
	}
} );

require( [ "app" ], function( app ) {

	app.loadJSON( app.initialize );

} );
