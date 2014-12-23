<?php
	require '../resources/controller.php';
	scribe::save(
		$_POST['id'],
		$_POST['html'],
		$_POST['css'],
		$_POST['js'],
		$_POST['htmlPreprocessor'],
		$_POST['cssPreprocessor'],
		$_POST['jsPreprocessor']
	);
	error_log(print_r($_POST,true));
	error_log('SCRIBE SAVE');
?>

