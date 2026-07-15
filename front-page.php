<?php
/**
 * The front page template.
 *
 * Renders a hero so the homepage looks intentional before any content
 * exists, then outputs the assigned static front page content (if any).
 *
 * @package MonkeyPayPay
 */

get_header();
?>

<main id="primary" class="site-main">

	<section class="hero">
		<div class="container hero__inner">
			<p class="hero__eyebrow"><?php esc_html_e( 'Payments, simplified', 'monkeypaypay' ); ?></p>
			<h1 class="hero__title"><?php bloginfo( 'name' ); ?></h1>
			<p class="hero__subtitle">
				<?php
				$tagline = get_bloginfo( 'description' );
				echo esc_html( $tagline ? $tagline : __( 'Send, receive, and manage payments without the friction.', 'monkeypaypay' ) );
				?>
			</p>
			<p class="hero__actions">
				<a class="button button--primary" href="#get-started"><?php esc_html_e( 'Get started', 'monkeypaypay' ); ?></a>
				<a class="button button--ghost" href="#learn-more"><?php esc_html_e( 'Learn more', 'monkeypaypay' ); ?></a>
			</p>
		</div>
	</section>

	<?php
	// If a static front page has been assigned in Settings → Reading, render it.
	while ( have_posts() ) :
		the_post();
		if ( trim( wp_strip_all_tags( get_the_content() ) ) ) :
			?>
			<section class="front-content container">
				<?php the_content(); ?>
			</section>
			<?php
		endif;
	endwhile;
	?>

</main>

<?php
get_footer();
