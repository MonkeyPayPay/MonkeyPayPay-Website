<?php
/**
 * Front page — the app directory, grouped by category.
 *
 * Loops through every app category that has apps and renders each app as a
 * card (icon + Google Play link, short description, screenshots).
 *
 * @package MonkeyPayPay
 */

get_header();
?>

<main id="primary" class="site-main">

	<section class="hero">
		<div class="container hero__inner">
			<h1 class="hero__title"><?php bloginfo( 'name' ); ?></h1>
			<p class="hero__subtitle">
				<?php
				$mpp_tagline = get_bloginfo( 'description' );
				echo esc_html( $mpp_tagline ? $mpp_tagline : __( 'All of my Google Play apps, in one place.', 'monkeypaypay' ) );
				?>
			</p>
		</div>
	</section>

	<div class="container app-directory">
		<?php
		$mpp_terms = get_terms(
			array(
				'taxonomy'   => 'mpp_app_category',
				'hide_empty' => true,
			)
		);

		if ( ! is_wp_error( $mpp_terms ) && ! empty( $mpp_terms ) ) :
			foreach ( $mpp_terms as $mpp_term ) :
				$mpp_apps = new WP_Query(
					array(
						'post_type'      => 'mpp_app',
						'posts_per_page' => -1,
						'orderby'        => array(
							'menu_order' => 'ASC',
							'title'      => 'ASC',
						),
						'tax_query'      => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
							array(
								'taxonomy' => 'mpp_app_category',
								'field'    => 'term_id',
								'terms'    => $mpp_term->term_id,
							),
						),
					)
				);

				if ( $mpp_apps->have_posts() ) :
					?>
					<section class="app-category" id="category-<?php echo esc_attr( $mpp_term->slug ); ?>">
						<header class="app-category__header">
							<h2 class="app-category__title"><?php echo esc_html( $mpp_term->name ); ?></h2>
							<?php if ( $mpp_term->description ) : ?>
								<p class="app-category__description"><?php echo esc_html( $mpp_term->description ); ?></p>
							<?php endif; ?>
						</header>

						<div class="app-grid">
							<?php
							while ( $mpp_apps->have_posts() ) :
								$mpp_apps->the_post();
								get_template_part( 'template-parts/app-card' );
							endwhile;
							?>
						</div>
					</section>
					<?php
				endif;
				wp_reset_postdata();
			endforeach;
		else :
			?>
			<section class="app-directory__empty">
				<h2><?php esc_html_e( 'No apps yet', 'monkeypaypay' ); ?></h2>
				<p>
					<?php esc_html_e( 'Add your first app under Apps → Add New in the WordPress dashboard: pick a Category, set the icon as the Featured image, write a short description in the Excerpt, add screenshots as a Gallery block, and paste the Google Play link.', 'monkeypaypay' ); ?>
				</p>
			</section>
			<?php
		endif;
		?>
	</div>

</main>

<?php
get_footer();
