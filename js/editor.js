var 
	updateTimeout, 
	url, 
	editorHeight, 
	windowHeight, 
	buttonOffset, 
	headerHeight;

$(window).ready(function() {
	options = {
		theme: 'base16-dark',
		lineNumbers: true,
		styleActiveLine: true,
		matchBrackets: true,
		indentWithTabs: true,
		indentUnit: 4,
		smartIndent: false,
		lineWrapping: true
	};
	htmlOptions = $.extend(true, {}, options);
	cssOptions = $.extend(true, {}, options);
	jsOptions = $.extend(true, {}, options);

	htmlOptions.htmlMode = true;
	htmlOptions.mode = 'xml';
	cssOptions.mode = 'css';
	jsOptions.mode = 'javascript';

	htmlPane = CodeMirror($('#html-pane')[0], htmlOptions);
	cssPane = CodeMirror($('#css-pane')[0], cssOptions);
	jsPane = CodeMirror($('#js-pane')[0], jsOptions);

	if(window.id) {
		htmlPane.setValue(atob(window.html));
		cssPane.setValue(atob(window.css));
		jsPane.setValue(atob(window.js));
	}

	$('.editor-settings li').on('click', function(e) {
		if($(this).parent().hasClass('open'))
			e.stopPropagation();
		$('.editor-settings').removeClass('open')
		$(this).addClass('active').siblings().removeClass('active');
		syntax = $(this).data('syntax');
		switch(syntax) {
			case 'html':
			case 'haml':
			case 'jade':
				settings.html = syntax;
				break;
			case 'css':
			case 'scss':
				settings.css = syntax;
				break; 
			case 'javascript':
			case 'coffeescript':
				settings.js = syntax;
				break;
		}
		
		$('#html-pane').trigger('input');
	});

	$('.editor-settings li').each(function() {
		$(this).width(
			$(this).find('span').width()
		);
	});

	$('.editor-settings').on('click', function() {
		$('.editor-settings').removeClass('open');
		$(this).addClass('open');
	});

	$('#html-pane, #css-pane, #js-pane').bind('input propertychange cursorActivity keyup', function() {
		clearTimeout(updateTimeout);
		updateTimeout = setTimeout(function(){updateSandbox()}, 500);
	}).on('keydown', function(e) {
		key = e.keyCode || e.charCode;
		if(key == 8 || key == 46) $(this).trigger('input');
	});
	   
	function updateSandbox() {
		html = htmlPane.getValue();
		css = cssPane.getValue();
		js = jsPane.getValue();

		switch(settings.html) {
			case 'jade':
				html = jade.compile(html);
				html = html();
				break;
			case 'haml':
				html = haml.compileHaml({source: html});
				html = html();
		}

		switch(settings.css) {
			case 'scss':
				css = Sass.compile(css);
		}

		switch(settings.js) {
			case 'coffeescript':
				js = CoffeeScript.compile(js, {bare: true});
		}

		page = '<!DOCTYPE html><html><head>';
		page += '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>';
		page += '<style>' + css + '</style>';
		page += '</head><body bgcolor="white">';
		page += html;
		page += '<script>' + js + '</script>';
		page += '</body></html>';
		blob = new Blob([page], {type: 'text/html'});
		url = URL.createObjectURL(blob);
		$('#sandbox').css({
			opacity: 0
		}).prop('src', url);
	}

	updateSandbox();

	$('#sandbox').load(function() {
		$('#sandbox').css({
			opacity: 1
		});
		$('#sandbox-buffer').prop('src', url); 
	});

	$('#save-scribe').click(function() {
		console.log('saving...');
		$.post('/api/scribe-save', {
			id: window.id,
			html: htmlPane.getValue(),
			css: cssPane.getValue(),
			js: jsPane.getValue()
		}, function(response) {
			window.id = response;
		});
	});

	$('#delete-scribe').click(function() {
		$.post('/api/scribe-delete', {
			id: window.id
		}, function() {
			window.location = '/' + window.username;
		});
	});

	$('#like-scribe:not(.active)').click(function() {
		$(this).addClass('active');
		likes = $('span.counter span');
		likes.html(parseInt(likes.html()) + 1);
		$.post('/api/scribe-like', {
			id: window.id
		}, function() {
		});
	});

	$('#v-drag').mousedown(function(e) {
		buttonOffset = e.offsetY;
		console.log(e);
		$('iframe').css({
			pointerEvents: 'none'
		});
		$('*').css({
			userSelect: 'none',
			cursor: 'ns-resize'
		});
		$(document).mousemove(function(e) {
			editor = $('#editor-layout .html .CodeMirror');
			console.log(editor.css('padding-top'));
			editorHeight = Math.min(Math.max(3, e.pageY - headerHeight - buttonOffset), $(window).height() - headerHeight - 20);
			windowHeight = $(window).height();
			resizeSandbox();
			console.log('move');
		}).mouseup(function() {
			$(this).off('mousemove');
			$('iframe').css({
				pointerEvents: 'auto'
			});
			$('*').css({
				userSelect: 'text',
				cursor: 'auto'
			});
		});	
	});

	windowHeight = $(window).height();
	editorHeight = windowHeight * .4;
	headerHeight = $('header').outerHeight();
	resizeSandbox();
}).resize(function() {
	if(editorHeight == windowHeight - headerHeight - 20)
		editorHeight = $(window).height() - headerHeight - 20;
	else
		editorHeight = $(window).height() / windowHeight * editorHeight;
	windowHeight = $(window).height();
	editorHeight = Math.min(windowHeight - headerHeight - 20, editorHeight);
	resizeSandbox();
});


function resizeSandbox() {
	$('#editor-layout .block .CodeMirror').height(editorHeight);
	$('#sandbox, #sandbox-buffer').height($(window).height() - $('header').outerHeight() - $('#editor-layout .block .CodeMirror').outerHeight());
	$('#v-drag').css({
		top: editorHeight 
	});
}


