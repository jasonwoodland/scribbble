<header>
	<div id="header-wrapper">

	<!-- logo and create new scrib -->
	<div class="intro">
		<div class="logo">
			<a class="logo-anchor" href="/">scribbble.io <span>alpha</span></a>
		</div>

		<div class="new-scrib" id="save-scribe">
			<button>save</button>
		</div>
	</div>
	
	<!-- user info in header -->
	<ul class="user">
		<li><a href="#" class="notification"><span><i class="ion-ios7-bell"></i></span></a></li>
		<li>
			<a class="username" href="#"><i class="ion-grid"></i></a>

			<ul class="dropdown">
				<li><a href="/<?=USERNAME?>">profile</a></li>
				<li><a href="mailto:timbog80@gmail.com">report bug</a></li>
				<li><a href="/sign-out?session_id=<?=session_id()?>">sign out</a></li>
			</ul>
	 	</li>
	 </ul> 

   </div>

</header>
