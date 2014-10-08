<?php
	require 'resources/controller.php';
	if(AUTHENTICATED) require 'feed.php';
	else require 'sign-in.php';
?>
