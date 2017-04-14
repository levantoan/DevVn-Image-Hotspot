(function($){
	$(document).ready(function(){
		$('.ihotspot_hastooltop').each(function(){
			$(this).data('powertip', function() {
				var htmlThis = $(this).parents('.ihotspot_tooltop_html').attr('data-html');
				return htmlThis;
			});
			var thisPlace = $(this).parents('.ihotspot_tooltop_html').data('placement');
			$(this).powerTip({
				placement: thisPlace,
				smartPlacement: true,
				mouseOnToPopup: true,
			});
		})
    })
})(jQuery)