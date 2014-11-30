<?php define('HTML_HEADER', 'html-header.php') ?>
<!DOCTYPE html>
<html>
	<head>
		<title><?=TITLE?><?=TITLE ? ' - ' : ''?>scribbble</title>
		<!-- meta tags -->
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- fonts -->
		<link href='http://fonts.googleapis.com/css?family=Inconsolata:400,700' rel='stylesheet' type='text/css'>
		<!-- font-icons -->
		<link rel="stylesheet" href="http://code.ionicframework.com/ionicons/1.5.2/css/ionicons.min.css">
		<link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
		<!-- styles -->
		<link href="/css/stylesheets/1140.css" media="screen, projection" rel="stylesheet" type="text/css" />
		<link href="/css/codemirror.css" media="screen, projection" rel="stylesheet" type="text/css" />
		<link href="/css/stylesheets/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
		<!-- dependencies -->
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		<script src="/js/main.js"></script>
		<script src="/js/codemirror.js"></script>
		<script src="/js/codemirror/mode/xml/xml.js"></script>
		<script src="/js/codemirror/mode/css/css.js"></script>
		<script src="/js/codemirror/mode/javascript/javascript.js"></script>
		<script>
			window.id = "<?=USER_ID?>";
			window.username = "<?=USERNAME?>";
		</script>
		<?=defined('ROLE') ? sprintf('<script src="/js/%s.js"></script>', ROLE) : null?>
	</head>
	<body>
<?php
	defined('NO_HTML_HEADER') or require defined('USER_ID') ? HTML_HEADER : 'guest-html-header.php';
?>
