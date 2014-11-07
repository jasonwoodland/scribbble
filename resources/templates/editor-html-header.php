<header>
	<div id="header-wrapper">

	<!-- logo and create new scrib -->
	<div class="intro">
		<div class="logo">
			<a class="logo-anchor" href="/">scribbble.io</a>
		</div>

		<div class="new-scrib" id="save-scribe">
			<a href="#">save</a>
		</div>
	</div>
	
	<!-- user info in header -->
	<ul class="user">
		<li><a href="#" class="notification"><span><i class="ion-ios7-bell"></i></span></a></li>
		<li>
			<a class="username" href="/profile"><?=$me->profile(PDO::FETCH_OBJ)->username?></a>
	 	</li>
	 </ul> 

   </div>

</header>
