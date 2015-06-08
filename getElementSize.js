// Browser Support: IE9+
// uses getComputedStyle

import getPrefixedPropertyName from 'domUtils/getPrefixedPropertyName';

let boxModelParts = [
	'paddingTop',
	'paddingRight',
	'paddingBottom',
	'paddingLeft',

	'marginTop',
	'marginRight',
	'marginBottom',
	'marginLeft',

	'borderTopWidth',
	'borderRightWidth',
	'borderBottomWidth',
	'borderLeftWidth'
];

let boxSizingProperty = getPrefixedPropertyName( 'boxSizing' );

function getZeroSize() {
	let size = {
		width:  0,
		height: 0,

		innerWidth:  0,
		innerHeight: 0,

		outerWidth:  0,
		outerHeight: 0
	};

	for ( let i = 0, len = boxModelParts.length; i < len; ++i ) {
		let boxModelPart = boxModelParts[ i ];
		size[ boxModelPart ] = 0;
	}

	return size;
}

function getElementSize( element ) {
	// use querySeletor if element is a string
	if ( typeof element === 'string' ) {
		element = document.querySelector( element );
	}

	// do not proceed on non-objects
	if ( !element || typeof element !== 'object' || !element.nodeType ) {
		return;
	}

	let style = getComputedStyle( element );

	// if hidden, everything is 0
	if ( style.display === 'none' ) {
		return getZeroSize();
	}

	let size = {
		width:  element.offsetWidth,
		height: element.offsetHeight
	};

	let isBorderBox = size.isBorderBox = !!( boxSizingProperty && style[ boxSizingProperty ] && style[ boxSizingProperty ] === 'border-box' );

	// get all box model parts
	for ( let i = 0, len = boxModelParts.length; i < len; ++i ) {
		let boxModelPart = boxModelParts[ i ];
		let value = style[ boxModelPart ];
		let num = parseFloat( value );

		// any 'auto', 'medium' value will be 0
		size[ boxModelPart ] = !isNaN( num ) ? num : 0;
	}

	let paddingWidth = size.paddingLeft + size.paddingRight;
	let paddingHeight = size.paddingTop + size.paddingBottom;
	let marginWidth = size.marginLeft + size.marginRight;
	let marginHeight = size.marginTop + size.marginBottom;
	let borderWidth = size.borderLeftWidth + size.borderRightWidth;
	let borderHeight = size.borderTopWidth + size.borderBottomWidth;

	size.innerWidth = size.width - ( paddingWidth + borderWidth );
	size.innerHeight = size.height - ( paddingHeight + borderHeight );

	size.outerWidth = size.width + marginWidth;
	size.outerHeight = size.height + marginHeight;

	return size;
}

export default getElementSize;