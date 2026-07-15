<?php
/**
 * Custom template tags for this theme.
 *
 * @package MonkeyPayPay
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'monkeypaypay_posted_on' ) ) {
	/**
	 * Print the published date for the current post.
	 */
	function monkeypaypay_posted_on() {
		printf(
			'<span class="posted-on"><time class="entry-date published" datetime="%1$s">%2$s</time></span>',
			esc_attr( get_the_date( DATE_W3C ) ),
			esc_html( get_the_date() )
		);
	}
}

if ( ! function_exists( 'monkeypaypay_entry_footer' ) ) {
	/**
	 * Print the category list for the current post.
	 */
	function monkeypaypay_entry_footer() {
		if ( 'post' !== get_post_type() ) {
			return;
		}

		$categories = get_the_category_list( ', ' );
		if ( $categories ) {
			printf(
				'<span class="cat-links">%1$s %2$s</span>',
				esc_html__( 'Posted in', 'monkeypaypay' ),
				wp_kses_post( $categories )
			);
		}
	}
}
