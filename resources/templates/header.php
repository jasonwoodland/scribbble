<?php define('HTML_HEADER', 'html-header.php') ?>
<!DOCTYPE html>
<html>
	<head>
		<title><?=TITLE?><?=TITLE ? ' - ' : ''?>scribbble</title>
		<!-- meta tags -->
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- fonts -->
		<link href='http://fonts.googleapis.com/css?family=Source+Code+Pro:200,300,400,500,600,700' rel='stylesheet' type='text/css'>
		<!-- font-icons -->
		<link rel="stylesheet" href="http://code.ionicframework.com/ionicons/1.5.2/css/ionicons.min.css">
		<link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
		<!-- styles -->
		<link href="/css/stylesheets/1140.css" media="screen, projection" rel="stylesheet" type="text/css">
		<link href="/js/codemirror/lib/codemirror.css" media="screen, projection" rel="stylesheet" type="text/css">
		<link href="/js/codemirror/theme/base16-dark.css" media="screen, projection" rel="stylesheet" type="text/css">
		<link href="/css/stylesheets/screen.css" media="screen, projection" rel="stylesheet" type="text/css">
		<!-- dependencies -->
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		<script src="/js/main.js"></script>
		<script src="/js/codemirror/lib/codemirror.js"></script>
		<script src="/js/codemirror/mode/xml/xml.js"></script>
		<script src="/js/codemirror/mode/htmlmixed/htmlmixed.js"></script>
		<script src="/js/codemirror/mode/ruby/ruby.js"></script>
		<script src="/js/codemirror/mode/css/css.js"></script>
		<script src="/js/codemirror/mode/javascript/javascript.js"></script>
		<script src="/js/codemirror/mode/haml/haml.js"></script>
		<script src="/js/codemirror/mode/jade/jade.js"></script>
		<script src="/js/codemirror/mode/sass/sass.js"></script>
		<script src="/js/codemirror/mode/coffeescript/coffeescript.js"></script>
		<!-- preprocessors -->
		<script src="/js/haml.js"></script>
		<script src="/js/coffee-script.js"></script>
		<script src="/js/jade.js"></script>
		<script src="/js/sass.js"></script>
		<!-- api variables -->
		<script>
			window.id = "<?=USER_ID?>";
			window.username = "<?=USERNAME?>";
		</script>

		<?php 
			if(defined('ROLE')) echo(sprintf('<script src="/js/%s.js"></script>', ROLE));
		?>
	</head>
	<body>
	<div id="overlay">&nbsp;</div>

	<?php
		defined('NO_HTML_HEADER') or require defined('USER_ID') ? HTML_HEADER : 'guest-html-header.php';
	?>

	<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*newDate();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create','UA-54948422-2','auto');ga('send','pageview');</script>
