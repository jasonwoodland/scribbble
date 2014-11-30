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
					<img src="" alt="user pic">
				</a>
			</div>
		</div>
		
		<!-- user full name -->
		<div class="row">
			<div class="column12">
				<a class="username" href="#">jason woodland</a>
			</div>
		</div>

		<!-- user info -->

		<div class="row">
			<div class="column12">
				<div class="scribs user-info">
					<a href="#">scribes 15</a>
				</div>
				&middot;
				<div class="following user-info">
					<a href="#">following 218</a>
				</div>
				&middot;
				<div class="followers user-info">
					<a href="#">followers 1085</a>
				</div>
			</div>
		</div>
		
		<div class="row">
			<div class="column12">
				<div class="user-actions">
					<a class="follow" href="#">follow</a>
					<a class="message" href="#">message</a>
					<a class="block" href="#">block</a>
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

				<div class="scrib-info">
					<a href="#"><i class="fa fa-eye"></i> 300</a>
					<a href="#"><i class="fa fa-comment"></i> 10</a>
				</div>
			</div>
			<div class="column3">
				<div class="scrib-pop">
					<a class="view-scrib" href="#">view</a>
				</div>

				<div class="scrib-info">
					<a href="#"><i class="fa fa-eye"></i> 300</a>
					<a href="#"><i class="fa fa-comment"></i> 10</a>
				</div>
			</div>
			<div class="column3">
				<div class="scrib-pop">
					<a class="view-scrib" href="#">view</a>
				</div>

				<div class="scrib-info">
					<a href="#"><i class="fa fa-eye"></i> 300</a>
					<a href="#"><i class="fa fa-comment"></i> 10</a>
				</div>
			</div>
			<div class="column3">
				<div class="scrib-pop">
					<a class="view-scrib" href="#">view</a>
				</div>

				<div class="scrib-info">
					<a href="#"><i class="fa fa-eye"></i> 300</a>
					<a href="#"><i class="fa fa-comment"></i> 10</a>
				</div>
			</div>
		</div>
	</div>
</div>
