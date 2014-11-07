<header>
	<div id="header-wrapper">

	<!-- logo and create new scrib -->
	<div class="intro">
		<div class="logo">
			<a class="logo-anchor" href="/">scribbble.io</a>
		</div>

		<div class="new-scrib">
			<a href="/scribe">new</a>
		</div>
	</div>
	
	<!-- user info in header -->
	<ul class="user">
		<li><a href="#" class="notification"><span><i class="ion-ios7-bell"></i></span></a></li>
		<li>
			<a class="username" href="/profile">jasonwoodland<?=$me->profile(PDO::FETCH_OBJ)->username?><i class="ion-ios7-arrow-down"></i></a>

			<ul class="dropdown">
				<div class="dropdown-profile-img">
					<img src="#" alt="#">
				</div>

				<div class="dropdown-nav">
					<li><a href="#">jasonwoodland</a></li>
					<li class="scribe-count"><a href="#"><span class="number-scribes">4</span><br>scribes</a></li>
				</div>
			</ul>
	 	</li>
	 </ul> 

   </div>

</header>
