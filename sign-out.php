<?php
	require 'resources/controller.php';
	if($_GET['session_id'] != session_id()) exit();
	session_destroy();
	header('Location: /');
?>

