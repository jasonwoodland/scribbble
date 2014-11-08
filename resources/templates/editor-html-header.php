<header>
	<div id="header-wrapper">

	<!-- logo and create new scrib -->
	<div class="intro">
		<div class="logo">
			<a class="logo-anchor" href="/">scribbble.io <span>beta</span></a>
		</div>

		<div class="new-scrib" id="save-scribe">
			<a href="#">save</a>
		</div>

		<div class="like-scribe">
			<a href="#"><i class="ion-heart"></i></a>
		</div>
	</div>
	
	<!-- user info in header -->
	<ul class="user">
		<li><a href="#" class="notification"><span><i class="ion-ios7-bell"></i></span></a></li>
		<li>
			<a class="username" href="/profile"><?=$me->profile(PDO::FETCH_OBJ)->username?><i class="ion-ios7-arrow-down"></i></a>
	 	</li>
	 </ul> 

   </div>

</header>
