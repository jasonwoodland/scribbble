<?php
	define('ROLE', 'profile');
 	define('TITLE', 'profile');
	require 'resources/controller.php';

	$username = explode('/', $_SERVER['REQUEST_URI'])[1];
	$id = user::find('username', $username);

	if(!$id) {
	   	require '404.php';
		exit;
	}

	$pageNo = intval(array_pop(explode('/', $_SERVER['PATH_INFO'])));
	if(!$pageNo) {
		$pageNo = 1;
	}

	$stmt = $db->prepare('SELECT count(*) FROM scribes WHERE owner = ?');
	$stmt->execute([$id]);
	$scribeCount = $stmt->fetchColumn();
	$followingCount = 0;
	$followersCount = 0;

	if($id == USER_ID) { ?>
		<script src="/js/user-photo.js"></script>
	<?php }
?>

<div id="content-wrapper">
	<div class="container12">
		<div class="row">
			<div class="column12">
				<a class="profile-image" id="profile-image" href="profile">
				</a>
				<style>
					#content-wrapper .container12 .row .column12 #profile-image { 
						background-color: #ddd;
						background-image: url(/images/users/<?=$username . '?' . time()?>), url(/noface);
						background-size: cover;
						background-position: center center;
						background-repeat: no-repeat;
						border-radius: 100%;
						transition: .5s ease all;
						position: relative;
						padding-top: 40px;
						text-decoration: none;
						color: #fff;
						text-shadow: 0 0 2px #000;
						box-sizing: border-box;
					}

					#profile-image::after {
						opacity: 0;
						transition: .25s ease opacity;
						content: 'update profile photo';
						position: absolute;
						font-size: 14px;
						padding: 22px 10px 10px;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						background: rgba(0,0,0,.75);
						border-radius: 100%;
						color: #fff;
					}

					#profile-image.drag::after {
						opacity: 1;
					}


				</style>
				<script>
				</script>
			</div>
		</div>


		<!-- user img -->

		<div class="row">
			<div class="column12">
				<a class="username" href="#"><?=$username?></a>
				<a class="pro" href="#">pro</a>
			</div>
		</div>
		
		<!-- follow button -->

		<div class="row">
			<div class="column12">
				<button class="follow-btn">follow</button>
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
					<a href="/following"><span class="user-info-number"><?=$followingCount?></span><br> following</a>
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
				$stmt->execute([$id, ($pageNo - 1) * 8]);
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
							<iframe sandbox="allow-scripts" src="data:text/html;base64,<?=$page?>" width=530px height=440px frameborder=0></iframe>

						<div class="scrib-pop">
							<a class="view-scrib" href="/scribe/<?=$scribe->id?>">view</a>
						</div>
					</div>
				<?php } ?>
		</div>

		<div class="arrows">
			<?php
				if($pageNo != 1) { ?>
					<a href="<?=($pageNo == 2 ? "/$username": "/$username/" . ($pageNo - 1))?>"><i class="ion-ios7-arrow-left"></i></a>
				<?php }
				$stmt = $db->prepare('SELECT COUNT(*) FROM scribes WHERE owner = ?');
				$stmt->execute([$id]);
				if($stmt->fetchColumn() > $pageNo * 8) { ?>
					<a href="<?="/$username/" . ($pageNo + 1)?>"><i class="ion-ios7-arrow-right"></i></a>
				<?php }
			?>
		</div>
	</div>

</div>
