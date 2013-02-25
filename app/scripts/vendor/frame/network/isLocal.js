define( [], function() {
	return /(:\/\/localhost|file:\/\/)/.test(document.location.href);
} );