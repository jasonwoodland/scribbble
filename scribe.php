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

	$stmt = $db->prepare('SELECT * FROM scribes WHERE id = ?');
	$stmt->execute([$id]);
	$result = $stmt->fetch(PDO::FETCH_OBJ);
?>
<style>
body {
	overflow: hidden;
}
</style>
<div id="editor-layout">
	<div class="html block" id="html-pane">
		<div class="editor-info">
			<ul class="editor-settings">
				<li data-syntax="html"><span>HTML</span>
				<li data-syntax="haml"><span>HAML</span>
				<li data-syntax="jade"><span>JADE</span>
			</ul>
		</div>
	</div>

	<div class="css block" id="css-pane">
		<div class="editor-info">
			<ul class="editor-settings">
				<li data-syntax="css"><span>CSS</span>
				<li data-syntax="scss"><span>SCSS</span>
			</ul>
		</div>
	</div>

	<div class="js block" id="js-pane">
		<div class="editor-info">
			<ul class="editor-settings">
				<li data-syntax="javascript"><span>JavaScript</span>
				<li data-syntax="coffeescript"><span>CoffeeScript</span>
			</ul>
		</div>
	</div>
	<div id="v-drag"><i class="ion-drag"></i></div>
</div>

<div class="username-in-editor">
	<a href="#">username</a>
</div>
<iframe sandbox="allow-scripts" width=100% frameborder=0 id="sandbox-buffer"></iframe>
<iframe sandbox="allow-scripts" width=100% frameborder=0 id="sandbox"></iframe>
<script src="/js/haml.js"></script>
<script src="/js/coffee-script.js"></script>
<script src="/js/jade.js"></script>
<script src="/js/sass.js"></script>
<script>
	id	= <?=$id?>;
	html	= '<?=base64_encode($result->html)?>';
	css	= '<?=base64_encode($result->css)?>';
	js	= '<?=base64_encode($result->js)?>';
	var settings = {
		html:	'<?=$result->html_preprocessor?>' || 'html',
		css:	'<?=$result->css_preprocessor?>' || 'css',
		js:		'<?=$result->js_preprocessor?>' || 'javascript'
	};
</script>
