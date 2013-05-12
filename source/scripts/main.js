require.config( {

	urlArgs: "bust=" + Date.now(),

	paths: {
		text: "libs/require/plugin.text"
	}

} );

require( [ "App" ], function( App ) {

	var app = new App();

} );
