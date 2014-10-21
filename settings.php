<?php
	define('ROLE', 'settings');
 	define('TITLE', 'Settings');
	require 'resources/controller.php';
?>

<div id="content-wrapper">
	<div class="container12">
		<div class="row">
			<div class="column12 explore">
				<a class="active" href="#">profile</a>
				<a href="#">editor</a>
				<a href="#">account</a>
			</div>
		</div>

		<div class="row">
			<div class="column12 image-settings">
				<a class="profile-image" href="#">
					<img src="" alt="">
					<form action="#" method="#">
						<input type="file" title="i">
					</form>
				</a>
			</div>
		</div>


		<div class="row">
			<div class="column12 name">
				<p>full name</p>
				<form action="#" method="#">
					<input type="text" name="name" placeholder="full name">
				</form>
			</div>
		</div>

			
		<div class="row">
			<div class="column12 links-settings">
				<p>social links</p>
				<form action="#" method="#">
					<input type="text" placeholder="portfolio">
					
					<input type="text" placeholder="github">
					
					<input type="text" placeholder="twitter">
				</form>
			</div>
		</div>

		<div class="row">
			<div class="column12 save-all-changes">
				<form action="#" method="#">
					<input type="submit" value="save all changes">
				</form>
			</div>
		</div>
	</div>
</div>