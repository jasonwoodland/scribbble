<header>
	<div id="header-wrapper">

	<!-- logo and create new scrib -->
	<div class="intro">
		<div class="logo">
			<a class="logo-anchor" href="feed.php">scribbble.io</a>
		</div>

		<div class="new-scrib">
			<a href="/scribe">new <i class="ion-ios7-arrow-right"></i></a>
		</div>
	</div>
	
	<!-- user info in header -->
	<ul class="user">
		<li><a href="#" class="notification"><span><i class="ion-ios7-bell"></i></span></a></li>
		<li><a href="settings.php" class="notification header-options"><span><i class="ion-gear-a"></i></span></a></li>
		<li>
			<a class="username" href="profile.php"><?=$me->profile(PDO::FETCH_OBJ)->username?></a>
	 	</li>
	 </ul> 

   </div>

</header>
