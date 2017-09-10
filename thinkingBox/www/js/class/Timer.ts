class TimerTs {

    private $interval: any;
    private ctrl: any;
    private saveTime: number;
    private initMilliseconds: number;
    private isActive: boolean;
    private theInterval: any;
    private auxStep: any;

    constructor(controller: any, $interval: any, initMilli: number) {
        this.$interval = $interval;
        this.ctrl = controller;
        this.saveTime = (typeof initMilli == 'number') ? initMilli : 0;
        this.initMilliseconds = null;
        this.isActive = false;
        this.theInterval = null;
        this.auxStep = 0;
    }

    public fCallback = function () { return 1; } // Callback para usar desde fuera
    public sCallback = function () { return 1; } // Callback para usar desde fuera

    public init = function () {
        this.isActive = true;
        var auxTime = new Date();
        this.initMilliseconds = auxTime.getTime() - this.saveTime;
        this.auxStep = auxTime.getTime();
        this.theInterval = this.$interval(this.update.bind(this), 100);
        this.ctrl.$on('$destroy', this.cancelTimer.bind(this));
    }

    public getTime = function () {
        var auxTime = new Date();
        var millis = auxTime.getTime() - this.initMilliseconds;

        if (millis >= 0)
            return this.millisToMinutesAndSeconds(millis);
        else
            return "0:00";
    }

    public getTimeMillis = function () {
        var auxTime = new Date();
        var millis = auxTime.getTime() - this.initMilliseconds;
        return millis;
    }

    public cancelTimer = function () {
        if (this.theInterval)
            this.$interval.cancel(this.theInterval)
    }

    public update = function () {

        this.ctrl.time = this.getTime();
        this.sCallback();
    }

    public getIsActive = function () {
        return this.isActive;
    }

    public reset = function () {
        this.isActive = true;
        var auxTime = new Date();
        this.initMilliseconds = auxTime.getTime();
    }

    public add = function (millis: number) {
        this.limitTime += millis;
    }

    public millisToMinutesAndSeconds = function (millis: number) {
        var minutes = Math.floor(millis / 60000);
        var seconds = parseInt(((millis % 60000) / 1000).toFixed(0));
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    public finish() {
        this.fCallback = function () { return 1; }
        this.sCallback = function () { return 1; }
    }
}