Util.prototype.construnctor = Util;
function Util() { }

Util.validateEmail = function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

Util.validateNick = function (nick) {
    var re = /^[a-z0-9_-]{4,15}$/;
    return re.test(nick);
}

Util.createArray = function (rows, cols, defaultValue) {
    var arr = [];

    // Creates all lines:
    for (var i = 0; i < rows; i++) {

        // Creates an empty line
        arr.push([]);

        // Adds cols to the empty line:
        arr[i].push(new Array(cols));

        for (var j = 0; j < cols; j++) {
            // Initializes:
            arr[i][j] = defaultValue;
        }
    }

    return arr;
}

Util.millisToMinutesAndSeconds = function (millis) {
    if (millis == '--') return "--";

    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    var result = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;

    return result;
}