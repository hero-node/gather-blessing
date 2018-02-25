var extend = [
]
var extend_debug = [
    '/socket.io/socket.io.js',
    'js/autoRefresh.js',
]
var debug = Hero.getInitData().test;
debug = debug || window.location.href.indexOf('localhost') > -1;

var jss = debug ? extend_debug : extend;
for (var i = 0; i < jss.length; i++) {
	var tmpPath = jss[i];
	Hero.loadScriptSync(tmpPath);
};
       
