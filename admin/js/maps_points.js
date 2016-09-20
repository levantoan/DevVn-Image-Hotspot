jQuery(document).ready(function($){		
	// Instantiates the variable that holds the media library frame.
	var meta_image_frame;
		
	// Runs when the image button is clicked.
	$('body').on('click','[id*=meta-image-button]',function(e){
		
		e.preventDefault();
		
		// Sets up the media library frame
		meta_image_frame = wp.media.frames.meta_image_frame = wp.media({
			title: meta_image.title,
			button: { text:  meta_image.button },
			library: { type: 'image' },
			multiple: false
		});

		// Runs when an image is selected.
		meta_image_frame.on('select', function(){
			// Grabs the attachment selection and creates a JSON representation of the model.
			var media_attachment = meta_image_frame.state().get('selection').first().toJSON();
			// Sends the attachment URL to our custom image input field.
			$('.svl-image-wrap').addClass('has-image');
			$('#maps_images').val(media_attachment.url);
			if($('#body_drag .images_wrap img').length > 0){
				$('#body_drag .images_wrap img').attr('src',media_attachment.url);
			}else{
				$('#body_drag .images_wrap').html('<img src="'+media_attachment.url+'">');
			}
		});
		// Opens the media library frame.
		meta_image_frame.open();
	});
	$('body').on('click','.button-upload',function(e){
		// Prevents the default action from occuring.
		e.preventDefault();
		var thisUpload = $(this).parents('.svl-upload-image');
		// Sets up the media library frame
		meta_image_frame = wp.media.frames.meta_image_frame = wp.media({
			title: meta_image.title,
			button: { text:  meta_image.button },
			library: { type: 'image' },
			multiple: false
		});
		// Runs when an image is selected.
		meta_image_frame.on('select', function(){
			// Grabs the attachment selection and creates a JSON representation of the model.
			var media_attachment = meta_image_frame.state().get('selection').first().toJSON();
			// Sends the attachment URL to our custom image input field.
			thisUpload.addClass('has-image');
			thisUpload.find('input[type="hidden"]').val(media_attachment.url);
			thisUpload.find('img.image_view').attr('src',media_attachment.url);	
			calc_custom_position();
		});
		// Opens the media library frame.
		meta_image_frame.open();
	});	
	/*var coordinates = function(event, ui, element) {
  		element = $(element);
  		var left = ui.position.left,
			top  = ui.position.top;
		var wWrap = element.width(),
			hWrap = element.height();
		$('#results').text('X: ' + left + ' ' + 'Y: ' + top)
					 .append('<br>W: '+ wWrap +' H: '+ hWrap)
					 .append('<br>top: '+ (top/hWrap)*100 +'%;left: '+ (left/wWrap)*100+'%;');
	}
	*/
  	function doDraggable(){
  		$('.drag_element').draggable({
	  	  	containment: '#body_drag',
	  	  	drag: function( event, ui ) {
	  	  		/*coordinates(event, ui, '#body_drag');*/
	  	  	},
	  	  	stop: function( event, ui ) {
	  	  		var thisPoint = ui.helper.context.id;
	  	  		var dataPoint = $('#'+thisPoint).attr('data-points');
	  	  		var element = $('#body_drag');
		  	  	var left = ui.position.left,
					top  = ui.position.top;
				var wWrap = element.width(),
					hWrap = element.height();
				var topPosition = ((top/hWrap)*100).toFixed(2),
					leftPosition = ((left/wWrap)*100).toFixed(2);				
				
	  	  		$('.all_points #info_draggable'+dataPoint+' input[name="pointdata[top][]"]').val(topPosition);
	  	  		$('.all_points #info_draggable'+dataPoint+' input[name="pointdata[left][]"]').val(leftPosition);
	  	  		  				
  			}
	  	});
  	}  	
  	doDraggable();
  	$('.add_point').click(function(){  
  		if(!$('input.pins_image').val()){
  			alert('Add pins image then add point.');
  			return false;
  		}
  		var pins_image_view = $('.pins_image').val();
  		var countPoint = parseInt($('.wrap_svl .drag_element').last().attr('data-points'));
  		var nonceForm = $('#maps_points_meta_box_nonce').val();
  		if(!countPoint) countPoint = 0;
  		countPoint = countPoint + 1;
  		var fullId = 'point_content'+countPoint;
  		$.ajax({
  			type : "post",
			dataType : "json",
			url : meta_image.ajaxurl,
			data : {
				action		:	"devvn_ihotspot_clone_point", 
				countpoint 	: 	countPoint, 
				img_pins	: 	pins_image_view,
				nonce		: 	nonceForm
			},
			context: this,
			beforeSend: function(){
				$(this).parent().addClass('adding_point');
			},
			success: function(response) {	
				console.log(response);
				if(response.success === true) {
					var data = response.data;
					$('.wrap_svl').append(data.point_pins);  
			  		$('.all_points').append(data.point_data);
			  		
			  		/* this is need for the tabs to work 
			  		source https://github.com/ccbgs/load_editor
			  		*/
					quicktags({id : fullId});
					tinymce.init({
						selector:"#" + fullId,
						content_css : meta_image.editor_style,
						min_height: 200,
				        textarea_name: "pointdata[content][]",						
						relative_urls:false,
						remove_script_host:false,
						convert_urls:false,
						browser_spellcheck:false,
						fix_list_elements:true,
						entities:"38,amp,60,lt,62,gt",
						entity_encoding:"raw",
						keep_styles:false,
						//paste_webkit_styles:"font-weight font-style color",
						//preview_styles:"font-family font-size font-weight font-style text-decoration text-transform",
						wpeditimage_disable_captions:false,
						wpeditimage_html5_captions:true,
						plugins:"charmap,hr,media,paste,tabfocus,textcolor,wordpress,wpeditimage,wpgallery,wplink,wpdialogs,wpview",						
						resize:"vertical",
						menubar:false,
						wpautop:true,
						indent:false,
						toolbar1:"bold,italic,strikethrough,bullist,numlist,blockquote,hr,alignleft,aligncenter,alignright,link,unlink,wp_more,spellchecker,wp_adv",
						toolbar2:"formatselect,underline,alignjustify,forecolor,pastetext,removeformat,charmap,outdent,indent,undo,redo,wp_help",
						toolbar3:"",
						toolbar4:"",
						tabfocus_elements:":prev,:next",									
					});
					
					// this is needed for the editor to initiate
					tinyMCE.execCommand('mceFocus', false, fullId);
					tinyMCE.execCommand('mceRemoveEditor', false, fullId);
					tinyMCE.execCommand('mceAddEditor', false, fullId); 					
					
			  		doDraggable();
			  		calc_custom_position();	
			  		$(this).parent().removeClass('adding_point');
				}else {
				   alert("Try again!");
				}
			}
  		}); 
  		return false;
  	}); 
  	$('body').on('click','.button_delete',function(){
  		var idDiv = $(this).parents('.list_points').attr('data-points');
  		$('#info_draggable'+idDiv).on('hidden.bs.modal', function (e) {
  			$('#info_draggable'+idDiv).remove();
	  		$('#draggable'+idDiv).remove();
  		});
  		return false;
  	});
  	$('body').on('click','.svl-delete-image',function(){
  		var parentDiv = $(this).parents('.svl-upload-image');
  		parentDiv.removeClass('has-image');
  		parentDiv.find('input[type="hidden"]').val('');
  		return false;
  	});
  	function cacl_position($position = 'center_center',$is_hover = false,$return = 'top'){
  		var $r_top = 0;
		var $r_left = 0;		
		if($is_hover){
			var $width = $('.pins_img_hover').width(),
	  			$height = $('.pins_img_hover').height(),
	  			$custom_top = $('input[name="custom_hover_top"]').val(),
	  			$custom_left = $('input[name="custom_hover_left"]').val();
		}else{
			var $width = $('.pins_img').width(),
				$height = $('.pins_img').height(),
				$custom_top = $('input[name="custom_top"]').val(),
				$custom_left = $('input[name="custom_left"]').val();
		}
  		switch ($position){
			case 'center_center':
				$r_top = $height/2;
				$r_left = $width/2;
				break;
			case 'top_center':
				$r_top = 0;
				$r_left = $width/2;
				break;
			case 'top_right':
				$r_top = 0;
				$r_left = $width;
				break;
			case 'top_left':
				$r_top = 0;
				$r_left = 0;
				break;
			case 'right_center':
				$r_top = $height/2;
				$r_left = $width;
				break;
			case 'bottom_center':
				$r_top = $height;
				$r_left = $width/2;
				break;
			case 'bottom_right':
				$r_top = $height;
				$r_left = $width;
				break;
			case 'bottom_left':
				$r_top = $height;
				$r_left = 0;
				break;
			case 'left_center':
				$r_top = $height/2;
				$r_left = 0;
				break;
			case 'custom_center':
				$r_top = $custom_top;
				$r_left = $custom_left;
				break;
			default:
				$r_top = $height/2;
				$r_left = $width/2;
				break;
		}
  		if($return == 'top'){
  			return $r_top;
  		}else{
  			return $r_left;
  		}
  	}
  	function point_position($position = 'center_center'){  		
		$('input[name="custom_top"]').val(cacl_position($position,false,'top')),
		$('input[name="custom_left"]').val(cacl_position($position,false,'left'));
		$('input[name="custom_hover_top"]').val(cacl_position($position,true,'top')),
		$('input[name="custom_hover_left"]').val(cacl_position($position,true,'left'));
		$('.point_style img').each(function(){
			$(this).css({
				'top':'-'+cacl_position($position,false,'top')+'px',
				'left':'-'+cacl_position($position,false,'left')+'px'
			});
		});
	}
  	calc_custom_position();
  	function calc_custom_position(){
  		var typeVal = $('input[name="choose_type"]:checked').val();
  		point_position(typeVal);
  	}
  	$('input[name="choose_type"]').change(function(){
  		var thisVal = $('input[name="choose_type"]:checked').val();
  		point_position(thisVal);
  		return false;
  	});
  	$('input[name="custom_top"],input[name="custom_left"]').on('change',function(){
  		var thisVal = $('input[name="choose_type"]:checked').val();
  		if(thisVal == 'custom_center')
  			point_position(thisVal);
  		return false;
  	});
});