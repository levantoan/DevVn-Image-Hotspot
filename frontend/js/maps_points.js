(function($){
	$('.tips .point_style img').powerTip({
		placement: 'n',
		smartPlacement: true,
		mouseOnToPopup: true,
	});
	$('.tips .point_style img').data('powertip', function() {
		var htmlThis = $(this).parent().attr('data-html');
		return htmlThis;
	});
})(jQuery)