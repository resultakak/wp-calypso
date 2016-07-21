/** @ssr-ready **/

const processPiece = ( piece, data ) =>
	'string' === piece.type
		? piece.value
		: data[ piece.type ];

export const buildTitle = ( format, data ) =>
	format
		.reduce( ( title, piece ) => title + processPiece( piece, data ), '' );

export const buildSiteTitle = ( format, site ) =>
	buildTitle( format, {
		siteName: site.name,
		tagline: site.description
	} );
