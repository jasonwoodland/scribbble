<?php
	require 'resources/controller.php';
		if(AUTHENTICATED) require 'trendy.php';
		else require 'sign-in.php';
?>
