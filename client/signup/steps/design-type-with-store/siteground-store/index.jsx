/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Gridicon from 'components/gridicon';
import FormButton from 'components/forms/form-button';
import StepHeader from 'signup/step-header';
import Button from 'components/button';

import SitegroundLogo from './siteground-logo';

export default React.createClass( {
	displayName: 'SitegroundStoreStep',

	redirectToPartner() {
		window.location.href = 'https://www.siteground.com/woocommerce/step1.htm';
	},

	render() {
		return (
			<div>
				<StepHeader
					headerText={ this.translate( 'Create a WordPress Store' ) }
					subHeaderText={ this.translate( 'Our partners at SiteGround and WooCommerce are here for you' ) }
				/>

				<div className="design-type-with-store__container">
					<div className="design-type-with-store__copy">
						<SitegroundLogo />
						<div className="design-type-with-store__text">
							{ this.translate( 'We\'ve partnered with SiteGround, a top-notch WordPress hosts with a knack for building great e-commerce stores using WooCommerce.' ) }
						</div>
					</div>

					<div className="design-type-with-store__form">
						<span className="design-type-with-store__price-text"> { this.translate( 'Starting at' ) } </span>
						<span className="design-type-with-store__price"> <b>$3.95</b>/mo </span>
						<FormButton className="design-type-with-store__form-submit" onClick={ this.redirectToPartner }>
							{ this.translate( 'Create Store' ) }
						</FormButton>
					</div>
				</div>

				<div className="design-type-with-store__back-button-wrapper">
					<Button compact borderless onClick={ this.props.onBackClick }>
						<Gridicon icon="arrow-left" size={ 18 } />
						{ this.translate( 'Back' ) }
					</Button>
				</div>
			</div>

		);
	}

} );
