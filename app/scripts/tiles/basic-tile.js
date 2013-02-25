define( [

	"jquery",
	"frame/utils/template"

	], function( $, template ) {

	var BasicTile = function() {

		var container;

		this.build = function( content, callback ) {

			$.ajax( {
				url : "templates/" + content.template + ".hbs",
				dataType: "text",
					success : function( data ) {

					var source = template( data, content );
					container = $( source );
					container.addClass( "over" );

					callback.call();
				}
			} );
		}

		this.getContainer = function() {
			return container[ 0 ];
		}

		this.fadeIn = function() {
			container.css( "opacity", "1" );
			container.removeClass( "over" );
		}
	}

	return BasicTile;
} );