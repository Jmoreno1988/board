GameCal.prototype.constructor = GameCal;

function GameCal(difficulty, rootScope, controller, $state, $interval, bridgeService, sessionService, $cordovaVibration) {
    this.vibration = $cordovaVibration;
    this.difficulty = difficulty;
    this.bridgeService = bridgeService;
    this.sessionService = sessionService;
    this.level = 1;
    this.levelMax = 10;
    this.errors = 0;
    this.maxErrors = 3;
    this.ctrl = controller;
    this.$state = $state;
    this.totalScore = 0;
    this.listScores = [];
    this.score = 1000;
    this.result = null;
    this.options = [];
    this.unknown = null;
    this.timeVibration = 250;
    this.timer = new Timer(controller, $interval);
    this.rootScope = rootScope;
}

GameCal.prototype.init = function () {
    this.generateMove();
    this.timer.fCallback = this.finish.bind(this);
    this.timer.sCallback = this.step.bind(this);
    this.timer.init();
    this.pullInfo();
}

GameCal.prototype.step = function () {
    if (this.score > 20) {
        this.score -= 10;
        this.pullInfo();
    }
}

GameCal.prototype.finish = function () {
    this.bridgeService.data.listScore = this.listScores;
    this.bridgeService.data.timeCal = this.timer.getTime();
    this.bridgeService.data.levelCal = this.level;
    this.bridgeService.data.levelCalWin = this.levelMax;

    var selectLevel = this.bridgeService.data.selectLevel;

    var aux2 = this.sessionService.get("progressMathCalcu");
    aux2[selectLevel].lastScore = this.totalScore;
    this.sessionService.set("progressMathCalcu", aux2);
    
    if(this.totalScore > this.sessionService.get("progressMathCalcu")[selectLevel].maxScore) {
        var aux = this.sessionService.get("progressMathCalcu");
        aux[selectLevel].maxScore = this.totalScore;
        this.sessionService.set("progressMathCalcu", aux);
    }

    this.timer.cancelTimer();
    
    
    this.rootScope.$broadcast("finishGameCal");

    this.$state.go("result", {});
}

GameCal.prototype.newRound = function () {
    this.operation = "";
    this.result = null;
    this.options = [];
}

GameCal.prototype.generateMove = function () {
    switch (this.difficulty) {
        case "easy":
            this.generateEasy();
            break;

        case "normal":
            this.generateNormal();
            break;

        case "hard":
            this.generateHard();
            break;

        case "master":
            this.generateMaster();
            break;

        case "kids":
            this.generateKids();
            break;
        
        case "infinity":
            this.generateInfinity();
            break;
    }

    /* Comentar para que no se mezclen los numeros */
    this.shuffle(this.options);
    this.pullInfo();
}

GameCal.prototype.isFinish = function() {
    var isFinish = false;

    if(this.level >= this.levelMax || this.errors >= this.maxErrors)
        isFinish = true;

    return isFinish; 
}

GameCal.prototype.checkResult = function (option) {
    if (this.difficulty == "master") {
        if (this.options[option - 1] === this.unknown) {
            this.listScores.push(this.score);
            this.totalScore += this.score;
            this.score = 1000;
            this.level++;

            if (this.isFinish()) {
                this.finish();
            } else {
                this.newRound();
                this.generateMove();
                this.pullInfo();
            }
        } else {
            this.errors += 1;
            this.vibrate();
            this.score = 1000;
            this.newRound();
            this.generateMove();
            this.pullInfo();

            if (this.isFinish()) 
                this.finish();
        }
    }

    if (this.options[option - 1] === this.result) {
        this.listScores.push(this.score);
        this.totalScore += this.score;
        this.score = 1000;
        this.level++;
        if (this.isFinish()) {
            this.finish();
        } else {
            this.newRound();
            this.generateMove();
            this.pullInfo();
        }
    } else {
        this.errors += 1;
        this.vibrate();
        this.score = 1000;
        this.newRound();
        this.generateMove();
        this.pullInfo();

        if (this.isFinish()) 
                this.finish();
    }
}

GameCal.prototype.reset = function () {
    this.level = 1;
    this.score = 1000;
    this.totalScore = 0;
    this.errors = 0;
    this.timer.init();
    this.newRound();
    this.generateMove();
    this.pullInfo();
}

