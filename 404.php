<?php
/**
 * The template for displaying 404 (not found) pages.
 *
 * @package MonkeyPayPay
 */

get_header();
?>

<main id="primary" class="site-main container">
	<section class="error-404 not-found">
		<header class="page-header">
			<h1 class="page-title"><?php esc_html_e( 'Page not found', 'monkeypaypay' ); ?></h1>
		</header>
		<div class="page-content">
			<p><?php esc_html_e( 'The page you are looking for is not here. Try a search instead.', 'monkeypaypay' ); ?></p>
			<?php get_search_form(); ?>
		</div>
	</section>
</main>

<?php
get_footer();
