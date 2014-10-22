<?php
	define('ROLE', 'editor');
	define('TITLE', 'Editor');
	define('HTML_HEADER', 'editor-html-header.php');
	define('NO_HTML_FOOTER', TRUE);
	require 'resources/controller.php';
?>

<div id="editor-layout">
	<div class="html block" id="html-pane">
		<div class="editor-info">
			<div class="editor-settings">
				<p>html</p>

				<a href="#">
					<i class="ion-ios7-gear"></i>
				</a>
			</div>
		</div>
	</div>

	<div class="css block" id="css-pane">
		<div class="editor-info">
			<div class="editor-settings">
				<p>css</p>

				<a href="#">
					<i class="ion-ios7-gear"></i>
				</a>
			</div>
		</div>
	</div>

	<div class="js block" id="js-pane">
		<div class="editor-info">
			<div class="editor-settings">
				<p>js</p>

				<a href="#">
					<i class="ion-ios7-gear"></i>
				</a>
			</div>
		</div>
	</div>

	
</div>
