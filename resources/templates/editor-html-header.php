<header>
	<div id="header-wrapper">

	<div class="intro">
		<div class="logo">
			<a class="logo-anchor" href="feed.php">scribbble.io</a>
		</div>

		<div class="new-scrib">
			<a id="scribe-save" href="#">save</a>
			<a id="scribe-private" href="#">make private</a>
			<a id="share" href="#">share</a> 
		</div>
	</div>

	<ul class="user">
		<li><a href="#" class="notification"><span><i class="ion-ios7-bell"></i></span></a></li>
		<li>
			<a class="username" href="profile.php"><?=$me->profile(PDO::FETCH_OBJ)->username?>
			<i class="ion-ios7-arrow-down"></i></a>
	 	</li>
	 </ul> 

   </div>

</header>
