$(function() {
	$('form').submit(function(e) {
		e.preventDefault();
			$.post('/api/user-sign-in.php', $(this).serialize(), function(response) {
				if(response.indexOf('TRUE') == -1)
					$('#username, #password').addClass('failed');
				else location = '/';
				console.log(response);
			});
	});
	$('form').keypress(function() {
		$('#username, #password').removeClass('failed');
	});


});
