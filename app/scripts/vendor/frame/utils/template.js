define( [], function() {

	return function( template, data ) {

		var replace = function( match, property ) {
			return ( property in data ) ? data[ property ] : "";
		}

		return template.replace( /\{\{(\w+)\}\}/g, replace );
	}
} );