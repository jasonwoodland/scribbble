<?php
	define('ROLE', 'settings');
 	define('TITLE', 'Settings');
	require 'resources/controller.php';
?>


<div class="container12">
	<div class="row">
		<div class="column4">
			<form action="#">
				<select>
					<option>html preprocessor</option>
					<option>normal</option>
					<option>markdown</option>
					<option>haml</option>
					<option>slim</option>
				</select>

				<select>
					<option>css preprocessor</option>
					<option>normal</option>
					<option>sass</option>
					<option>scss</option>
					<option>less</option>
					<option>stylus</option>
				</select>

				<select>
					<option>js preprocessor</option>
					<option>cofeescript</option>
					<option>jquery</option>
				</select>
				
				<br>
				<select>
					<option>editor theme</option>
					<option>neo</option>
					<option>twilight</option>
				</select>
			</form>
		</div>
		<div class="column4">
			<form action="#">
				<input type="text" placeholder="firstname">
				<input type="text" placeholder="lastname">
				
				<br>
				<input type="email" placeholder="email">
				
				<br>
				<input type="password" placeholder="current password">
				<input type="password" placeholder="new password">
				<input type="password" placeholder="confirm new password">

				<br>
				<input type="text" placeholder="website">

				<br>
				<input type="button" value="delete account">
			</form>
		</div>
		<div class="column4">
			<form action="#">
				<input type="file" class="custom-file-input">

				<br>
				<input type="button" class="save" value="save all settings">
			</form>
		</div>
	</div>
</div>