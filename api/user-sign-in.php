<?php
	require '../resources/controller.php';

	$me = new user($_POST['username']);
	if($me->authenticate($_POST['password'])) {
		echo 'TRUE';
		$_SESSION['authenticated'] = TRUE;
		$_SESSION['username'] = $_POST['username'];
		$_SESSION['user_id'] = user::find('username', $_POST['username']);
		error_log('USER ID: ' . $_SESSION['user_id']);
	} else echo 'FALSE';
?>

