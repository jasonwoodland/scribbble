<header>
	<div id="header-wrapper">

	<!-- logo and create new scrib -->
	<div class="intro">
		<div class="logo">
			<a href="feed.php">scribbble.io</a>
		</div>

		<div class="new-scrib">
			<a href="../../editor.php">new</a>
		</div>
	</div>
	
	<!-- user info in header -->
	<ul class="user">
		<li><a href="#" class="notification"><span>3</span></a></li>
		<li>
			<a class="username" href="profile.php"><?=$me->profile(PDO::FETCH_OBJ)->username?>
			<i class="fa fa-angle-down"></i></a>
	 	</li>
	 </ul> 

   </div>

</header>
