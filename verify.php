<?php
	require 'resources/controller.php';
	user::verify(substr($_SERVER['PATH_INFO'], 1));
	header('Location: /');
?>
