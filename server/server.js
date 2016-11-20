var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/front.css', function(req, res) {
    res.sendFile(__dirname + '/front.css');
});
app.get('/front.js', function(req, res) {
    res.sendFile(__dirname + '/front.js');
});

io.on('connection', function(socket) {

    console.log('a user connected');

    socket.on('change', function(value) {
        // Change temperature
        if (typeof value === "number") {
            value = Math.min(Math.max(value, 0), 100) / 100;
            console.log("turn", value);
            io.emit("turn", value);
        }
    });

});

http.listen(1999, function() {
    console.log('listening on *:1999');
});
