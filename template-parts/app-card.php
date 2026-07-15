<?php
/**
 * App card: icon + Google Play link, short description, and screenshots.
 *
 * @package MonkeyPayPay
 */

$mpp_play_url = get_post_meta( get_the_ID(), '_mpp_play_url', true );
?>
<article id="app-<?php the_ID(); ?>" <?php post_class( 'app-card' ); ?>>
	<div class="app-card__head">
		<?php if ( has_post_thumbnail() ) : ?>
			<a class="app-card__icon" href="<?php the_permalink(); ?>">
				<?php the_post_thumbnail( 'thumbnail', array( 'alt' => esc_attr( get_the_title() ) ) ); ?>
			</a>
		<?php endif; ?>

		<div class="app-card__heading">
			<h3 class="app-card__title">
				<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
			</h3>
			<?php if ( $mpp_play_url ) : ?>
				<a class="button button--primary app-card__cta" href="<?php echo esc_url( $mpp_play_url ); ?>" target="_blank" rel="noopener noreferrer">
					<?php esc_html_e( 'View on Google Play', 'monkeypaypay' ); ?>
				</a>
			<?php endif; ?>
		</div>
	</div>

	<?php if ( has_excerpt() ) : ?>
		<p class="app-card__description"><?php echo esc_html( get_the_excerpt() ); ?></p>
	<?php endif; ?>

	<?php
	// Screenshots live in the content area as a Gallery block.
	if ( trim( get_the_content() ) !== '' ) :
		?>
		<div class="app-card__screenshots">
			<?php the_content(); ?>
		</div>
	<?php endif; ?>
</article>
