<?php
	define('ROLE', 'profile');
 	define('TITLE', 'Profile');
	require 'resources/controller.php';
?>

<div id="content-wrapper">
	<div class="container12">
		<div class="row">
			<div class="column12">
				<a class="profile-image" href="#">
					<img src="" alt="">
				</a>
			</div>
		</div>

		<!-- user img -->

		<div class="row">
			<div class="column12">
				<a class="username" href="#">Jason Woodland</a>
			</div>
		</div>

		<!-- user info -->

		<div class="row">
			<div class="column12">
				<div class="scribs user-info">
					<a href="#"><span class="user-info-number">43</span><br> scribs</a>
				</div>
				&middot;
				<div class="following user-info">
					<a href="#"><span class="user-info-number">218</span><br> following</a>
				</div>
				&middot;
				<div class="followers user-info">
					<a href="#"><span class="user-info-number">1085</span><br> followers</a>
				</div>
			</div>
		</div>
	</div>

	<!-- user scribs -->

	<div class="container12 profile-container">
		<div class="row">
			<div class="column3">
				<div class="scrib-pop">
					<a class="view-scrib" href="#">view</a>
				</div>
			</div>

			<div class="column3">
				<div class="scrib-pop">
					<a class="view-scrib" href="#">view</a>
				</div>
			</div>

			<div class="column3">
				<div class="scrib-pop">
					<a class="view-scrib" href="#">view</a>
				</div>
			</div>

			<div class="column3">
				<div class="scrib-pop">
					<a class="view-scrib" href="#">view</a>
				</div>
			</div>
		</div>
	</div>
</div>
