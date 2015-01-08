<?php
	require '../resources/controller.php';
	echo scribe::save(
		$_POST['id'],
		$_POST['html'],
		$_POST['css'],
		$_POST['js'],
		$_POST['htmlPreprocessor'],
		$_POST['cssPreprocessor'],
		$_POST['jsPreprocessor']
	);
?>

