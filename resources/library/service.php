<?php
	class service {
		public static function execute($filename) {
			ob_start();
			require $filename;
			return ob_get_clean();
		}
	}
?>
