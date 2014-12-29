<?php global $verificationCode; ?>
<html>
	<head>
		<style>
			@font-face {
			  font-family: 'Inconsolata';
			  font-style: normal;
			  font-weight: 400;
			  src: local('Inconsolata'), url(http://fonts.gstatic.com/s/inconsolata/v9/BjAYBlHtW3CJxDcjzrnZCCwlidHJgAgmTjOEEzwu1L8.ttf) format('truetype');
			}
			@font-face {
			  font-family: 'Inconsolata';
			  font-style: normal;
			  font-weight: 700;
			  src: local('Inconsolata Bold'), local('Inconsolata-Bold'), url(http://fonts.gstatic.com/s/inconsolata/v9/AIed271kqQlcIRSOnQH0yTdGNerWpg2Hn6A-BxWgZ_I.ttf) format('truetype');
			}
			body {
				font-family: 'Inconsolata', 'Courier New', courier, monospace;
				font-size: 14px;
				text-align: center;
			}
			div {
				font-weight: bold;
			}
		</style>
	</head>
	<body>
		<div>scribbble.io</div>
		<p>Thanks for signing up!<br>
		To get started <a href="<?=sprintf('http://%s/verify/%s', $_SERVER['SERVER_NAME'], $verificationCode)?>">click here</a>.
	</body>
</html>
