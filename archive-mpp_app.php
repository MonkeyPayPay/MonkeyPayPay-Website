<?php
/**
 * Archive of all apps (the /apps page).
 *
 * @package MonkeyPayPay
 */

get_header();
?>

<main id="primary" class="site-main container">
	<header class="page-header">
		<h1 class="page-title"><?php esc_html_e( 'All Apps', 'monkeypaypay' ); ?></h1>
	</header>

	<?php if ( have_posts() ) : ?>
		<div class="app-grid">
			<?php
			while ( have_posts() ) :
				the_post();
				get_template_part( 'template-parts/app-card' );
			endwhile;
			?>
		</div>
		<?php
		the_posts_pagination(
			array(
				'prev_text' => __( 'Previous', 'monkeypaypay' ),
				'next_text' => __( 'Next', 'monkeypaypay' ),
			)
		);
	else :
		get_template_part( 'template-parts/content', 'none' );
	endif;
	?>
</main>

<?php
get_footer();
