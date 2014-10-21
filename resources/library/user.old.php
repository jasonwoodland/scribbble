<?php
	class user {
		public static function getInfo($id, $style) {
			global $db;
			$stmt = $db->prepare('SELECT * FROM users WHERE id = ?');
			$stmt->execute($id);
			return $stmt->fetch($style);
		}

		public static function create($username, $email, $password) {
			global $db;
			if(static::find('username', $username) || static::find('email', $email)) 
				throw new Exception('Bad input');
			else {
				$stmt = $db->prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
				$stmt->execute([$username, $email, sha1($password, true)]);
				return TRUE;
			}
		}

		public static function find($field, $value) {
			global $db;
			$stmt = $db->prepare("SELECT id FROM users WHERE $field = ? LIMIT 1");
			$stmt->execute([$value]);
			$result = $stmt->fetch(PDO::FETCH_OBJ);
			return $result->id;
		}

		public static function newVerificationCode($id) {
			global $db;
			$verificationCode = secure::token(6);
			$stmt = $db->prepare('UPDATE users SET verification_code = ? WHERE id = ?');
			$stmt->execute([$verificationCode, $id]);
			return $verificationCode;
		}	

		public static function verify($verificationCode) {
			global $db;
			$stmt = $db->prepare('UPDATE users SET verification_code = NULL WHERE verification_code = ?');
			$stmt->execute([$verificationCode]);
			return $stmt->rowCount() == 1;
		}

		public static function validate($username, $password) {
			global $db;
			$stmt = $db->prepare('SELECT id FROM users WHERE username = ? AND password = ?');
			$stmt->execute([$username, sha1($password, true)]);
			$result = $stmt->fetch(PDO::FETCH_OBJ);
			return $result->id;
		}
	}
?>
