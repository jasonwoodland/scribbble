<?php
require 'resources/controller.php';

$letter = new email();
$letter->to			= 'jasonwoodland@me.com';
$letter->subject	= 'Confirmation message';
ob_start();
require 'resources/templates/mail-sign-up.php';
$letter->message	= ob_get_clean();
$letter->send();
echo 'ok';
