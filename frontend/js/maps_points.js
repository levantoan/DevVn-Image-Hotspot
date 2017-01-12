(function($){
	$('.ihotspot_hastooltop').powerTip({
		placement: 'n',
		smartPlacement: true,
		mouseOnToPopup: true,
	});
	$('.ihotspot_hastooltop').data('powertip', function() {
		var htmlThis = $(this).parents('.ihotspot_tooltop_html').attr('data-html');
		return htmlThis;
	});
})(jQuery)