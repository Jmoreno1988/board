Timer.prototype.constructor = Timer;

function Timer(controller, $interval, initMilli) {
    this.$interval = $interval;
    this.ctrl = controller;
    this.saveTime = (typeof initMilli == 'number') ? initMilli : 0;
    this.initMilliseconds = null;
    this.isActive = false;
    this.theInterval = null;
    this.auxStep = 0;
}

Timer.prototype.fCallback = function () { return 1; } // Callback para usar desde fuera
Timer.prototype.sCallback = function () { return 1; } // Callback para usar desde fuera

Timer.prototype.init = function () {
    this.isActive = true;
    var auxTime = new Date();
    this.initMilliseconds = auxTime.getTime() - this.saveTime;
    this.auxStep = auxTime.getTime();
    this.theInterval = this.$interval(this.update.bind(this), 100);
    this.ctrl.$on('$destroy', this.cancelTimer.bind(this));
}

Timer.prototype.getTime = function() {
    var auxTime = new Date();
    var millis = auxTime.getTime() - this.initMilliseconds;

    if (millis >= 0)
        return this.millisToMinutesAndSeconds(millis);
    else
        return "0:00";
}

Timer.prototype.getTimeMillis = function() {
    var auxTime = new Date();
    var millis = auxTime.getTime() - this.initMilliseconds;
    return millis;
}

Timer.prototype.cancelTimer = function () {
    if(this.theInterval)
        this.$interval.cancel(this.theInterval)
}

Timer.prototype.update = function () {
    
    this.ctrl.time = this.getTime();
    this.sCallback();
    /*
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
        this.cancelTimer();
    }
    */
}

Timer.prototype.isActive = function () {
    return this.isActive;
}

Timer.prototype.reset = function () {
    this.isActive = true;
    var auxTime = new Date();
    this.initMilliseconds = auxTime.getTime();
}

Timer.prototype.add = function (millis) {
    this.limitTime += millis;
}

Timer.prototype.millisToMinutesAndSeconds = function (millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
