<?php
	require 'resources/controller.php';
echo AUTHENTICATED;
	if(AUTHENTICATED) require 'feed.php';
	else require 'sign-in.php';
?>
