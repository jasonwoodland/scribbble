<?php
require '../resources/controller.php';
/*try {
	$stmt = $db->prepare('INSERT INTO users (username, email, password) VALUES (:username, :email, :password)');
	var_dump($_POST);
	$stmt->bindValue(':username', $_POST['username']);
	$stmt->bindValue(':email', $_POST['email']);
	$stmt->bindValue(':password', $_POST['password']);
	$stmt->execute();

	$stmt = $db->prepare('SELECT * FROM users');
	$stmt->execute();
//	var_dump($stmt->fetchAll());

}
catch(PDOException $e)
{
echo $e->getMessage();
}
 */

try {
	user::create($_POST['username'], $_POST['email'], $_POST['password']);
} catch(Exception $e) {
	echo $e->getMessage();
}
?>

