<?php
	define('ROLE', 'feed');
	define('TITLE', 'trendy');
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
				<a class="active" href="#">trendy</a>
				<a href="/recent">recent</a>
			</div>
		</div>
	</div>

	<!-- show all featured -->
	<div class="container12 profile-container">
		<div class="row">
			<?php
				$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
				$stmt = $db->prepare('SELECT * FROM scribes scribe WHERE DATEDIFF(CURDATE(), time_created) < 7 ORDER BY (SELECT COUNT(*) FROM likes WHERE scribe = scribe.id) DESC, id DESC LIMIT ?,8');
				$stmt->execute([($pageNo - 1) * 8]);
				$scribes = $stmt->fetchAll(PDO::FETCH_OBJ);
				foreach($scribes as $scribe) {
					$page = '<!DOCTYPE html><html><head>';
					$page .= '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>';
					$page .= '<style type="text/css">' . $scribe->css . '</style>';
					$page .= '<style type="text/css">body{overflow:hidden!important}</style>';
					$page .= '</head><body>';
					$page .= $scribe->html;
					$page .= '<script src="data:text/javascript;base64,' . base64_encode($scribe->js) . '"></script>';
					$page .= '</body></html>';
					$page = base64_encode($page);
					?>
					<div class="column3">
						<iframe src="data:text/html;base64,<?=$page?>" width=530px height=440px frameborder=0></iframe>

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
				$stmt = $db->prepare('SELECT COUNT(*) FROM scribes scribe WHERE DATEDIFF(CURDATE(), time_created) < 7 ORDER BY (SELECT COUNT(*) FROM likes WHERE scribe = scribe.id)');
				$stmt->execute();
				if($stmt->fetchColumn() > $pageNo * 8) { ?>
					<a href="/trendy/<?=($pageNo + 1)?>"><i class="ion-ios7-arrow-right"></i></a>
				<?php }
			?>
		</div>
	</div>
</div>
