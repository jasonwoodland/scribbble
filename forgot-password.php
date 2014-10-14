<?php
	define('ROLE', 'forgot-password');
	define('TITLE', 'Forgot Password');
	define('NO_HTML_HEADER', TRUE);
	require 'resources/controller.php';
?>
<div id="forgot-password-wrapper">
	
	<div class="login-logo">
		<a href="feed.php">scribbble.io</a>
	</div>

	<form>
		<input name="forgot-password" id="username" type="email" placeholder="email" autocomplete='off'>
		<input type="submit" value="reset password">
	</form>

	<a class="sign-option" href="sign-in.php">back to sign in page</a>

</div>