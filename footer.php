<?php
/**
 * The site footer and closing page markup.
 *
 * @package MonkeyPayPay
 */

?>
	</div><!-- #content -->

	<footer id="colophon" class="site-footer">
		<div class="container site-footer__inner">
			<?php if ( is_active_sidebar( 'footer-1' ) ) : ?>
				<div class="site-footer__widgets">
					<?php dynamic_sidebar( 'footer-1' ); ?>
				</div>
			<?php endif; ?>

			<?php
			if ( has_nav_menu( 'footer' ) ) {
				wp_nav_menu(
					array(
						'theme_location' => 'footer',
						'menu_class'     => 'footer-menu',
						'container'      => false,
						'depth'          => 1,
						'fallback_cb'    => false,
					)
				);
			}
			?>

			<p class="site-footer__copyright">
				&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>.
				<?php esc_html_e( 'All rights reserved.', 'monkeypaypay' ); ?>
			</p>
		</div>
	</footer>
</div><!-- #page -->
<?php wp_footer(); ?>
</body>
</html>
