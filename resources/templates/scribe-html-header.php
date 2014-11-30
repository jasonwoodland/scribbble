<header>
	<div id="header-wrapper">

	<!-- logo and create new scrib -->
	<div class="intro">
		<div class="logo">
			<a class="logo-anchor" href="/">scribbble.io <span>alpha</span></a>
		</div>

		<div class="new-scrib" id="save-scribe">
			<a href="#">save</a>
		</div>

		<div class="scribe-options">
			<a id="like-scribe" <?=scribe::liked($id) ? 'class="active"' : ''?> href="#"><i class="ion-heart"></i></a>
			<span class="counter"><i class="triangle-left"></i><span><?=intval(scribe::likes($id))?></span></span>
			<a id="delete-scribe"href="#"><i class="ion-close-circled"></i></a>
		</div>
	</div>
	
	<!-- user info in header -->
	<ul class="user">
		<li><a href="#" class="notification"><span><i class="ion-ios7-bell"></i></span></a></li>
		<li>
			<a class="username" href="/<?=USERNAME?>"><?=USERNAME?><i class="ion-ios7-arrow-down"></i></a>
	 	</li>
	 </ul> 

   </div>

</header>
