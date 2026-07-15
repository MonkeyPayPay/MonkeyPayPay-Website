<?php
/**
 * App category archive — all apps in one category.
 *
 * @package MonkeyPayPay
 */

get_header();
?>

<main id="primary" class="site-main container">
	<header class="page-header">
		<h1 class="page-title"><?php single_term_title(); ?></h1>
		<?php the_archive_description( '<div class="archive-description">', '</div>' ); ?>
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
