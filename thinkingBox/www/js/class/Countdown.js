Countdown.prototype.constructor = Countdown;

function Countdown(limitTime, controller, $interval) {
    this.$interval = $interval;
    this.ctrl = controller;
    this.initMilliseconds = null;
    this.limitTime = limitTime;
    this.isActive = false;
    this.theInterval = null;
    this.auxStep = 0;
}

Countdown.prototype.fCallback = function () { return 1; } // Callback para usar desde fuera
Countdown.prototype.sCallback = function () { return 1; } // Callback para usar desde fuera

Countdown.prototype.init = function () {
    this.isActive = true;
    var auxTime = new Date();
    this.initMilliseconds = auxTime.getTime();
    this.auxStep = auxTime.getTime();

    this.theInterval = this.$interval(this.update.bind(this), 100);
    this.ctrl.$on('$destroy', this.cancelCountdown.bind(this));
}

Countdown.prototype.cancelCountdown = function () {
    if(this.theInterval)
        this.$interval.cancel(this.theInterval)
}

Countdown.prototype.update = function () {
    this.ctrl.time = this.getRest();
    var auxTime = new Date();
    var millis = (this.initMilliseconds + this.limitTime) - auxTime.getTime();
    var stepMillis = (this.auxStep + 1000) - auxTime.getTime();
    if(stepMillis <= 0) {
        this.sCallback();
        this.auxStep = auxTime.getTime();
    }

    if (millis <= 0) {
        this.fCallback();
        this.cancelCountdown();
    }
}

Countdown.prototype.isActive = function () {
    return this.isActive;
}

Countdown.prototype.getRest = function () {
    var auxTime = new Date();
    var millis = (this.initMilliseconds + this.limitTime) - auxTime.getTime();
    if (millis >= 0)
        return this.millisToMinutesAndSeconds(millis);
    else
        return "0:00";
}

Countdown.prototype.reset = function () {
    this.isActive = true;
    var auxTime = new Date();
    this.initMilliseconds = auxTime.getTime();
}

Countdown.prototype.add = function (millis) {
    this.limitTime += millis;
}

Countdown.prototype.millisToMinutesAndSeconds = function (millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
