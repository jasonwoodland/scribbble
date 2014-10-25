<header>
	<div id="header-wrapper">

	<!-- logo and create new scrib -->
	<div class="intro">
		<div class="logo">
			<a class="logo-anchor" href="feed.php">scribbble.io</a>
		</div>

		<div class="new-scrib">
			<a href="../../editor.php">new <i class="ion-ios7-arrow-right"></i></a>
		</div>
	</div>
	
	<!-- user info in header -->
	<ul class="user">
		<li><a href="#" class="notification"><span>4</span></a></li>
		<li>
			<a class="username" href="profile.php"><?=$me->profile(PDO::FETCH_OBJ)->username?>
			<i class="ion-ios7-arrow-down"></i></a>
	 	</li>
	 </ul> 

   </div>

</header>
