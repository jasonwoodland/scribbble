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
	$me = new user($_POST['username']);
	if($me->create($_POST['email'], $_POST['password'])) {
		$verificationCode = $me->newVerificationCode();	
		$letter = new mailer();
		$letter->to			= $_POST['email'];
		$letter->subject	= 'Verify your account';
		$letter->message	= service::execute('../resources/templates/mail-sign-up.php');
		$letter->send();
		echo 'TRUE';
	} else echo 'FALSE';
?>

