<?php
	require '../resources/controller.php';
	$thumb = new Imagick($_FILES['photo']['tmp_name']);
	$thumb->cropThumbnailImage(128,128);
	$thumb->setFormat('jpeg');
	$thumb->stripImage();
	$thumb->setImageCompression(imagick::COMPRESSION_JPEG);
	$thumb->setImageCompressionQuality(85);
	$thumb->writeImage('../images/users/' . USERNAME . '.jpg');
	error_log('YAYAYA');
?>

