<?php
/**
 * The custom search form.
 *
 * @package MonkeyPayPay
 */

?>
<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label>
		<span class="screen-reader-text"><?php esc_html_e( 'Search for:', 'monkeypaypay' ); ?></span>
		<input type="search" class="search-field" placeholder="<?php esc_attr_e( 'Search&hellip;', 'monkeypaypay' ); ?>" value="<?php echo esc_attr( get_search_query() ); ?>" name="s" />
	</label>
	<button type="submit" class="search-submit button"><?php esc_html_e( 'Search', 'monkeypaypay' ); ?></button>
</form>
