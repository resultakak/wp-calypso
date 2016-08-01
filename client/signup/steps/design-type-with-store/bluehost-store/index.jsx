/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import Gridicon from 'components/gridicon';
import LoggedOutForm from 'components/logged-out-form';
import FormButton from 'components/forms/form-button';
import StepHeader from 'signup/step-header';
import Button from 'components/button';
import { abtest } from 'lib/abtest';

import BluehostLogo from './bluehost-logo';

export default React.createClass( {
	displayName: 'BluehostStoreStep',

	onSubmit( event ) {
		event.preventDefault();

		if ( 'bluehostWithWoo' === abtest( 'signupStoreBenchmarking' ) ) {
			window.location.href = 'https://www.bluehost.com/web-hosting/signup?flow=woocommerce';
		} else {
			window.location.href = 'https://www.bluehost.com/wordpress';
		}
	},

	render() {
		return (
			<div>
				<StepHeader
					headerText={ this.translate( 'Create a WordPress Store' ) }
					subHeaderText={ this.translate( 'Our partners at BlueHost and WooCommerce are here for you' ) }
				/>

				<div className="design-type-with-store__container">
					<div className="design-type-with-store__copy">
						<BluehostLogo />
						{ this.translate( 'We\'ve partnered with BlueHost, a top-notch WordPress hosts with a knack for building great e-commerce stores using WooCommerce.' ) }
					</div>

					<LoggedOutForm className="design-type-with-store__form" onSubmit={ this.onSubmit }>
						<span className="design-type-with-store__price-text"> { this.translate( 'Starting at' ) } </span>
						<span className="design-type-with-store__price"> <b>$12.95</b>/mo </span>
						<FormButton className="design-type-with-store__form-submit"> { this.translate( 'Create Store' ) } </FormButton>
					</LoggedOutForm>
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
