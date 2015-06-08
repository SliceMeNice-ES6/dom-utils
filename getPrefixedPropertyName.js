let vendorPrefixes = 'Webkit Moz ms Ms O'.split(' ');
let documentElementStyle = document.documentElement.style;

function getPrefixedPropertyName( propertyName ) {
	if ( !propertyName ) {
		return;
	}

	// test standard property first
	if ( typeof documentElementStyle[ propertyName ] === 'string' ) {
		return propertyName;
	}

	// capitalize
	propertyName = propertyName.charAt(0).toUpperCase() + propertyName.slice(1);

	// test vendor specific properties
	let prefixed;

	for ( let i = 0, len = prefixes.length; i < len; i++ ) {
		prefixed = vendorPrefixes[i] + propertyName;

		if ( typeof documentElementStyle[ prefixed ] === 'string' ) {
			return prefixed;
		}
	}
}

export default getPrefixedPropertyName;