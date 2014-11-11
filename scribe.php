<?php
	define('ROLE', 'editor');
	define('TITLE', '');
	define('HTML_HEADER', 'editor-html-header.php');
	define('NO_HTML_FOOTER', TRUE);
	require 'resources/controller.php';

	$id = intval(substr($_SERVER['PATH_INFO'], 1));

	$stmt = $db->prepare('SELECT html, css, js FROM scribes WHERE id = ?');
	$stmt->execute([$id]);
	$result = $stmt->fetch(PDO::FETCH_OBJ);
?>

<div id="editor-layout">
	<div class="html block" id="html-pane">
		<div class="editor-info">
			<div class="editor-settings">
				<p>html</p>

				<a href="#">
					<i class="ion-gear-a"></i>
				</a>
			</div>
		</div>
	</div>

	<div class="css block" id="css-pane">
		<div class="editor-info">
			<div class="editor-settings">
				<p>css</p>

				<a href="#">
					<i class="ion-gear-a"></i>
				</a>
			</div>
		</div>
	</div>

	<div class="js block" id="js-pane">
		<div class="editor-info">
			<div class="editor-settings">
				<p>js</p>

				<a href="#">
					<i class="ion-gear-a"></i>
				</a>
			</div>
		</div>
	</div>
</div>
<iframe width=100% frameborder=0 id="sandbox-buffer"></iframe>
<iframe width=100% frameborder=0 id="sandbox"></iframe>
<style>
	#sandbox, #sandbox-buffer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
	}

	#editor-layout .block {
		height: auto;
		border: 0 !important;
		position: absolute;
		width: 33.4% !important;
	}

	#editor-layout .block .CodeMirror {
		height: auto;
	}

	#html-pane {
		left: 0 !important;
	}

	#css-pane {
		left: 33.3% !important;
	}

	#js-pane {
		right: 0 !important;
	}
</style>
<script>
	window.id		= <?=$id?>;
	window.html		= '<?=base64_encode($result->html)?>';
	window.css		= '<?=base64_encode($result->css)?>';
	window.js		= '<?=base64_encode($result->js)?>';
</script>
