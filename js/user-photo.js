$(function() {
	$(window).on('dragover dragleave drop', function(e) {
		return false;
	});
	$('#profile-image').on('dragover', function(e) {
		e.preventDefault();
		$('#profile-image').addClass('drag');
	}).on('dragleave', function(e) {
		$('#profile-image').removeClass('drag');
		e.preventDefault();
	});
	$('#profile-image').on('drop', function(e) {
		$('#profile-image').removeClass('drag');
		if(e.originalEvent.dataTransfer.files.length) {
			var formData = new FormData();
			formData.append('photo', e.originalEvent.dataTransfer.files[0]);
			var reader = new FileReader();
			reader.onload = function(e) {
				$('#profile-image').css({
					backgroundImage: 'url(' + e.target.result + ')'
				});
			};
			reader.readAsDataURL(e.originalEvent.dataTransfer.files[0]);
			$.ajax({
				url: '/api/user-photo',
				type: 'POST',
				data: formData,
				xhr: function() {
					var request = $.ajaxSettings.xhr();
					if(request.upload) {
						request.upload.addEventListener('progress', function(e) {
							console.log(e.loaded);
							$('#profile-image').html(Math.floor(e.loaded / e.total * 100) + '%');
						}, false);
					}
					return request;
				},
				processData: false,
				contentType: false,
				success: function() {
					$('#profile-image').html('');
				}
			}); 
		}
		return false;
	});
});

