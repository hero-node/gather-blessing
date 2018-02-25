var apis = [
    '/fag/recv--->http://116.62.211.199'
];
var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var app = express();
var server = http.createServer(app);
var proxy = require('express-http-proxy');

for (var i = 0; i < apis.length; i++) {
    var items = apis[i];

    if (items.split('--->').length === 2) {
        console.log(items.split('--->')[0] + items.split('--->')[1]);
        app.use(items.split('--->')[0], proxy(items.split('--->')[1], {
            forwardPath: function (req, res) {
                return items.split('--->')[0] + require('url').parse(req.url).path;
            }
        }));
    }
}


app.use('/', express.static('./', {
    maxAge: 0
}));
var sockets = [];

fs.watch('./', (eventType, filename) => {
    for (var i = 0; i < sockets.length; i++) {
        var socket = sockets[i];

        socket.emit('message', { command: 'refresh' });
    }
});
fs.watch('./js', (eventType, filename) => {
    for (var i = 0; i < sockets.length; i++) {
        var socket = sockets[i];

        socket.emit('message', { command: 'refresh' });
    }
});
var socketProcess = function (socket) {
    sockets.push(socket);
    socket.on('message', function (obj) {
        console.log(obj);
    });
    socket.on('disconnect', function () {
    });
};
var io = require('socket.io')(server);

io.on('connection', socketProcess);

var port = 3000;

// app.use('/pages', express.static(path.resolve(__dirname, 'pages')));

server.listen(port, function () {
    console.log('Server running on http://localhost:' + port);
});
