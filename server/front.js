var socket = io();
var slider = document.getElementById("slider");

var lastChangeTime = 0;
var fallbackTimeout;

function emitChange(value) {
    socket.emit('change', parseInt(value));
}
slider.onchange = function(event) {
    var now = new Date().getTime();
    if (now - lastChangeTime > 300) {
        clearTimeout(fallbackTimeout);
        emitChange(slider.value);
        lastChangeTime = now;
    }
    else {
        clearTimeout(fallbackTimeout);
        fallbackTimeout = setTimeout(emitChange.bind(null, slider.value), 300);
    }
};
