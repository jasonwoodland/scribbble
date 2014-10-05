<?php
	define('ROLE', 'sign-up');
	define('TITLE', 'Sign up');
	define('NO_HTML_HEADER', TRUE);
	define('NO_HTML_FOOTER', TRUE);
	require 'resources/controller.php';
?>

<div id="sign-up-wrapper">

	<div class="login-logo">
		<a href="feed.php">scribbble.io</a>
	</div>
	
	<form class="sign-up"> 
		<input id="username" name="username" type="text" placeholder="username">
		<input id="email" name="email" type="text" placeholder="email">
		<input id="password" name="password" type="password" placeholder="password">
		<input type="submit" value="sign up">
	</form>
	<a class="sign-option" href="sign-in.php">already have an account?</a>

</div>
