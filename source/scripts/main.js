require.config( {

	urlArgs: "bust=" + Date.now(),

	paths: {
		text: "libs/require/plugin.text"
	}

} );

require( [], function() {} );
