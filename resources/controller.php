<?php
	if(session_status() == PHP_SESSION_NONE) {
		function __autoload($class) {
			include_once "library/$class.php";
		}
		session_set_cookie_params(3600 * 24 * 14);
		session_start();
		define('AUTHENTICATED', $_SESSION['authenticated']);
		define('USERNAME', $_SESSION['username']);
		define('PDO_HOST',		'localhost');
		define('PDO_DBNAME',	'scribbble');
		define('PDO_DSN',		sprintf('mysql:host=%s;dbname=%s', PDO_HOST, PDO_DBNAME));
		define('PDO_USERNAME',	'root');
		define('PDO_PASSWORD',	'tb');
		$db = new PDO(PDO_DSN, PDO_USERNAME, PDO_PASSWORD);
		class db {
			function __construct() {
				global $db;
				$this->db = &$db;
			}
		}
		$me = new user(USERNAME);

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
