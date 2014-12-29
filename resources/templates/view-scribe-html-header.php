<header>
	<div id="header-wrapper">

	<!-- logo and create new scrib -->
	<div class="intro">
		<div class="logo">
			<a class="logo-anchor" href="/">scribbble <span>alpha</span></a>
		</div>

		<div class="new-scrib">
			<a href="/scribe">new</a>
		</div>

		<div class="scribe-options">
			<button id="like-scribe" <?=scribe::liked($id) ? 'class="active"' : ''?> href="#"><i class="ion-heart"></i><span><?=intval(scribe::likes($id))?></span></button>
		</div>
	</div>
	
	<!-- user info in header -->
   	<?php require 'html-header-menu.php'; ?>
   </div>

</header>
