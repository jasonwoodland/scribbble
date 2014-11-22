<?php
	define('ROLE', 'sign-in');
	define('TITLE', 'Sign in');
	define('NO_HTML_HEADER', TRUE);
	require 'resources/controller.php';
?>
<div id="sign-in-wrapper">

	<div class="login-logo">
		<a href="trendy.php">scribbble.io</a>
	</div>

	<div class="hidden passed">
		<p>please check your email</p>
	</div>

	<div class="hidden failed">
		<p>incorrect credentials</p>
	</div>

	
	<form>
		<input name="username" id="username" type="text" placeholder="username" autocomplete='off'>
		<input name="password" id="password" type="password" placeholder="password" autocomplete='off'>

		<label>
			<input type="checkbox" name="check"> 
			<span class="label-text">rememeber me</span>
		</label>

		<input type="submit" value="sign in">
	</form>

	<a class="sign-option" href="sign-up.php">need an account?</a>

</div>
