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
			if(static::exist('username', $username) || static::exist('email', $email)) 
				throw new Exception('Bad input');
			else {
				$stmt = $db->prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
				$stmt->execute([$username, $email, sha1($password, true)]);
				return TRUE;
			}
		}

		public static function exist($field, $value) {
			global $db;
			$stmt = $db->prepare("SELECT * FROM users WHERE $field = ? LIMIT 1");
			$stmt->execute([$value]);
			$result = $stmt->fetch(PDO::FETCH_OBJ);
			return $result->id;
		}

		public static function recover($id) {
			global $db;
			$stmt = $db->prepare("UPDATE users SET code = ? WHERE id = ?");
			$stmt->execute([secure::token(6), $id]);
		
	}
?>
