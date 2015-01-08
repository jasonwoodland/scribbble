<script>
	html = atob('<?=base64_encode($scribe->html)?>');
	css = atob('<?=base64_encode($scribe->css)?>');
	js = atob('<?=base64_encode($scribe->js)?>');
	<?php
		switch($scribe->html_preprocessor) {
			case 'jade':
				?>
					html = jade.compile(html);
					html = html();
				<?php
				break;
			case 'haml':
				?>
					html = haml.compileHaml({source: html, generator: 'coffeescript'});
					html = html();
				<?php
		}
		
		switch($scribe->css_preprocessor) {
			case 'scss':
				?>
					css = Sass.compile(css);
				<?php
		}
		
		switch($scribe->js_preprocessor) {
			case 'scss':
				?>
					js = CoffeeScript.compile(js, {bare: true});;
				<?php
		}
	?>
	css = PrefixFree.prefixCSS(css);
	page = '<!DOCTYPE html><html><head>';
	page += '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js">\x3C/script>';
	page += '<script src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js">\x3C/script>';
	page += '<style>body{overflow:hidden!important}</style>';
	page += '<style>' + css + '</style>';
	page += '</head><body bgcolor="white">';
	page += html;
	page += '<script>' + js + '\x3C/script>';
	page += '</body></html>';
	blob = new Blob([page], {type: 'text/html'});
	scribes[<?=$index?>] = URL.createObjectURL(blob);
</script>
<div class="column3">
	<iframe style="volume:silent" sandbox="allow-scripts" data-index=<?=$index?> width=530px height=440px frameborder=0></iframe>

	<div class="scrib-pop">
		<a class="view-scrib" href="/scribe/<?=$scribe->id?>"></a>
		<a class="created-by" href="/<?=user::username($scribe->owner)?>"><?=user::username($scribe->owner)?></a>
		
		<!-- <button class="scribe-heart-preview" href="#"><i class="ion-heart"></i></button> -->
	</div>
</div>
