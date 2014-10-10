<?php
	define('ROLE', 'editor');
	define('TITLE', 'Editor');
	define('HTML_HEADER', 'editor-html-header.php');
	define('NO_HTML_FOOTER', TRUE);
	require 'resources/controller.php';
?>

<div id="editor-layout">
	<div class="html block" id="html-pane">
	</div>

	<div class="css block" id="css-pane">
	</div>

	<div class="js block" id="js-pane">
	</div>
</div>
