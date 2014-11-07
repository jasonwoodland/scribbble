<header>
	<div id="header-wrapper">

	<!-- logo and create new scrib -->
	<div class="intro">
		<div class="logo">
			<a class="logo-anchor" href="/">scribbble.io</a>
		</div>

<<<<<<< HEAD
		<div class="new-scrib" id="scribe-save">
			<a href="#">save <i class="ion-ios7-arrow-right"></i></a>
=======
		<div class="new-scrib" id="save-scribe">
			<a href="#">save</a>
>>>>>>> f021d9a091587110a5cee71c94e5e2d66e0a41e7
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
