var path = nw.require('path');
var restart = function() {
	var child, child_process, win,
		executable = process.execPath;
	child_process = nw.require("child_process");
	win = nw.Window.get();

	child = child_process.spawn(executable, ['--restart'], { detached: true, cwd: path.dirname(executable) });
	child.unref();

	win.hide();
	nw.App.quit();
};