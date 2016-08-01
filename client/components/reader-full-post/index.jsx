/**
 * External Dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { translate } from 'i18n-calypso';

/**
 * Internal Dependencies
 */
import ReaderMain from 'components/reader-main';
import Button from 'components/button';
import Gravatar from 'components/gravatar';
import StickyPanel from 'components/sticky-panel';
import Gridicon from 'components/gridicon';
import { setSection } from 'state/ui/actions';
import smartSetState from 'lib/react-smart-set-state';
import PostStore from 'lib/feed-post-store';
import SiteStore from 'lib/reader-site-store';
import FeedStore from 'lib/feed-store';
import { fetchPost } from 'lib/feed-post-store/actions';
import ReaderFullPostHeader from './header';

export class FullPostView extends React.Component {
	constructor( props ) {
		super( props );
		this.handleBack = this.handleBack.bind( this );
	}

	handleBack() {
		this.props.onClose && this.props.onClose();
	}

	render() {
		/*eslint-disable react/no-danger*/
		return (
			<ReaderMain className="reader-full-post">
				<StickyPanel className="reader-full-post__back-container">
					<Button className="reader-full-post__back" borderless compact onClick={ this.handleBack }>
						<Gridicon icon="arrow-left" /> { translate( 'Back' ) }
					</Button>
				</StickyPanel>
				<div className="reader-full-post__content">
					<div className="reader-full-post__sidebar">
						<StickyPanel>
							<Gravatar className="reader-full-post__gravatar" size={ 96 } user={ this.props.post.author } />
						</StickyPanel>
					</div>
					<div className="reader-full-post__story">
						<ReaderFullPostHeader post={ this.props.post } />
						<div className="reader__full-post-content" dangerouslySetInnerHTML={ { __html: this.props.post.content } } />
					</div>
				</div>
			</ReaderMain>
		);
	}
}

/**
 * A container for the FullPostView responsible for binding to Flux stores
 */
export class FullPostFluxContainer extends React.Component {
	constructor( props ) {
		super( props );
		this.state = this.getStateFromStores( props );
		this.updateState = this.updateState.bind( this );
		this.smartSetState = smartSetState;
	}

	getStateFromStores( props = this.props ) {
		const postKey = {
			blogId: props.blogId,
			feedId: props.feedId,
			postId: props.postId
		};

		const post = PostStore.get( postKey );

		if ( ! post ) {
			fetchPost( postKey );
		}

		let feed, site;

		if ( post && post.feed_ID ) {
			feed = FeedStore.get( post.feed_ID );
		}
		if ( post && post.site_ID ) {
			site = SiteStore.get( post.site_ID );
		}

		return {
			post,
			site,
			feed
		};
	}

	updateState() {
		this.smartSetState( this.getStateFromStores() );
	}

	componentWillMount() {
		PostStore.on( 'change', this.updateState );
		SiteStore.on( 'change', this.updateState );
		FeedStore.on( 'change', this.updateState );
	}

	componentWillReceiveProps( nextProps ) {
		this.updateState( this.getStateFromStores( nextProps ) );
	}

	componentWillUnmount() {
		PostStore.off( 'change', this.updateState );
		SiteStore.off( 'change', this.updateState );
		FeedStore.off( 'change', this.updateState );
	}

	render() {
		return this.state.post
			? <FullPostView
					onClose={ this.props.onClose }
					post={ this.state.post }
					site={ this.state.site }
					feed={ this.state.feed } />
			: null;
	}
}

export default connect(
	state => {
		return { };
	},
	dispatch => {
		return bindActionCreators( {
			setSection
		}, dispatch );
	}
)( FullPostFluxContainer );
