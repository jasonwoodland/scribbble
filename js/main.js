window.alert = function(v) { console.log('alert: ' + v) }

$(function() {
	updateFooter();
});

$(window).on('resize scroll', function() {
	updateFooter();
});

function updateFooter() {
	if($('body').height() < $(window).height()) {
		$('footer').addClass('sink');

	} else {
		$('footer').removeClass('sink');
	}
}
