<?php
/**
 * Template part shown when no posts are found.
 *
 * @package MonkeyPayPay
 */

?>
<section class="no-results not-found">
	<header class="page-header">
		<h1 class="page-title"><?php esc_html_e( 'Nothing here yet', 'monkeypaypay' ); ?></h1>
	</header>
	<div class="page-content">
		<p><?php esc_html_e( 'No content was found. Try a search instead?', 'monkeypaypay' ); ?></p>
		<?php get_search_form(); ?>
	</div>
</section>
