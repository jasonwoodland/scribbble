window.alert = function(v) { console.log('alert: ' + v) }

$(function() {
	updateFooter();

	$('header .user .username').mouseenter(function() {
		var out;
		$('.dropdown').addClass('open').mouseout(function() {
			out = true;
			alert('left before transition');
		});
		setTimeout(function() {
			alert(out);
			if(out) {
				$('.dropdown').removeClass('open').off('mouseout');
			} else {
				$('.dropdown.open').mouseout(function() {
					$(this).removeClass('open');
					$(this).off('mouseout');
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

