<?php
	define('ROLE', 'profile');
 	define('TITLE', 'Profile');
	require 'resources/controller.php';

	$stmt = $db->prepare('SELECT count(*) FROM scribes WHERE owner = ?');
	$stmt->execute([USER_ID]);
	$scribeCount = $stmt->fetchColumn();
	$followingCount = 0;
	$followersCount = 0;


	$pageNo = intval(substr($_SERVER['PATH_INFO'], 1));
	if(!$pageNo) {
		$URIPrefix = $_SERVER['REQUEST_URI'] . '/';
		$pageNo = 1;
	}
?>

<div id="content-wrapper">
	<div class="container12">
		<div class="row">
			<div class="column12">
				<a class="profile-image" href="profile">
					<img src="/noface" alt="">
					<style>
						.profile-image { background: transparent !important }
					</style>
				</a>
			</div>
		</div>

		<!-- user img -->

		<div class="row">
			<div class="column12">
				<a class="username" href="#"><?=USERNAME?></a>
				<a class="pro" href="#">pro</a>
				<a class="follow" href="">follow</a>
			</div>
		</div>

		<!-- user info -->

		<div class="row">
			<div class="column12">
				<div class="scribs user-info">
					<a href="#"><span class="user-info-number"><?=$scribeCount?></span><br> scribe<?=$scribeCount == 1 ? '' : 's'?></a>
				</div>
				&middot;
				<div class="following user-info">
					<a href="#"><span class="user-info-number"><?=$followingCount?></span><br> following</a>
				</div>
				&middot;
				<div class="followers user-info">
					<a href="#"><span class="user-info-number"><?=$followersCount?></span><br> follower<?=$followersCount == 1 ? '' : 's'?></a>
				</div>
			</div>
		</div>
	</div>

	<!-- user scribs -->

	<div class="container12 profile-container">
		<div class="row">
			<?php
				$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
				$stmt = $db->prepare('SELECT id, html, css, js FROM scribes WHERE owner = ? ORDER BY id DESC LIMIT ?,8');
				$stmt->execute([USER_ID, ($pageNo - 1) * 8]);
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
							<a class="view-scrib" href="/scribe/<?=$scribe->id?>">view</a>
						</div>
					</div>
				<?php } ?>
		</div>

		<div class="arrows">
			<a href="<?=($pageNo == 2 ? '.' : $URIPrefix . ($pageNo - 1))?>"><i class="ion-ios7-arrow-left"></i></a>
			<a href="<?=$URIPrefix . ($pageNo + 1)?>"><i class="ion-ios7-arrow-right"></i></a>
		</div>
	</div>

</div>
