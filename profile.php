<?php
	define('ROLE', 'profile');
 	define('TITLE', 'Profile');
	require 'resources/controller.php';
?>

<div id="content-wrapper">
	<div class="container12">
		<div class="row">
			<div class="column12">
				<a class="profile-image" href="#">
					<img src="" alt="">
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
					<a href="#"><span class="user-info-number">4</span><br> scribs</a>
				</div>
				&middot;
				<div class="following user-info">
					<a href="#"><span class="user-info-number">7</span><br> following</a>
				</div>
				&middot;
				<div class="followers user-info">
					<a href="#"><span class="user-info-number">21</span><br> followers</a>
				</div>
			</div>
		</div>
	</div>

	<!-- user scribs -->

	<div class="container12 profile-container">
		<div class="row">
			<?php
				$stmt = $db->prepare('SELECT id, html, css, js FROM scribes WHERE owner = ?');
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
	</div>
</div>
