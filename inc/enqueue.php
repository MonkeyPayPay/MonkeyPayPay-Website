<?php
/**
 * Enqueue front-end scripts and styles.
 *
 * @package MonkeyPayPay
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue theme assets.
 */
function monkeypaypay_enqueue_assets() {
	// The theme header + design tokens live in style.css.
	wp_enqueue_style(
		'monkeypaypay-style',
		get_stylesheet_uri(),
		array(),
		MONKEYPAYPAY_VERSION
	);

	// The main stylesheet builds on the tokens above.
	wp_enqueue_style(
		'monkeypaypay-main',
		MONKEYPAYPAY_URI . '/assets/css/main.css',
		array( 'monkeypaypay-style' ),
		MONKEYPAYPAY_VERSION
	);

	wp_enqueue_script(
		'monkeypaypay-main',
		MONKEYPAYPAY_URI . '/assets/js/main.js',
		array(),
		MONKEYPAYPAY_VERSION,
		true
	);

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'monkeypaypay_enqueue_assets' );
