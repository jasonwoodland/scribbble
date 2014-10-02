<!DOCTYPE html>
<html>
	<head>
		<title><?=TITLE?> - Scribbble</title>
		<!-- fonts -->
		<link href='http://fonts.googleapis.com/css?family=Inconsolata:400,700' rel='stylesheet' type='text/css'>
		<!-- font-icons -->
		<link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
		<!-- styles -->
		<link href="css/stylesheets/screen.css" media="screen, projection" rel="stylesheet" type="text/css" />
		<link href="css/stylesheets/1140.css" media="screen, projection" rel="stylesheet" type="text/css" />
		<!-- dependencies -->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
		<script src="/js/main.js"></script>
		<?=defined('ROLE') ? sprintf('<script src="%s"></script>', ROLE) : null?>
	</head>
	<body>
		<?php defined('NO_HTML_HEADER') or require 'html-header.php' ?>
