<?php
/**
 * "App" custom post type, category taxonomy, and app meta.
 *
 * This is what powers the site: each app is one "App" entry that carries an
 * icon (featured image), a short description (excerpt), a Google Play link
 * (meta field below), and screenshots (a Gallery block in the content area).
 *
 * @package MonkeyPayPay
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the "App" post type.
 */
function monkeypaypay_register_app_post_type() {
	$labels = array(
		'name'               => __( 'Apps', 'monkeypaypay' ),
		'singular_name'      => __( 'App', 'monkeypaypay' ),
		'add_new'            => __( 'Add New', 'monkeypaypay' ),
		'add_new_item'       => __( 'Add New App', 'monkeypaypay' ),
		'edit_item'          => __( 'Edit App', 'monkeypaypay' ),
		'new_item'           => __( 'New App', 'monkeypaypay' ),
		'view_item'          => __( 'View App', 'monkeypaypay' ),
		'search_items'       => __( 'Search Apps', 'monkeypaypay' ),
		'not_found'          => __( 'No apps found', 'monkeypaypay' ),
		'not_found_in_trash' => __( 'No apps found in Trash', 'monkeypaypay' ),
		'all_items'          => __( 'All Apps', 'monkeypaypay' ),
		'menu_name'          => __( 'Apps', 'monkeypaypay' ),
	);

	$args = array(
		'labels'        => $labels,
		'public'        => true,
		'has_archive'   => true,
		'menu_icon'     => 'dashicons-smartphone',
		'menu_position' => 5,
		'supports'      => array( 'title', 'editor', 'excerpt', 'thumbnail', 'page-attributes' ),
		'rewrite'       => array( 'slug' => 'apps' ),
		'show_in_rest'  => true,
	);

	register_post_type( 'mpp_app', $args );
}
add_action( 'init', 'monkeypaypay_register_app_post_type' );

/**
 * Register the "App Category" taxonomy (Fitness, Games, Widgets, ...).
 */
function monkeypaypay_register_app_category_taxonomy() {
	$labels = array(
		'name'          => __( 'App Categories', 'monkeypaypay' ),
		'singular_name' => __( 'App Category', 'monkeypaypay' ),
		'search_items'  => __( 'Search Categories', 'monkeypaypay' ),
		'all_items'     => __( 'All Categories', 'monkeypaypay' ),
		'edit_item'     => __( 'Edit Category', 'monkeypaypay' ),
		'update_item'   => __( 'Update Category', 'monkeypaypay' ),
		'add_new_item'  => __( 'Add New Category', 'monkeypaypay' ),
		'new_item_name' => __( 'New Category Name', 'monkeypaypay' ),
		'menu_name'     => __( 'Categories', 'monkeypaypay' ),
	);

	$args = array(
		'labels'            => $labels,
		'hierarchical'      => true,
		'public'            => true,
		'show_admin_column' => true,
		'show_in_rest'      => true,
		'rewrite'           => array( 'slug' => 'app-category' ),
	);

	register_taxonomy( 'mpp_app_category', array( 'mpp_app' ), $args );
}
add_action( 'init', 'monkeypaypay_register_app_category_taxonomy' );

/**
 * Seed default categories and flush rewrite rules when the theme is activated.
 */
function monkeypaypay_seed_default_app_categories() {
	monkeypaypay_register_app_post_type();
	monkeypaypay_register_app_category_taxonomy();

	$defaults = array( 'Fitness', 'Games', 'Widgets', 'Productivity', 'Utilities' );
	foreach ( $defaults as $term ) {
		if ( ! term_exists( $term, 'mpp_app_category' ) ) {
			wp_insert_term( $term, 'mpp_app_category' );
		}
	}

	flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'monkeypaypay_seed_default_app_categories' );

/**
 * Add the "App Details" meta box (Google Play URL).
 */
function monkeypaypay_add_app_meta_box() {
	add_meta_box(
		'mpp_app_details',
		__( 'App Details', 'monkeypaypay' ),
		'monkeypaypay_render_app_meta_box',
		'mpp_app',
		'side',
		'high'
	);
}
add_action( 'add_meta_boxes', 'monkeypaypay_add_app_meta_box' );

/**
 * Render the "App Details" meta box.
 *
 * @param WP_Post $post Current post object.
 */
function monkeypaypay_render_app_meta_box( $post ) {
	wp_nonce_field( 'monkeypaypay_save_app_meta', 'monkeypaypay_app_meta_nonce' );
	$play_url = get_post_meta( $post->ID, '_mpp_play_url', true );
	?>
	<p>
		<label for="mpp_play_url"><strong><?php esc_html_e( 'Google Play URL', 'monkeypaypay' ); ?></strong></label>
		<input
			type="url"
			id="mpp_play_url"
			name="mpp_play_url"
			value="<?php echo esc_attr( $play_url ); ?>"
			placeholder="https://play.google.com/store/apps/details?id=..."
			style="width:100%;"
		/>
	</p>
	<p class="description" style="margin-top:1em;">
		<?php esc_html_e( 'Reminder:', 'monkeypaypay' ); ?><br>
		&bull; <?php esc_html_e( 'Icon = the Featured image.', 'monkeypaypay' ); ?><br>
		&bull; <?php esc_html_e( 'Short description = the Excerpt.', 'monkeypaypay' ); ?><br>
		&bull; <?php esc_html_e( 'Screenshots = a Gallery block in the content area.', 'monkeypaypay' ); ?><br>
		&bull; <?php esc_html_e( 'Pick at least one Category on the right.', 'monkeypaypay' ); ?>
	</p>
	<?php
}

/**
 * Save the "App Details" meta box.
 *
 * @param int $post_id Post ID.
 */
function monkeypaypay_save_app_meta( $post_id ) {
	if ( ! isset( $_POST['monkeypaypay_app_meta_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['monkeypaypay_app_meta_nonce'] ), 'monkeypaypay_save_app_meta' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	if ( isset( $_POST['mpp_play_url'] ) ) {
		update_post_meta( $post_id, '_mpp_play_url', esc_url_raw( wp_unslash( $_POST['mpp_play_url'] ) ) );
	}
}
add_action( 'save_post_mpp_app', 'monkeypaypay_save_app_meta' );
