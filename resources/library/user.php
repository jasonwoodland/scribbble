<?php
	class user extends db {
		private $isAuthenticated = FALSE;

		function __construct($username) {
			parent::__construct();
			$this->username = $username;
		}

		public function exist() {
			$stmt = $this->db->prepare('SELECT username FROM users WHERE username = ?');
			$stmt->execute([$this->username]);
			return !!$stmt->rowCount();
		}

		public function profile($style) {
			$stmt = $this->db->prepare('SELECT * FROM users WHERE username = ?');
			$stmt->execute([$this->username]);
			return $stmt->fetch($style);
		}

		public function create($email, $password) {
			if(static::find('username', $this->username) || static::find('email', $email)) 
				return FALSE;
			else {
				$stmt = $this->db->prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
				$stmt->execute([$this->username, $email, sha1($password, true)]);
				return TRUE;
			}
		}

		public static function find($field, $value) {
			global $db;
			$stmt = $db->prepare("SELECT id FROM users WHERE $field = ? LIMIT 1");
			$stmt->execute([$value]);
			return $stmt->rowCount();
			
		}

		public function newVerificationCode() {
			$verificationCode = secure::token(6);
			$stmt = $this->db->prepare('UPDATE users SET verification_code = ? WHERE username = ?');
			$stmt->execute([$verificationCode, $this->username]);
			return $verificationCode;
		}	

		public function verify($verificationCode) {
			$stmt = $this->db->prepare('UPDATE users SET verification_code = NULL WHERE verification_code = ?');
			$stmt->execute([$verificationCode]);
			return $stmt->rowCount() == 1;
		}

		public function authenticate($password) {
			$stmt = $this->db->prepare('SELECT id FROM users WHERE username = ? AND password = ? AND verification_code IS NULL');
			$stmt->execute([$this->username, sha1($password, true)]);
			$this->isAuthenticated = $stmt->rowCount() == 1;
			return $this->isAuthenticated;
		}

		public function authenticated() {
			return $this->isAuthenticated;
		}
	}
?>
