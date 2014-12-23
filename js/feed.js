var scribes = [];

$(function() {
	$('.column3 iframe').each(function() {
		$(this).attr('src', scribes[$(this).data('index')]);
	});
});
