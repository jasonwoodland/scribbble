window.alert = function(v) { console.log('alert: ' + v) }

$(function() {
	updateFooter();
	$('#overlay').hide();

	setTimeout(function() {
		$('header .user .username').mouseenter(function() {
			var out = false;
			$('#overlay').fadeIn(250);
			$('.dropdown').addClass('open');
			$('.dropdown').mouseleave(function() {
				out = true;
			});
			setTimeout(function() {
				$('.dropdown').off('mouseleave');
				if(out) {
					$('#overlay').fadeOut(250);
					$('.dropdown').removeClass('open');
					alert('left before transition');
				} else {
					$('.dropdown.open').mouseleave(function() {
						$('#overlay').fadeOut(250);
						$(this).removeClass('open');
						$(this).off('mouseleave');
					});
				}
			}, 250);
		});
	}, 250);
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

