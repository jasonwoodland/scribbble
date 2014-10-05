<?php
	define('ROLE', 'scrib');
	define('HTML_HEADER', 'editor-html-header.php');
	define('NO_HTML_FOOTER', TRUE);
	define('TITLE', 'Scrib');
	require 'resources/controller.php';
?>

<div id="content-wrapper">

	<div class="edit-container">
		<div class="row">
			<div class="html block">
				<textarea>html</textarea>
				<i class="fa fa-ellipsis-v resize-html"></i>
			</div>
			<div class="css block">
				<textarea>css</textarea>
			</div>
			<div class="js block">
				<textarea>js</textarea>
				<i class="fa fa-ellipsis-v resize-js"></i>
			</div>
		</div>
	</div>
</div>
