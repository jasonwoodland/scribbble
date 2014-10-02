<?php
	define('ROLE', 'sign-up');
	define('TITLE', 'Sign up');
	define('NO_HTML_HEADER', TRUE);
	define('NO_HTML_FOOTER', TRUE);
	require 'resources/controller.php';
?>
<div id="login-wrapper">

	<div class="login-logo">
		<a href="index.php">scribbble.io</a>
	</div>
	
	<form> 
		<input name="username" type="text" placeholder="username">
		<input name="email" type="text" placeholder="email">
		<input name="password" type="password" placeholder="password">
		<input type="submit" value="sign up">
	</form>

</div>
