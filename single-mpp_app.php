<?php
/**
 * Single app view — full detail page for one app.
 *
 * @package MonkeyPayPay
 */

get_header();
?>

<main id="primary" class="site-main container">
	<?php
	while ( have_posts() ) :
		the_post();
		$mpp_play_url = get_post_meta( get_the_ID(), '_mpp_play_url', true );
		?>
		<article id="post-<?php the_ID(); ?>" <?php post_class( 'app-single' ); ?>>
			<header class="app-single__header">
				<?php if ( has_post_thumbnail() ) : ?>
					<div class="app-single__icon"><?php the_post_thumbnail( 'thumbnail' ); ?></div>
				<?php endif; ?>
				<div class="app-single__intro">
					<h1 class="entry-title"><?php the_title(); ?></h1>
					<?php
					$mpp_cats = get_the_term_list( get_the_ID(), 'mpp_app_category', '', ', ' );
					if ( $mpp_cats && ! is_wp_error( $mpp_cats ) ) {
						printf( '<p class="app-single__cats">%s</p>', wp_kses_post( $mpp_cats ) );
					}
					?>
					<?php if ( has_excerpt() ) : ?>
						<p class="app-single__description"><?php echo esc_html( get_the_excerpt() ); ?></p>
					<?php endif; ?>
					<?php if ( $mpp_play_url ) : ?>
						<a class="button button--primary" href="<?php echo esc_url( $mpp_play_url ); ?>" target="_blank" rel="noopener noreferrer">
							<?php esc_html_e( 'View on Google Play', 'monkeypaypay' ); ?>
						</a>
					<?php endif; ?>
				</div>
			</header>

			<div class="app-single__content entry-content">
				<?php the_content(); ?>
			</div>

			<p class="app-single__back">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>">&larr; <?php esc_html_e( 'Back to all apps', 'monkeypaypay' ); ?></a>
			</p>
		</article>
	<?php endwhile; ?>
</main>

<?php
get_footer();
