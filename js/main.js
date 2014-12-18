window.alert = function(v) { console.log('alert: ' + v) }

$(function() {
	updateFooter();

	$('header .user .username').mouseenter(function() {
		var out = false;
		$('.dropdown').addClass('open')
		$('.dropdown').mouseleave(function() {
			out = true;
		});
		setTimeout(function() {
			$('.dropdown').off('mouseleave');
			if(out) {
				$('.dropdown').removeClass('open');
				alert('left before transition');
			} else {
				$('.dropdown.open').mouseleave(function() {
					$(this).removeClass('open');
					$(this).off('mouseleave');
				});
			}
		}, 1000);
	});
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

