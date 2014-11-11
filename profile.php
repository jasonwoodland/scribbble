<?php
	define('ROLE', 'profile');
 	define('TITLE', 'Profile');
	require 'resources/controller.php';

	$stmt = $db->prepare('SELECT count(*) FROM scribes WHERE owner = ?');
	$stmt->execute([USER_ID]);
	$scribeCount = $stmt->fetchColumn();
	$followingCount = 0;
	$followersCount = 0;
?>

<div id="content-wrapper">
	<div class="container12">
		<div class="row">
			<div class="column12">
				<a class="profile-image" href="#">
					<img src="/noface" alt="">
<<<<<<< HEAD
=======
					<style>
						.profile-image { background: transparent!important }
					</style>
>>>>>>> 9bf4dfd89e52928aba1f5955619f9f7002c7e135
				</a>
			</div>
		</div>

		<!-- user img -->

		<div class="row">
			<div class="column12">
				<a class="username" href="#"><?=USERNAME?></a>
				<a class="pro" href="#">pro</a>
			</div>
		</div>

		<!-- user info -->

		<div class="row">
			<div class="column12">
				<div class="scribs user-info">
					<a href="#"><span class="user-info-number"><?=$scribeCount?></span><br> scrib<?=$scribeCount == 1 ? '' : 's'?></a>
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
				$stmt = $db->prepare('SELECT id, html, css, js FROM scribes WHERE owner = ? ORDER BY id DESC');
				$stmt->execute([USER_ID]);
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
			<a href="#"><i class="ion-ios7-arrow-left"></i></a>
			<a href="#"><i class="ion-ios7-arrow-right"></i></a>
		</div>
	</div>
</div>
