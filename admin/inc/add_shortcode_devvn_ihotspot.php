<?php defined( 'ABSPATH' ) or die( 'No script kiddies please!' );?>
<?php
function devvn_ihotspot_shortcode_func($atts){
	
	$atts = shortcode_atts( array(
		'id' => '',
	), $atts, 'devvn_ihotspot' );
	
	$idPost =  intval($atts['id']);
	
	if(get_post_status($idPost) != "publish") return;
	
	$data_post = maybe_unserialize(get_post_field('post_content', $idPost));
		
	$maps_images = (isset($data_post['maps_images']))?$data_post['maps_images']:'';
	$data_points = (isset($data_post['data_points']))?$data_post['data_points']:'';
	$pins_image = (isset($data_post['pins_image']))?$data_post['pins_image']:'';
	$pins_image_hover = (isset($data_post['pins_image_hover']))?$data_post['pins_image_hover']:'';
	$pins_more_option = wp_parse_args($data_post['pins_more_option'],array(
		'position'			=>	'center_center',
		'custom_top'		=>	0,
		'custom_left'		=>	0,
		'custom_hover_top'	=>	0,
		'custom_hover_left'	=>	0
	));	
	ob_start();
	if($maps_images):
	?>
	<div class="wrap_svl_center">
	<div class="wrap_svl_center_box">
	<div class="wrap_svl" id="body_drag">
		<div class="images_wrap">
		<img src="<?php echo $maps_images; ?>">
		</div>	
		 <?php if(is_array($data_points)):?>
		 <?php $stt = 1;foreach ($data_points as $point):		 
		 ob_start();?>
		 <?php if(isset($point['content'])):?>
		 <div class="box_view_html">
		 	<?php echo apply_filters('the_content', $point['content']);?>
		 </div>
		 <?php endif;?>
		 <?php
		 $view_html = ob_get_clean();
		 ?>
		 <div class="drag_element tips" style="top:<?php echo $point['top']?>%;left:<?php echo $point['left']?>%;" >
		 	<div class="point_style <?php echo ($pins_image_hover)?'has-hover':''?>" data-html="<?php echo esc_html($view_html)?>">
		 		<img src="<?php echo $pins_image?>" class="pins_image" style="top:-<?php echo $pins_more_option['custom_top']?>px;left:-<?php echo $pins_more_option['custom_left']?>px">
		 		<?php if($pins_image_hover):?><img src="<?php echo $pins_image_hover?>" class="pins_image_hover"  style="top:-<?php echo $pins_more_option['custom_hover_top']?>px;left:-<?php echo $pins_more_option['custom_hover_left']?>px"><?php endif;?>		 		
		 	</div>
		 </div>
		 <?php $stt++;endforeach;?>		 
		 <?php endif;?> 		 	
	 </div>
	 </div>
	 </div>
	<?php
	endif;	
	return ob_get_clean();
}
add_shortcode('devvn_ihotspot','devvn_ihotspot_shortcode_func');