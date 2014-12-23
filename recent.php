<?php
	define('ROLE', 'feed');
	define('TITLE', 'recent');
	require 'resources/controller.php';

	$pageNo = intval(substr($_SERVER['PATH_INFO'], 1));
	if(!$pageNo) {
		$URIPrefix = $_SERVER['REQUEST_URI'] . '/';
		$pageNo = 1;
	}
?>
<div id="content-wrapper">

	<!-- feed type choice -->
	<div class="container12">
		<div class="row">
			<div class="column12 explore">
				<a href="/">trendy</a>
				<a class="active" href="#">recent</a>
				<a href="/following">following</a>
			</div>
		</div>
	</div>

	<!-- show all featured -->
	<div class="container12 profile-container">
		<div class="row">
			<?php
				$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
				$stmt = $db->prepare('SELECT * FROM scribes scribe WHERE DATEDIFF(CURDATE(), time_created) < 7 ORDER BY id DESC LIMIT ?,8');
				$stmt->execute([($pageNo - 1) * 8]);
				$scribes = $stmt->fetchAll(PDO::FETCH_OBJ);
				foreach($scribes as $index => $scribe) { ?>
					<script>
						html = atob('<?=base64_encode($scribe->html)?>');
						css = atob('<?=base64_encode($scribe->css)?>');
						js = atob('<?=base64_encode($scribe->js)?>');
						<?php
							switch($scribe->html_preprocessor) {
								case 'jade':
									?>
										html = jade.compile(html);
										html = html();
									<?php
									break;
								case 'haml':
									?>
										html = haml.compileHaml({source: html, generator: 'coffeescript'});
										html = html();
									<?php
							}
							
							switch($scribe->css_preprocessor) {
								case 'scss':
									?>
										css = Sass.compile(css);
									<?php
							}
							
							switch($scribe->js_preprocessor) {
								case 'scss':
									?>
										js = CoffeeScript.compile(js, {bare: true});;
									<?php
							}
						?>
						page = '<!DOCTYPE html><html><head>';
						page += '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js">\x3C/script>';
						page += '<style>' + css + '</style>';
						page += '</head><body bgcolor="white">';
						page += html;
						page += '<script>' + js + '\x3C/script>';
						page += '</body></html>';
						blob = new Blob([page], {type: 'text/html'});
						scribes[<?=$index?>] = URL.createObjectURL(blob);
					</script>
					<div class="column3">
						<iframe sandbox="allow-scripts" data-index=<?=$index?> width=530px height=440px frameborder=0></iframe>

						<div class="scrib-pop">
							<a class="view-scrib" href="/scribe/<?=$scribe->id?>"></a>
							<a class="created-by" href="/<?=user::username($scribe->owner)?>"><?=user::username($scribe->owner)?></a>
							
							<!-- <button class="scribe-heart-preview" href="#"><i class="ion-heart"></i></button> -->
						</div>
					</div>
				<?php } ?>

		</div>

		<div class="arrows">
			<?php
				if($pageNo != 1) { ?>
					<a href="<?=($pageNo == 2 ? '/' : $URIPrefix . ($pageNo - 1))?>"><i class="ion-ios7-arrow-left"></i></a>
				<?php }
				$stmt = $db->prepare('SELECT COUNT(*) FROM scribes scribe WHERE DATEDIFF(CURDATE(), time_created) < 7');
				$stmt->execute();
				if($stmt->fetchColumn() > $pageNo * 8) { ?>
					<a href="/recent/<?=($pageNo + 1)?>"><i class="ion-ios7-arrow-right"></i></a>
				<?php }
			?>
		</div>
	</div>
</div>
