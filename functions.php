<?php
/**
 * MonkeyPayPay theme functions and definitions.
 *
 * @package MonkeyPayPay
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Prevent direct access.
}

define( 'MONKEYPAYPAY_VERSION', '0.1.0' );
define( 'MONKEYPAYPAY_DIR', get_template_directory() );
define( 'MONKEYPAYPAY_URI', get_template_directory_uri() );

require_once MONKEYPAYPAY_DIR . '/inc/setup.php';
require_once MONKEYPAYPAY_DIR . '/inc/enqueue.php';
require_once MONKEYPAYPAY_DIR . '/inc/template-tags.php';
