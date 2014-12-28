<header>
	<div id="header-wrapper">

	<!-- logo and create new scrib -->
	<div class="intro">
		<div class="logo">
			<a class="logo-anchor" href="/">scribbble.io <span>alpha</span></a>
		</div>

		<div class="new-scrib" id="save-scribe">
			<button>save</button>
		</div>

		<div class="scribe-options">
			<button id="like-scribe" <?=scribe::liked($id) ? 'class="active"' : ''?> href="#"><i class="ion-heart"></i><span><?=intval(scribe::likes($id))?></span></button>
			<button id="delete-scribe">delete</button>
		</div>
	</div>
	
	<!-- user info in header -->
	<?php require 'html-header-menu.php'; ?>
   </div>

</header>
