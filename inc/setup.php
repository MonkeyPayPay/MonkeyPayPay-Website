<?php
/**
 * Theme setup: supports, menus, and widget areas.
 *
 * @package MonkeyPayPay
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register theme supports and features.
 */
function monkeypaypay_setup() {
	load_theme_textdomain( 'monkeypaypay', MONKEYPAYPAY_DIR . '/languages' );

	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'customize-selective-refresh-widgets' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );

	add_theme_support(
		'html5',
		array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script', 'navigation-widgets' )
	);

	add_theme_support(
		'custom-logo',
		array(
			'height'      => 48,
			'width'       => 180,
			'flex-height' => true,
			'flex-width'  => true,
		)
	);

	register_nav_menus(
		array(
			'primary' => __( 'Primary Menu', 'monkeypaypay' ),
			'footer'  => __( 'Footer Menu', 'monkeypaypay' ),
		)
	);
}
add_action( 'after_setup_theme', 'monkeypaypay_setup' );

/**
 * Set the content width used by embeds and wide images.
 */
function monkeypaypay_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'monkeypaypay_content_width', 1140 );
}
add_action( 'after_setup_theme', 'monkeypaypay_content_width', 0 );

/**
 * Register the footer widget area.
 */
function monkeypaypay_widgets_init() {
	register_sidebar(
		array(
			'name'          => __( 'Footer', 'monkeypaypay' ),
			'id'            => 'footer-1',
			'description'   => __( 'Widgets shown in the site footer.', 'monkeypaypay' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'monkeypaypay_widgets_init' );
