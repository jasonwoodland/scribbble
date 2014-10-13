<header>
	<div id="header-wrapper">

	<div class="intro">
		<div class="logo">
			<a href="feed.php">scribbble.io &bullet; beta</a>
		</div>

		<div class="new-scrib">
			<a href="../../editor.php">new</a>
		</div>
	</div>

	<ul class="user">
		<li><a href="#"><span class="notification">3</span></a></li>
		<li>
			<a class="username" href="profile.php"><?=$me->profile(PDO::FETCH_OBJ)->username?><i class="fa fa-angle-down"></i></a>
			
			<ul class="dropdown">
				<li><a href="/editor.php">new</a></li>
				<li><a href="/settings">settings</a></li>
				<li><a href="/sign-out">sign out</a></li>
			</ul>
	 	</li>
	 </ul> 

   </div>

</header>
