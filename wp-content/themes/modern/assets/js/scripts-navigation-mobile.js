/**
 * Mobile navigation toggling.
 *
 * This script requires `.menu-toggle-skip-link` to be added into menu as last
 * focusable child (can be hidden visibly, not for screen readers). This is to
 * prevent focus going out of the menu container when last focusable selector is
 * hidden with or in a container with `display: none;` which effectively renders
 * the selector un-focusable.
 *
 * @package    Modern
 * @copyright  WebMan Design, Oliver Juhas
 *
 * @since    1.4.5
 * @version  2.5.1
 */

( function() {
	'use strict';

	const container = document.getElementById( 'site-navigation' );
	if ( ! container ) {
		return;
	}

	const button = document.getElementById( 'menu-toggle' );
	if ( ! button ) {
		return;
	}

	const menu = document.getElementById( 'menu-primary' );
	// Hide menu toggle button if menu is empty and return early.
	if ( ! menu ) {
		button.style.display = 'none';
		return;
	}

	function modernToggleMenu() {
		container.classList.toggle( 'toggled' );
		document.body.classList.toggle( 'has-navigation-toggled' );
		document.documentElement.classList.toggle( 'lock-scroll' );

		if ( -1 !== container.className.indexOf( 'toggled' ) ) {
			button.setAttribute( 'aria-expanded', 'true' );
		} else {
			button.setAttribute( 'aria-expanded', 'false' );
		}
	}

	button.onclick = function() {
		modernToggleMenu();
	};

	/**
	 * Trap focus inside mobile menu modal.
	 * Code adapted from Twenty Twenty-One theme.
	 */
	document.addEventListener( 'keydown', function( event ) {
		if ( ! container.classList.contains( 'toggled' ) ) {
			return;
		}

		const
			selectors = 'a, button, input:not([type=hidden]), select',
			elements  = container.querySelectorAll( selectors ),
			firstEl   = elements[0],
			lastEl    = elements[ elements.length - 1 ],
			activeEl  = document.activeElement,
			tabKey    = ( 9 === event.keyCode ),
			escKey    = ( 27 === event.keyCode ),
			shiftKey  = event.shiftKey;

		if ( escKey ) {
			event.preventDefault();
			modernToggleMenu();
			button.focus();
		}

		if (
			! shiftKey
			&& tabKey
			&& lastEl === activeEl
		) {
			event.preventDefault();
			firstEl.focus();
		}

		if (
			shiftKey
			&& tabKey
			&& firstEl === activeEl
		) {
			event.preventDefault();
			lastEl.focus();
		}

		if (
			tabKey
			&& firstEl === lastEl
		) {
			event.preventDefault();
		}
	} );
} )();
