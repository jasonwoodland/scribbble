<?php
	require 'resources/controller.php';
	$user = new user();
	$user->verify(substr($_SERVER['PATH_INFO'], 1));
	header('Location: /');
?>
