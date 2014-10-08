<?php
	define('ROLE', 'editor');
	define('TITLE', 'Editor');
	define('HTML_HEADER', 'editor-html-header.php');
	define('NO_HTML_FOOTER', TRUE);
	require 'resources/controller.php';
?>

<div id="editor-layout">
	<div class="html block">
		<textarea name="" id="html" cols="30" rows="10"></textarea>
	</div>

	<div class="css block">
		<textarea name="" id="css" cols="30" rows="10"></textarea>
	</div>

	<div class="js block">
		<textarea name="" id="js" cols="30" rows="10"></textarea>
	</div>
</div>