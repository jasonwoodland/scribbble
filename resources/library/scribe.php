<?php
	class scribe extends db {
		private $isAuthenticated = FALSE;

		function __construct($username) {
			parent::__construct();
			$this->username = $username;
		}

		public static function save($id, $html, $css, $js, $html_preprocessor, $css_preprocessor, $js_preprocessor) {
			global $db;
			error_log($id);
			if($id) {
				$stmt = $db->prepare('UPDATE scribes SET html = ?, css = ?, js = ?, html_preprocessor = ?, css_preprocessor = ?, js_preprocessor = ? WHERE id = ?');
				$stmt->execute([$html, $css, $js, $html_preprocessor, $css_preprocessor, $js_preprocessor, $id]);
			} else {
				error_log('INERRTTTTING');
				$stmt = $db->prepare('INSERT INTO scribes (html, css, js, html_preprocessor, css_preprocessor, js_preprocessor, owner) VALUES (?, ?, ?, ?, ?, ?, ?)');
				$stmt->execute([
					$html,
					$css,
					$js,
					$html_preprocessor,
					$css_preprocessor,
					$js_preprocessor,
					USER_ID
				]);
				return $db->lastInsertId();
			}
		}

		public static function delete($id) {
			global $db;
			$stmt = $db->prepare('DELETE FROM scribes WHERE id = ?');
			$stmt->execute([$id]);
		}
		
		public static function likes($id) {
			if(!$id) return false;
			global $db;
			$stmt = $db->prepare('SELECT COUNT(*) FROM likes WHERE scribe = ?');
			$stmt->execute([$id]);
			return $stmt->fetch()[0];
		}

		public static function like($id) {
			global $db;
			if(!static::liked($id)) {
				$stmt = $db->prepare('INSERT INTO likes (scribe, user) VALUES (?, ?)');
				$stmt->execute([
					$id,
					USER_ID
				]);
				return true;
			} else return false;
		}

		public static function liked($id) {
			global $db;
			$stmt = $db->prepare('SELECT COUNT(*) FROM likes WHERE scribe = ? AND user = ?');
			$stmt->execute([
				$id,
				USER_ID
			]);
			return $stmt->fetch()[0];
		}

		public static function owner($id) {
			global $db;
			$stmt = $db->prepare('SELECT owner FROM scribes WHERE id = ?');
			$stmt->execute([$id]);
			return $stmt->fetch()[0];
		}
	}
?>
