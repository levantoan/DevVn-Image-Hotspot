<?php
defined( 'ABSPATH' ) or die( 'No script kiddies please!' );
function devvn_ihotspot_donate_meta_box() {
	//post type
	$screens = array( 'points_image' );

	foreach ( $screens as $screen ) {
		add_meta_box(
			'devvn-ihotspot-donate-shortcode',
			__( 'Buy me a Coffee to keep me awake :)', 'devvn' ),
			'devvn_ihotspot_donate_shortcode_callback',
			$screen,
			'side',
			'low'
		);
	}
}
add_action( 'add_meta_boxes', 'devvn_ihotspot_donate_meta_box' );
function devvn_ihotspot_donate_shortcode_callback(){
	ob_start();
	?>
	<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=CXLFN68QBQ6XU" title="" target="_blank">
		<img src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" alt=""/>
	</a>
	<?php
	echo ob_get_clean();
}