
/**
 * External dependencies
 */
import React from 'react';
import PureRenderMixin from 'react-pure-render/mixin';

/**
 * Internal dependencies
 */
import Popover from 'components/popover';
import PopoverMenu from 'components/popover/menu';
import PopoverMenuItem from 'components/popover/menu-item';

const Popovers = React.createClass( {
	mixins: [ PureRenderMixin ],

	getInitialState: function() {
		return {
			popoverPosition: 'top',

			showPopover: true,
			showPopoverMenu: false,
			showMultiplePopover: true,
		};
	},

	// set position for all popovers
	changePopoverPosition( event ) {
		this.setState( { popoverPosition: event.target.value } );
	},

	swapPopoverVisibility() {
		this.setState( { showPopover: ! this.state.showPopover } );
	},

	closePopover() {
		this.setState( { showPopover: false } );
	},

	showPopoverMenu() {
		this.setState( {
			showPopoverMenu: ! this.state.showPopoverMenu
		} );
	},

	closePopoverMenu() {
		this.setState( { showPopoverMenu: false } );
	},

	onPopoverMenuItemBClick( closePopover ) {
		closePopover();
	},

	updateMultiplePopover( event ) {
		this.setState( {
			currentTarget: event.currentTarget,
			showMultiplePopover: true
		} );
	},

	closeMultiplePopover() {
		this.setState( {
			showMultiplePopover: false,
			currentTarget: null
		} );
	},

	movePopovertoRandomTarget( event ) {
		event.preventDefault();
		const random = parseInt( Math.random() * 1 * 256 );
		const ref = this.refs && this.refs[ `target-${ random }` ];
		if ( ! ref ) {
			return null;
		}

		this.setState( {
			showMultiplePopover: true,
			currentTarget: ref
		} );
	},

	renderPopover() {
		return (
			<div>
				<button
					className="button"
					ref="popoverButton"
					onClick={ this.swapPopoverVisibility }
				>
					Show Popover
				</button>

				<Popover
					isVisible={ this.state.showPopover }
					onClose={ this.closePopover }
					position={ this.state.popoverPosition }
					context={ this.refs && this.refs.popoverButton }
				>
					<div style={ {
						padding: '10px'
					} }>
						Simple Popover Instance
					</div>
				</Popover>
			</div>
		);
	},

	renderMenuPopover() {
		return (
			<div>
				<button
						className="button"
						ref="popoverMenuButton"
						onClick={ this.showPopoverMenu }
					>
					Show Popover Menu
				</button>

				<br />

				<PopoverMenu
					isVisible={ this.state.showPopoverMenu }
					onClose={ this.closePopoverMenu }
					position={ this.state.popoverPosition }
					context={ this.refs && this.refs.popoverMenuButton }
				>
					<PopoverMenuItem action="A">Item A</PopoverMenuItem>
					<PopoverMenuItem action="B" onClick={ this.onPopoverMenuItemBClick }>Item B</PopoverMenuItem>
					<PopoverMenuItem action="C">Item C</PopoverMenuItem>
				</PopoverMenu>
			</div>
		);
	},

	renderMultipleTargetsPopover() {
		const targets = [];
		const targetsCount = 256;
		for ( let n = 0; n < targetsCount; n++ ) {
			targets.push(
				<li
					ref={ `target-${ n }` }
					className="docs__popover-hover-example__bullet"
					key={ `bullet-${ n }` }
					onMouseEnter={ this.updateMultiplePopover }
					onMouseLeave={ this.closeMultiplePopover }
				>
					{ n }
				</li>
			);
		}

		const context = this.state.currentTarget ||
			this.refs && this.refs[ `target-${ parseInt( targetsCount / 2 ) }` ];

		return (
			<div className="docs__popover-hover-example">
				<div>
					<button
						className="button"
						onClick={ this.movePopovertoRandomTarget }
					>
						Move to random target
					</button>
				</div>

				<br />

				<ul onMouseLeave={ this.closeMultiplePopover }>
					{ targets }
				</ul>

				<Popover
					id="multiple-target-popover"
					isVisible={ this.state.showMultiplePopover }
					onClose={ this.closePopover }
					position={ this.state.popoverPosition }
					context={ context }
				>
					{ this.renderPopoverContent() }
				</Popover>
			</div>
		);
	},

	renderPopoverContent() {
		const { currentTarget } = this.state;
		const targetId = currentTarget ? currentTarget.innerText : null;

		return (
			<div
				style={ { padding: '10px' } }
				className="docs__popover-hover-example__content"
			>
				Lorem ipsum&nbsp;
					<strong style={ { color: 'green' } }>
						{ targetId }
					</strong>
				&nbsp;dolor sit amet.
			</div>
		);
	},

	render() {
		return (
			<div className="docs__design-assets-group">
				<h2>
					<a href="/devdocs/design/popovers">Popovers</a>
				</h2>
				<label>Position
					<select
						value={ this.state.popoverPosition }
						onChange={ this.changePopoverPosition }
					>
						<option value="top">top</option>
						<option value="top left">top left</option>
						<option value="top right">top right</option>
						<option value="left">left</option>
						<option value="right">right</option>
						<option value="bottom">bottom</option>
						<option value="bottom left">bottom left</option>
						<option value="bottom right">bottom right</option>
					</select>
				</label>

				<hr />

				{ this.renderPopover() }

				<hr />

				{ this.renderMenuPopover() }

				<hr />

				{ this.renderMultipleTargetsPopover() }
			</div>
		);
	}
} );

export default Popovers;
