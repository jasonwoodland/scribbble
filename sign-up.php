<?php
	define('ROLE', 'sign-up');
	define('TITLE', 'Sign up');
	define('NO_HTML_HEADER', TRUE);
	define('NO_HTML_FOOTER', TRUE);
	require 'resources/controller.php';
?>

<div id="sign-up-wrapper">

	<div class="login-logo">
		<a href="/">scribbble.io</a>
	</div>
	
	<form class="sign-up"> 
		<input id="username" name="username" type="text" placeholder="username" autocomplete='off'>
		<input id="email" name="email" type="text" placeholder="email" autocomplete='off'>
		<input id="password" name="password" type="password" placeholder="password" autocomplete='off'>
		<input type="submit" value="sign up">
	</form>
	
	<a class="sign-option" href="sign-in">already have an account?</a>

</div>
