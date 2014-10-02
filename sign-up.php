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
		<input name="username" type="text" placeholder="username">
		<input name="email" type="text" placeholder="email">
		<input name="password" type="password" placeholder="password">
	</form>

	<a class="sign-option" href="sign-in.php">already have an account?</a>

</div>
