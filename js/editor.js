$(window).ready(function() {
	options = {
		theme: 'base16-dark',
		lineNumbers: true,
		styleActiveLine: true,
		matchBrackets: true,
		indentWithTabs: true,
		indentUnit: 4,
		smartIndent: false
	};
	htmlOptions = $.extend(true, {}, options);
	cssOptions = $.extend(true, {}, options);
	jsOptions = $.extend(true, {}, options);

	htmlOptions.htmlMode = true;
	htmlOptions.mode = 'xml';
	cssOptions.mode = 'css';
	jsOptions.mode = 'javascript';
	console.log(htmlOptions, cssOptions, jsOptions)

	htmlPane = CodeMirror($('#html-pane')[0], htmlOptions);
	cssPane = CodeMirror($('#css-pane')[0], cssOptions);
	jsPane = CodeMirror($('#js-pane')[0], jsOptions);
});
