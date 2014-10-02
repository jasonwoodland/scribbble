$(function() {
	$('form').submit(function(e) {
		e.preventDefault();
		// enable loading indicator
		$.post('/api/user-sign-up.php', $(this).serialize(), function(response) {
			//disable loading indicator
			alert(response);
		});
	});
});
