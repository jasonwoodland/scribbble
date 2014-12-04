<?php
	require 'resources/controller.php';
	$id = intval(substr($_SERVER['PATH_INFO'], 1));
	define('ROLE', 'editor');
	define('NO_HTML_FOOTER', TRUE);
	define('TITLE', '');
	
	$owner = scribe::owner($id);

	if(!$id)
		define('HTML_HEADER', 'new-scribe-html-header.php');
	else if($owner == USER_ID || $owner == NULL) 
		define('HTML_HEADER', 'scribe-html-header.php');
	else
		define('HTML_HEADER', 'view-scribe-html-header.php');

	define('NO_HTML_FOOTER', TRUE);
	require 'resources/controller.php';

	$stmt = $db->prepare('SELECT html, css, js FROM scribes WHERE id = ?');
	$stmt->execute([$id]);
	$result = $stmt->fetch(PDO::FETCH_OBJ);
?>

<div id="editor-layout">
	<div class="html block" id="html-pane">
		<div class="editor-info">
			<ul class="editor-settings">
				<li class="active" data-syntax="html"><span>HTML</span>
				<li data-syntax="haml"><span>HAML</span>
				<li data-syntax="jade"><span>JADE</span>
			</ul>
		</div>
	</div>

	<div class="css block" id="css-pane">
		<div class="editor-info">
			<ul class="editor-settings">
				<li class="active" data-syntax=""><span>CSS</span>
				<li data-syntax="scss"><span>SCSS</span>
			</ul>
		</div>
	</div>

	<div class="js block" id="js-pane">
		<div class="editor-info">
			<ul class="editor-settings">
				<li class="active" data-syntax="javascript"><span>JavaScript</span>
				<li data-syntax="coffeescript"><span>CoffeeScript</span>
			</ul>
		</div>
	</div>
	<div id="v-drag"><i class="ion-drag"></i></div>
</div>
<iframe width=100% frameborder=0 id="sandbox-buffer"></iframe>
<iframe width=100% frameborder=0 id="sandbox"></iframe>
<script src="/js/haml.js"></script>
<script src="/js/coffee-script.js"></script>
<script src="/js/jade.js"></script>
<script src="/js/sass.js"></script>
<style>
	#editor-layout .block .editor-info {
		position: absolute;
		bottom: 10px;
		top: auto;
		color: #fff;
		background: none;
		border: 0;
		opacity: 1;
	}

	#editor-layout .block .editor-info:hover {
		opacity: 1;
	}

	.editor-info ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.editor-info ul li {
		display: inline-block;
		padding: 0 10px;
		opacity: .25;
		transition: all .25s ease;
	}

	.editor-info ul li:hover,
	.editor-info ul li.active {
		opacity: .5;
	}

	.editor-info ul:not(.open) li:not(.active) {
		width: 0 !important;
		padding: 0;
		visibility: hidden;
		opacity: 0;
	}


	#sandbox, #sandbox-buffer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
	}

	#editor-layout {
		position: relative;
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

	#v-drag {
		position: absolute;
		left: 50%;
		width: 32px;
		margin-left: -16px;
		color: #fff;
		z-index: 100;
		opacity: .5;
		height: 20px;
		line-height: 20px;
		transition: opacity 250ms ease;
	}

	#v-drag:hover,
	#v-drag:active {
		opacity: 1;
	}
</style>
<script>
	window.id		= <?=$id?>;
	window.html		= '<?=base64_encode($result->html)?>';
	window.css		= '<?=base64_encode($result->css)?>';
	window.js		= '<?=base64_encode($result->js)?>';
</script>
