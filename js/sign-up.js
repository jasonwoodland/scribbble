$(function() {
	$('form').keypress(function(e) {
		if(e.keyCode == 13) {
			// enable loading indicator
			$.post('/api/user-sign-up.php', $(this).serialize(), function(response) {
				//disable loading indicator
				alert(response);
			});
		}
	});
	$('form').keyup(function() {
		$.post('/api/user-check.php', $(this).serialize(), function(response) {
		console.log(response, response['username']);
			$.each(['username', 'email'], function(i, v) {
				if($('#' + v).val() != '') {
					if(response[v]) $('#' + v).removeClass('failed').addClass('passed');
					else $('#' + v).removeClass('passed').addClass('failed');
				} else $('#' + v).removeClass('passed failed');
			});
		}, 'json');
	});

});
