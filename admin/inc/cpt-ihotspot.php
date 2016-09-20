<?php defined( 'ABSPATH' ) or die( 'No script kiddies please!' );?>
<?php
// Register Custom Post Type
function devvn_ihotspot_cpt_func() {

	$labels = array(
		'name'                  => _x( 'Image Hotspot', 'Post Type General Name', 'devvn' ),
		'singular_name'         => _x( 'Image Hotspot', 'Post Type Singular Name', 'devvn' ),
		'menu_name'             => __( 'Image Hotspot', 'devvn' ),
		'name_admin_bar'        => __( 'Image Hotspot', 'devvn' ),
		'archives'              => __( 'Item Archives', 'devvn' ),
		'parent_item_colon'     => __( 'Parent Item:', 'devvn' ),
		'all_items'             => __( 'All Items', 'devvn' ),
		'add_new_item'          => __( 'Add New Item', 'devvn' ),
		'add_new'               => __( 'Add New', 'devvn' ),
		'new_item'              => __( 'New Item', 'devvn' ),
		'edit_item'             => __( 'Edit Item', 'devvn' ),
		'update_item'           => __( 'Update Item', 'devvn' ),
		'view_item'             => __( 'View Item', 'devvn' ),
		'search_items'          => __( 'Search Item', 'devvn' ),
		'not_found'             => __( 'Not found', 'devvn' ),
		'not_found_in_trash'    => __( 'Not found in Trash', 'devvn' ),
		'featured_image'        => __( 'Featured Image', 'devvn' ),
		'set_featured_image'    => __( 'Set featured image', 'devvn' ),
		'remove_featured_image' => __( 'Remove featured image', 'devvn' ),
		'use_featured_image'    => __( 'Use as featured image', 'devvn' ),
		'insert_into_item'      => __( 'Insert into item', 'devvn' ),
		'uploaded_to_this_item' => __( 'Uploaded to this item', 'devvn' ),
		'items_list'            => __( 'Items list', 'devvn' ),
		'items_list_navigation' => __( 'Items list navigation', 'devvn' ),
		'filter_items_list'     => __( 'Filter items list', 'devvn' ),
	);
	$args = array(
		'label'                 => __( 'Image Hotspot', 'devvn' ),
		'labels'                => $labels,
		'supports'              => array( 'title' ),
		'hierarchical'          => false,
		'public'                => false,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'menu_position'         => 5,
		'menu_icon'             => 'dashicons-location-alt',
		'show_in_admin_bar'     => false,
		'show_in_nav_menus'     => false,
		'can_export'            => false,
		'has_archive'           => false,		
		'exclude_from_search'   => true,
		'publicly_queryable'    => true,
		'capability_type'       => 'page',
	);
	register_post_type( 'points_image', $args );

}
add_action( 'init', 'devvn_ihotspot_cpt_func', 0 );

//Add admin inline style
function devvn_ihotspot_admin_css() {
	global $post_type;
	$post_types = array(
		'points_image'
	);
	if(in_array($post_type, $post_types))
		echo '<style type="text/css">#post-preview, #view-post-btn,#message.notice-success a{display: none;}</style>';
}
add_action( 'admin_head-post-new.php', 'devvn_ihotspot_admin_css' );
add_action( 'admin_head-post.php', 'devvn_ihotspot_admin_css' );

//Add row to admin column
add_filter( 'page_row_actions', 'devvn_ihotspot_row_actions', 10, 2 );
add_filter( 'post_row_actions', 'devvn_ihotspot_row_actions', 10, 2 );
function devvn_ihotspot_row_actions( $actions, $post ) {
	if($post->post_type == 'points_image'){
	    unset( $actions['inline hide-if-no-js'] );
	    unset( $actions['view'] );
	}
    return $actions;
}

//Add new column
function devvn_ihotspot_cpt_admin_columns( $columns ) {
	$columns = array(
		'cb' 			=> '<input type="checkbox" />',
		'title' 		=> __( 'Title','devvn' ),	
		'shortcode' 	=> __( 'Shortcode','devvn' ),
		'date' 			=> __( 'Date','devvn' ),	
	);
	return $columns;
}
add_filter( 'manage_edit-points_image_columns', 'devvn_ihotspot_cpt_admin_columns' ) ;

//Add content to colum
function devvn_ihotspot_manage_points_image_columns( $column, $post_id ) {
	global $post;
	switch( $column ) {
		case 'shortcode' :
			echo '[devvn_ihotspot id="'.$post->ID.'"]';
			break;
		default :
			break;
	}
}
add_action( 'manage_points_image_posts_custom_column', 'devvn_ihotspot_manage_points_image_columns', 10, 2 );