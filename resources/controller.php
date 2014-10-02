<?php
	if(session_status() == PHP_SESSION_NONE) {
		function __autoload($class) {
			include_once "library/$class.php";
		}
		session_set_cookie_params(3600 * 24 * 14);
		session_start();
	}

	if(defined('TITLE')) {
		ob_start();
		defined(NO_HEADER) or require 'templates/header.php';
		function shutdown() {
			ob_flush();
			defined(NO_FOOTER) or require 'templates/footer.php';
		}
		register_shutdown_function('shutdown');
	}
?>
