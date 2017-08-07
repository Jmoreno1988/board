GameSudoku.prototype.constructor = GameSudoku;

function GameSudoku(options) {
    this.idBoard = options.idBoard;
    this.nodeBoard = document.getElementById(this.idBoard);
    this.difficulty = options.difficulty;
    this.sessionService = options.sessionService;
    this.sudokuJs = null;
    this.listInputs = null;
    this.actualNumber = null;
    this.eraseMode = false;
    this.listQuadrant = [];
    this.listBoard = Util.createArray(9, 9, null); // Array bidimensional del tablero
    this.listBoxes = null; // Lista de cajas de 3x3 del tablero
    this.timeMilli = this.sessionService.get("progressSudoku")[this.difficulty].time;
    this.timer = new Timer(options.controller, options.interval, this.timeMilli);
    this.ctrl = options.controller;
    this.rootScope = options.rootScope;
    this.state = options.state;
}

GameSudoku.prototype.init = function () {
    
    this.sudokuJs = $("#" + this.idBoard).sudokuJS({
        difficulty: this.difficulty,
        board: this.sessionService.get("progressSudoku")[this.difficulty].board
    });

    if(!this.sessionService.get("progressSudoku")[this.difficulty].board) {
        var list = this.sudokuJs.getBoard();

        for(var i = 0; i < list.length; i++) {
            if(list[i].val)
                list[i].isFixed = true;
            else 
                list[i].isFixed = false;
        }
    }

    this.listInputs = this.nodeBoard.querySelectorAll("input");
    
    for (var i = 0; i < this.listInputs.length; i++) {
        this.listInputs[i].setAttribute("readonly", "true");
        this.listInputs[i].addEventListener("click", this.listener.bind(this, i));
    }

    var list = this.sudokuJs.getBoard();
    for(var i = 0; i < list.length; i++) {
            if(list[i].isFixed)
                this.listInputs[i].setAttribute("fixed", "true");
        }


    var aux = 0;
    for (var i = 0; i < this.listBoard.length; i++)
        for (var a = 0; a < this.listBoard[i].length; a++) {
            this.listBoard[i][a] = this.listInputs[aux];
            aux++;
        }

    this.listBoxes = this.generateListBoxes();
    this.isValidate();

    this.timer.sCallback = this.step.bind(this);
    this.timer.init();
    
    this.saveAll();
    
    if (this.isValidate() && this.isComplete()) {
        this.state.go("sudokuResult", {});
    }
}

GameSudoku.prototype.step = function() {
    this.ctrl.labelTimer = this.timer.getTime();
    this.saveAll();
}

GameSudoku.prototype.save = function(pos, value) {
    var aux = this.sessionService.get("progressSudoku");

    aux[this.difficulty].board = this.sudokuJs.getBoard();
    aux[this.difficulty].board[pos].val = value;
    aux[this.difficulty].time = this.timer.getTimeMillis();
    this.sessionService.set("progressSudoku", aux);
}

GameSudoku.prototype.saveAll = function(pos, value) {
    var aux = this.sessionService.get("progressSudoku");
    
    aux[this.difficulty].board = this.sudokuJs.getBoard();

    for(var i = 0; i < this.sudokuJs.getBoard().length; i++)
        aux[this.difficulty].board[i].val = this.sudokuJs.getBoard()[i].val;

    aux[this.difficulty].time = this.timer.getTimeMillis();
    this.sessionService.set("progressSudoku", aux);
}


