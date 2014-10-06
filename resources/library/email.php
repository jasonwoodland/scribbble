<?php
	class email{
		public $to;
		public $subject;
		public $message;

		public function send() {
			$header =				'From: scribbble <no-reply@scribbble.io>';
			$header .= PHP_EOL .	'MIME-Version: 1.0';
			$header .= PHP_EOL .	'Content-Type: text/html; charset=UTF-8';
			mail(
				$this->to, 
				$this->subject, 
				$this->message,
				$header);
		}
	}
?>

