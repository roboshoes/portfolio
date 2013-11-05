require.config( {

	urlArgs: "bust=" + Date.now(),

	paths: {
        cane: "libs/cane",
        mout: "libs/mout"
	}

} );

require( [ "app/app" ], function( app ) {

    app();

} );
