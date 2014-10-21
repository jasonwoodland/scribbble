<?php
	class secure {
		public static function token($length) {
			return substr(bin2hex(openssl_random_pseudo_bytes($length)), 0, $length);
		}
	}
?>