GameCal.prototype.shuffle = function (array) {
    var j, x, i;

    for (i = array.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
}

GameCal.prototype.pullInfo = function () {
    this.ctrl.totalScore = this.totalScore;
    this.ctrl.score = this.score;
    this.ctrl.level = this.level;
    this.ctrl.levelMax = this.levelMax;
    this.ctrl.errors = this.errors;
    this.ctrl.maxErrors = this.maxErrors;
    this.ctrl.operation = this.operation;
    this.ctrl.option1 = this.options[0];
    this.ctrl.option2 = this.options[1];
    this.ctrl.option3 = this.options[2];
    this.ctrl.option4 = this.options[3];
    this.ctrl.time = this.timer.getTime();
}

GameCal.prototype.generateEasy = function () {
    var operations = ["+", "-", "*"];
    var min = 2;
    var max = 18;
    var sign = operations[Math.floor(Math.random() * operations.length)];
    var num1 = Math.floor(Math.random() * max) + min;
    var num2 = Math.floor(Math.random() * max) + min;

    this.result = eval(num1 + " " + sign + " " + num2);
    this.options = [this.result, Math.floor(Math.random() * 50) + 1, Math.floor(Math.random() * 50) + 1, Math.floor(Math.random() * 50) + 1];
    this.operation = num1 + " " + sign + " " + num2 + " = ?";
}

GameCal.prototype.generateNormal = function () {
    var operations = ["+", "-"];
    var min = 2;
    var max = 18;
    var sign1 = operations[Math.floor(Math.random() * operations.length)];
    var sign2 = operations[Math.floor(Math.random() * operations.length)];
    var num1 = Math.floor(Math.random() * max) + min;
    var num2 = Math.floor(Math.random() * max) + min;
    var num3 = Math.floor(Math.random() * max) + min;

    this.result = eval(num1 + " " + sign1 + " " + num2 + " " + sign2 + " " + num3);
    this.options = [this.result, Math.floor(Math.random() * 50) + 1, Math.floor(Math.random() * 50) + 1, Math.floor(Math.random() * 50) + 1];
    this.operation = num1 + " " + sign1 + " " + num2 + " " + sign2 + " " + num3 + " = ?";
}

GameCal.prototype.generateHard = function () {
    var operations = ["+", "-", "*"];
    var min = 2;
    var max = 18;
    var sign1 = operations[Math.floor(Math.random() * operations.length)];
    var sign2 = operations[Math.floor(Math.random() * operations.length)];
    var num1 = Math.floor(Math.random() * max) + min;
    var num2 = Math.floor(Math.random() * max) + min;
    var num3 = Math.floor(Math.random() * max) + min;

    this.result = eval(num1 + " " + sign1 + " " + num2 + " " + sign2 + " " + num3);
    this.options = [this.result, Math.floor(Math.random() * 50) + 1, Math.floor(Math.random() * 50) + 1, Math.floor(Math.random() * 50) + 1];
    this.operation = num1 + " " + sign1 + " " + num2 + " " + sign2 + " " + num3 + " = ?";
}

GameCal.prototype.generateMaster = function () {
    var operations = ["+", "-", "*"];
    var min = 2;
    var max = 18;
    var sign1 = operations[Math.floor(Math.random() * operations.length)];
    var sign2 = operations[Math.floor(Math.random() * operations.length)];
    var num1 = Math.floor(Math.random() * max) + min;
    var num2 = Math.floor(Math.random() * max) + min;
    var num3 = Math.floor(Math.random() * max) + min;
    var auxNumbers = [num1, num2, num3];
    var i = Math.floor(Math.random() * auxNumbers.length);

    this.unknown = auxNumbers[i];
    this.result = eval(num1 + " " + sign1 + " " + num2 + " " + sign2 + " " + num3);
    this.options = [auxNumbers[i], Math.floor(Math.random() * 50) + 1, Math.floor(Math.random() * 50) + 1, Math.floor(Math.random() * 50) + 1];

    auxNumbers[i] = "?";
    this.operation = auxNumbers[0] + " " + sign1 + " " + auxNumbers[1] + " " + sign2 + " " + auxNumbers[2] + " = " + this.result;
}

GameCal.prototype.generateSurvive = function () {

}

GameCal.prototype.generateKids = function () {
    var operations = ["+"];
    var min = 2;
    var max = 10;
    var sign = operations[Math.floor(Math.random() * operations.length)];

    this.num1 = Math.floor(Math.random() * max) + min;
    this.num2 = Math.floor(Math.random() * max) + min;
    this.result = eval(this.num1 + " " + sign + " " + this.num2);
    this.options = [this.result, Math.floor(Math.random() * max) + 1, Math.floor(Math.random() * max) + 1, Math.floor(Math.random() * max) + 1];
    this.operation = this.num1 + " " + sign + " " + this.num2 + " = ?";
}

GameCal.prototype.setScore = function (newValue) {
    this.score = newValue;
}

GameCal.prototype.getScore = function (newValue) {
    return this.score;
}

GameCal.prototype.getNum1 = function () {
    return this.num1;
}

GameCal.prototype.getNum2 = function () {
    return this.num2;
}

GameCal.prototype.getOperation = function () {
    return this.operation;
}

GameCal.prototype.getOptions = function () {
    return this.options;
}

GameCal.prototype.getResult = function () {
    return this.result;
}

GameCal.prototype.vibrate = function() {
    var config = this.sessionService.get("config");
    
    if(config.isVibration)
        navigator.vibrate(this.timeVibration);
}