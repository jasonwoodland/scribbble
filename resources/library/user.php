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
			$stmt = $db->prepare('SELECT username, email FROM users WHERE username = ? || email = ?');
			$stmt->execute([$username, $email]);
			$result = $stmt->fetch(PDO::FETCH_OBJ);
			// below line doesnt work if a user is found before a user that matches both username and email. run two SELECT queries to fix this
			if($result->username == $username && $result->email == $email) throw new Exception('Username and email already belong to an account');
			else if($result->username == $username) throw new Exception('Username already in use');
			else if($result->email == $email) throw new Exception('Email already in use');
			else {
				$stmt = $db->prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)');
				$stmt->execute([$username, $email, sha1($password, true)]);
			}
		}
	}
?>