// TODO: refactor, refactor, refactor...
GameSudoku.prototype.isValidate = function () {
    var isValidate = true;
    
    // Limpieza
    for (var e = 0; e < this.listBoard.length; e++)
        for (var u = 0; u < this.listBoard[e].length; u++)
            if (this.listBoard[e][u].hasAttribute("error"))
                this.listBoard[e][u].removeAttribute("error")

    // Comprobacion de verticales y horizontales
    for (var i = 0; i < this.listBoard.length; i++)
        for (var a = 0; a < this.listBoard[i].length; a++) {
            var value = this.listBoard[i][a].value;

            for (var aux1 = 0; aux1 < 9; aux1++) {
                if (this.listBoard[i][aux1].value != "" && this.listBoard[i][aux1].value == value && a != aux1) {
                    this.listBoard[i][aux1].setAttribute("error", "true");
                    isValidate = false;
                }
            }

            for (var aux2 = 0; aux2 < 9; aux2++) {
                if (this.listBoard[aux2][a].value != "" && this.listBoard[aux2][a].value == value && i != aux2) {
                    this.listBoard[aux2][a].setAttribute("error", "true");
                    isValidate = false;
                }
            }
        }
    // Fin Comprobacion de verticales y horizontales

    // Comprobacion de caja
    for (var i = 0; i < this.listBoxes.length; i++) {
        var auxiliar = 0;
        for (var a = 0; a < this.listBoxes[i].length; a++) {
            var value = this.listBoxes[i][auxiliar].value;
            for (var e = 0; e < 9; e++) {
                if (this.listBoxes[i][e].value != "" && value == this.listBoxes[i][e].value && e != auxiliar) {
                    this.listBoxes[i][e].setAttribute("error", "true");
                    isValidate = false;
                }
            }
            auxiliar += 1;
        }
    }
    // Fin comprobacion de caja

    return isValidate;
}

GameSudoku.prototype.listener = function (i) {
    var isFixed = this.listInputs[i].getAttribute("fixed");
    var posCell = this.listInputs[i].getAttribute("id").split("-")[1];

    // Modo borrado activado
    if (this.eraseMode && !isFixed) {
        this.listInputs[i].value = "";
        this.save(posCell, null);
        this.isValidate();
        return;
    }

    if (this.actualNumber && !this.eraseMode && !isFixed)
        this.listInputs[i].value = this.actualNumber;

    if (this.isValidate() && this.isComplete()) {
        var aux = this.sessionService.get("progressSudoku");
       
        aux[this.difficulty].board = null;
        aux[this.difficulty].wins = aux[this.difficulty].wins + 1;
        this.sessionService.set("progressSudoku", aux);

        this.state.go("sudokuResult", {});
    }
    
    this.save(posCell, this.actualNumber);
}

GameSudoku.prototype.isComplete = function () {
    for (var i = 0; i < this.listInputs.length; i++)
        if (this.listInputs[i].value == "")
            return false;

    return true;
}

GameSudoku.prototype.setActualNumber = function (newValue) {
    this.actualNumber = newValue;
}

GameSudoku.prototype.toggleEraseMode = function (newValue) {
    this.eraseMode = newValue;
}

GameSudoku.prototype.isCorrect = function () {
    console.log(this.sudokuJs.analyzeBoard())
}

GameSudoku.prototype.solveAll = function () {
    this.sudokuJs.solveAll();
}

GameSudoku.prototype.solveStep = function () {
    this.sudokuJs.solveStep();
}

GameSudoku.prototype.generateListBoxes = function () {
    var list = [];
    var a = this.listInputs;

    list[0] = [a[0], a[1], a[2], a[9], a[10], a[11], a[18], a[19], a[20]];
    list[1] = [a[3], a[4], a[5], a[12], a[13], a[14], a[21], a[22], a[23]];
    list[2] = [a[6], a[7], a[8], a[15], a[16], a[17], a[24], a[25], a[26]];
    list[3] = [a[27], a[28], a[29], a[36], a[37], a[38], a[45], a[46], a[47]];
    list[4] = [a[30], a[31], a[32], a[39], a[40], a[41], a[48], a[49], a[50]];
    list[5] = [a[33], a[34], a[35], a[42], a[43], a[44], a[51], a[52], a[53]];
    list[6] = [a[54], a[55], a[56], a[63], a[64], a[65], a[72], a[73], a[74]];
    list[7] = [a[57], a[58], a[59], a[66], a[67], a[68], a[75], a[76], a[77]];
    list[8] = [a[60], a[61], a[62], a[69], a[70], a[71], a[78], a[79], a[80]];

    return list;
}