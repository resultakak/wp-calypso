/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Gridicon from 'components/gridicon';
import { getNormalizedPost } from 'state/posts/selectors';

function PostStatus( { translate, post } ) {
	if ( ! post ) {
		return null;
	}

	const { sticky, status } = post;
	let text, classModifier, icon;
	if ( sticky ) {
		text = translate( 'sticky' );
		classModifier = 'is-sticky';
		icon = 'bookmark-outline';
	} else if ( 'pending' === status ) {
		text = translate( 'Pending review' );
		classModifier = 'is-pending';
	} else if ( 'future' === status ) {
		text = translate( 'Scheduled' );
		classModifier = 'is-scheduled';
		icon = 'calendar';
	} else if ( 'trash' === status ) {
		text = translate( 'trashed' );
		classModifier = 'is-trash';
		icon = 'trash';
	}

	if ( ! text ) {
		return null;
	}

	const classes = classNames( 'post-status', classModifier );

	return (
		<span className={ classes }>
			<Gridicon
				icon={ icon }
				size={ 18 }
				className="post-status__icon" />
			<span className="post-status__text">
				{ text }
			</span>
		</span>
	);
}

PostStatus.propTypes = {
	globalId: PropTypes.string,
	translate: PropTypes.func,
	post: PropTypes.object
};

export default connect( ( state, { globalId } ) => {
	return {
		post: getNormalizedPost( state, globalId )
	};
} )( localize( PostStatus ) );
