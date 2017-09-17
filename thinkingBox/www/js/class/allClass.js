var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Board = (function () {
    function Board(id, size, autoGen) {
        this.onAll = function (event, callback) {
            for (var i = 0; i < this.boardArray.length; i++)
                for (var a = 0; a < this.boardArray[i].length; a++) {
                    this.boardArray[i][a].addEventListener(event, callback);
                }
        };
        this.id = id;
        this.size = size;
        this.autoGen = autoGen || false;
        this.boardArray = null;
        if (this.autoGen)
            this.generate();
    }
    Board.prototype.generate = function () {
        var N = this.size[0];
        var M = this.size[1];
        this.boardArray = new Array(N);
        for (var i = 0; i < this.boardArray.length; i++)
            this.boardArray[i] = new Array(M);
    };
    Board.prototype.cell = function (N, M) {
        if (N > this.size[0] || M > this.size[1]) {
            console.log(":: ERROR :: Out of range.");
            return null;
        }
        return this.boardArray[N - 1][M - 1];
    };
    Board.prototype.cellSetValue = function (N, M, value) {
        this.boardArray[N - 1][M - 1] = value;
    };
    Board.prototype.inflate = function (arr, setIds) {
        var a = 0, e = 0;
        for (var i = 0; i < arr.length; i++) {
            var aux = arr[i];
            aux.setAttribute('i', a);
            aux.setAttribute('a', e);
            this.boardArray[a][e] = aux;
            e++;
            if (e == this.size[1]) {
                a++;
                e = 0;
            }
        }
    };
    Board.prototype.inflateAll = function (item) { };
    Board.prototype.cellRandom = function (item) { };
    Board.prototype.getBoardInSimpleArray = function () {
        var aux = [];
        for (var i = 0; i < this.boardArray.length; i++)
            for (var a = 0; a < this.boardArray[i].length; a++)
                aux.push({ cell: this.boardArray[i][a], pos: [i, a] });
        return aux;
    };
    Board.prototype.getBoard = function () {
        return this.boardArray;
    };
    Board.prototype.setBoard = function (newBoard) {
        this.boardArray = newBoard;
    };
    return Board;
}());
var Board2048 = (function (_super) {
    __extends(Board2048, _super);
    function Board2048(id, size, level, autoGen, crtl) {
        var _this = _super.call(this, id, size, autoGen) || this;
        _this.handlerKey = function (e) {
            e = e || window.event;
            if (e.keyCode == '38') {
                _this.moveCells("up");
            }
            else if (e.keyCode == '40') {
                _this.moveCells("down");
            }
            else if (e.keyCode == '37') {
                _this.moveCells("left");
            }
            else if (e.keyCode == '39') {
                _this.moveCells("right");
            }
            if (!_this.isLost() && !_this.isWin())
                setTimeout(function () {
                    this.generateCell();
                }.bind(_this), 100);
            else {
                setTimeout(function () {
                    this.paint();
                    if (this.isWin()) {
                        this.crtl.showResult(true, this.score);
                    }
                    else {
                        this.crtl.showResult(false, this.score);
                    }
                }.bind(_this), 100);
            }
            _this.paint();
        };
        _this.generateCell = function () {
            var auxArray = this.getBoardInSimpleArray();
            var newNumber = Math.random() > 0.9 ? 4 : 2;
            var voidCells = [];
            for (var i = 0; i < auxArray.length; i++)
                if (auxArray[i].cell == 0)
                    voidCells.push(auxArray[i]);
            var random = Helper.ranMinMax(0, voidCells.length - 1);
            if (voidCells.length > 0) {
                var pos = [voidCells[random].pos[0], voidCells[random].pos[1]];
                this.boardArray[pos[0]][pos[1]] = newNumber;
            }
            this.paint();
        };
        _this.paint = function () {
            var node = document.getElementById("board");
            node.innerHTML = "";
            var aux = 0;
            for (var i = 0; i < this.boardArray.length; i++)
                for (var a = 0; a < this.boardArray[i].length; a++) {
                    var listClass = "cell" + this.level;
                    if (this.cell(i + 1, a + 1) == 0)
                        listClass += " void ";
                    if (this.cell(i + 1, a + 1) == 2)
                        listClass += " _2 ";
                    if (this.cell(i + 1, a + 1) == 4)
                        listClass += " _4 ";
                    if (this.cell(i + 1, a + 1) == 8)
                        listClass += " _8 ";
                    if (this.cell(i + 1, a + 1) == 16)
                        listClass += " _16 ";
                    if (this.cell(i + 1, a + 1) == 32)
                        listClass += " _32 ";
                    if (this.cell(i + 1, a + 1) == 64)
                        listClass += " _64 ";
                    if (this.cell(i + 1, a + 1) == 128)
                        listClass += " _128 ";
                    if (this.cell(i + 1, a + 1) == 256)
                        listClass += " _256 ";
                    if (this.cell(i + 1, a + 1) == 512)
                        listClass += " _512 ";
                    if (this.cell(i + 1, a + 1) == 1024)
                        listClass += " _1024 ";
                    if (this.cell(i + 1, a + 1) >= 2048)
                        listClass += " _2048 ";
                    if (aux + this.level != this.size[1])
                        node.innerHTML += '<div class="cell ' + listClass + '"><span>' + this.cell(i + 1, a + 1) + '</span></div>';
                    else
                        node.innerHTML += '<div class="cell noFloat ' + listClass + '"><span>' + this.cell(i + 1, a + 1) + '</span></div>';
                    aux++;
                    if (aux == this.size[1]) {
                        aux = 0;
                    }
                }
        };
        _this.level = level;
        _this.crtl = crtl;
        _this.score = 0;
        return _this;
    }
    Board2048.prototype.init = function () {
        this.crtl.score = 0;
        this.crtl.record = 0;
        var auxArray = [];
        for (var i = 0; i < this.level * this.level; i++) {
            auxArray.push(0);
        }
        this.inflate(auxArray);
        var r1 = Helper.ranMinMax(1, this.size[0]);
        var r2 = Helper.ranMinMax(1, this.size[1]);
        do {
            var r3 = Helper.ranMinMax(1, this.size[0]);
            var r4 = Helper.ranMinMax(1, this.size[1]);
        } while (r1 == r3 || r2 == r4);
        this.cellSetValue(r1, r2, 2);
        this.cellSetValue(r3, r4, 2);
        document.onkeydown = this.handlerKey.bind(this);
        this.paint();
    };
    Board2048.prototype.handlerSwipe = function (direction) {
        this.moveCells(direction);
        if (!this.isLost() && !this.isWin())
            setTimeout(function () {
                this.generateCell();
            }.bind(this), 100);
        else {
            setTimeout(function () {
                this.paint();
                if (this.isWin()) {
                    this.crtl.showResult(true, this.score);
                }
                else {
                    this.crtl.showResult(false, this.score);
                }
            }.bind(this), 100);
        }
        this.paint();
    };
    Board2048.prototype.moveCells = function (direction) {
        switch (direction) {
            case "left":
                for (var l = 0; l < 10; l++) {
                    for (var i = 0; i < this.boardArray.length; i++)
                        for (var a = 0; a < this.boardArray[i].length; a++) {
                            if (this.boardArray[i][a] != 0 && a - 1 >= 0) {
                                if (this.boardArray[i][a - 1] == this.boardArray[i][a] || this.boardArray[i][a - 1] == 0) {
                                    if (this.boardArray[i][a - 1] == this.boardArray[i][a])
                                        this.updateScore(this.boardArray[i][a - 1] * 2);
                                    this.boardArray[i][a - 1] = this.boardArray[i][a - 1] + this.boardArray[i][a];
                                    this.boardArray[i][a] = 0;
                                }
                            }
                        }
                }
                break;
            case "right":
                for (var i = 0; i < this.boardArray.length; i++)
                    this.boardArray[i].reverse();
                for (var l = 0; l < 10; l++) {
                    for (var i = 0; i < this.boardArray.length; i++)
                        for (var a = 0; a < this.boardArray[i].length; a++) {
                            if (this.boardArray[i][a] != 0 && a - 1 >= 0) {
                                if (this.boardArray[i][a - 1] == this.boardArray[i][a] || this.boardArray[i][a - 1] == 0) {
                                    if (this.boardArray[i][a - 1] == this.boardArray[i][a])
                                        this.updateScore(this.boardArray[i][a - 1] * 2);
                                    this.boardArray[i][a - 1] = this.boardArray[i][a - 1] + this.boardArray[i][a];
                                    this.boardArray[i][a] = 0;
                                }
                            }
                        }
                }
                for (var i = 0; i < this.boardArray.length; i++)
                    this.boardArray[i].reverse();
                break;
            case "up":
                for (var l = 0; l < 10; l++) {
                    for (var i = 0; i < this.boardArray.length; i++)
                        for (var a = 0; a < this.boardArray[i].length; a++) {
                            if (this.boardArray[i][a] != 0 && i - 1 >= 0) {
                                if (this.boardArray[i - 1][a] == this.boardArray[i][a] || this.boardArray[i - 1][a] == 0) {
                                    if (this.boardArray[i - 1][a] == this.boardArray[i][a])
                                        this.updateScore(this.boardArray[i - 1][a] * 2);
                                    this.boardArray[i - 1][a] = this.boardArray[i - 1][a] + this.boardArray[i][a];
                                    this.boardArray[i][a] = 0;
                                }
                            }
                        }
                }
                break;
            case "down":
                var myTempArray = [];
                var i = 0;
                while (i < this.boardArray.length)
                    myTempArray = myTempArray.concat(this.boardArray[i++]);
                myTempArray.reverse();
                this.inflate(myTempArray);
                for (var l = 0; l < 10; l++) {
                    for (var i = 0; i < this.boardArray.length; i++)
                        for (var a = 0; a < this.boardArray[i].length; a++) {
                            if (this.boardArray[i][a] != 0 && i - 1 >= 0) {
                                if (this.boardArray[i - 1][a] == this.boardArray[i][a] || this.boardArray[i - 1][a] == 0) {
                                    if (this.boardArray[i - 1][a] == this.boardArray[i][a])
                                        this.updateScore(this.boardArray[i - 1][a] * 2);
                                    this.boardArray[i - 1][a] = this.boardArray[i - 1][a] + this.boardArray[i][a];
                                    this.boardArray[i][a] = 0;
                                }
                            }
                        }
                }
                var myTempArray = [];
                var i = 0;
                while (i < this.boardArray.length)
                    myTempArray = myTempArray.concat(this.boardArray[i++]);
                myTempArray.reverse();
                this.inflate(myTempArray);
                break;
        }
    };
    Board2048.prototype.isLost = function () {
        var auxArray = this.getBoardInSimpleArray();
        var isLost = true;
        var isBoardFull = true;
        for (var i = 0; i < auxArray.length; i++) {
            if (auxArray[i].cell == 0) {
                isBoardFull = false;
            }
        }
        if (!isBoardFull) {
            return false;
        }
        for (var i = 0; i < this.boardArray.length; i++)
            for (var a = 0; a < this.boardArray[i].length; a++) {
                var listChecks = [];
                var value = this.boardArray[i][a];
                var cellUp = null;
                var cellDown = null;
                var cellRight = null;
                var cellLeft = null;
                try {
                    cellUp = this.boardArray[i + 1][a] || null;
                }
                catch (e) { }
                try {
                    cellDown = this.boardArray[i - 1][a] || null;
                }
                catch (e) { }
                try {
                    cellRight = this.boardArray[i][a - 1] || null;
                }
                catch (e) { }
                try {
                    cellLeft = this.boardArray[i][a + 1] || null;
                }
                catch (e) { }
                if (cellUp) {
                    if (value != cellUp)
                        listChecks.push(true);
                    else
                        listChecks.push(false);
                }
                if (cellDown) {
                    if (value != cellDown)
                        listChecks.push(true);
                    else
                        listChecks.push(false);
                }
                if (cellRight) {
                    if (value != cellRight)
                        listChecks.push(true);
                    else
                        listChecks.push(false);
                }
                if (cellLeft) {
                    if (value != cellLeft)
                        listChecks.push(true);
                    else
                        listChecks.push(false);
                }
                for (var e = 0; e < listChecks.length; e++)
                    if (listChecks[e] == false)
                        return false;
            }
        return true;
    };
    Board2048.prototype.isWin = function () {
        var auxArray = this.getBoardInSimpleArray();
        for (var i = 0; i < auxArray.length; i++)
            if (auxArray[i].cell >= 2048) {
                return true;
            }
        return false;
    };
    Board2048.prototype.updateScore = function (score) {
        this.score += score;
    };
    Board2048.prototype.getScore = function () {
        return this.score;
    };
    return Board2048;
}(Board));
var BoardClown = (function (_super) {
    __extends(BoardClown, _super);
    function BoardClown(id, size, level, img, autoGen, crtl, interval) {
        var _this = _super.call(this, id, size, autoGen) || this;
        _this.step = function () {
            this.crtl.updateTimer(this.timer.getTime());
        };
        _this.moveCells = function (evt) {
            var cellNum = evt.target.innerHTML;
            var index = this.getIndexCellByNum(cellNum);
            if (index[1] - 1 >= 0 && this.boardArray[index[0]][index[1] - 1].innerHTML == "0") {
                this.boardArray[index[0]][index[1] - 1].innerHTML = this.boardArray[index[0]][index[1]].innerHTML;
                this.boardArray[index[0]][index[1]].innerHTML = "0";
            }
            else if (index[1] + 1 <= this.boardArray[0].length - 1 && this.boardArray[index[0]][index[1] + 1].innerHTML == "0") {
                this.boardArray[index[0]][index[1] + 1].innerHTML = this.boardArray[index[0]][index[1]].innerHTML;
                this.boardArray[index[0]][index[1]].innerHTML = "0";
            }
            else if (index[0] - 1 >= 0 && this.boardArray[index[0] - 1][index[1]].innerHTML == "0") {
                this.boardArray[index[0] - 1][index[1]].innerHTML = this.boardArray[index[0]][index[1]].innerHTML;
                this.boardArray[index[0]][index[1]].innerHTML = "0";
            }
            else if (index[0] + 1 <= this.boardArray[1].length - 1 && this.boardArray[index[0] + 1][index[1]].innerHTML == "0") {
                this.boardArray[index[0] + 1][index[1]].innerHTML = this.boardArray[index[0]][index[1]].innerHTML;
                this.boardArray[index[0]][index[1]].innerHTML = "0";
            }
            this.paint();
            if (this.isWin()) {
                this.timer.finish();
                this.crtl.endGame();
            }
        };
        _this.getIndexCellByNum = function (num) {
            for (var i = 0; i < this.boardArray.length; i++)
                for (var a = 0; a < this.boardArray[i].length; a++) {
                    if (this.boardArray[i][a].innerHTML == num)
                        return [i, a];
                }
            return null;
        };
        _this.paint = function () {
            var nodeBoard = document.getElementById("board");
            nodeBoard.innerHTML = "";
            var aux = 0;
            for (var i = 0; i < this.boardArray.length; i++)
                for (var a = 0; a < this.boardArray[i].length; a++) {
                    if (aux != this.size[1]) {
                        var cell = this.cell(i + 1, a + 1);
                        var num = this.boardArray[i][a].innerHTML;
                        var url = "img/clow/" + this.img + "/" + this.level + "x" + this.level + "/" + num + ".jpg";
                        cell.style.backgroundImage = "url(" + url + ")";
                        nodeBoard.appendChild(cell);
                        aux++;
                    }
                    else {
                        var cell = this.cell(i + 1, a + 1);
                        var num = this.boardArray[i][a].innerHTML;
                        var url = "img/clow/" + this.img + "/" + this.level + "x" + this.level + "/" + num + ".jpg";
                        cell.setAttribute("class", "cell noFloat cell" + this.level);
                        cell.style.backgroundImage = "url(" + url + ")";
                        nodeBoard.appendChild(cell);
                        aux = 1;
                    }
                }
            for (var i = 0; i < this.boardArray.length; i++)
                for (var a = 0; a < this.boardArray[i].length; a++) {
                    if (this.boardArray[i][a].innerHTML == "0") {
                        this.boardArray[i][a].style.backgroundImage = "";
                    }
                }
        };
        _this.level = level;
        _this.crtl = crtl;
        _this.img = img;
        _this.interval = interval;
        _this.timeMilli = 0;
        _this.timer = new TimerTs(crtl, interval, _this.timeMilli);
        return _this;
    }
    BoardClown.prototype.init = function () {
        var size = this.size[0] * this.size[0];
        var listNodes = [];
        var w = (document.getElementById("board").offsetWidth * 0.95) / this.level;
        for (var i = 0; i < size; i++) {
            var n = document.createElement("div");
            n.setAttribute("class", "cell cell" + this.level);
            n.innerHTML = i;
            listNodes.push(n);
            n.style.width = w + "px";
            n.style.height = w + "px";
        }
        this.inflate(listNodes);
        this.randomCells(true);
        this.paint();
        this.onAll("click", this.moveCells.bind(this));
        document.getElementById("imgResult").style.width = w * this.level + "px";
        document.getElementById("imgResult").style.height = w * this.level + "px";
        document.getElementById("board").style.width = w * this.level + "px";
        document.getElementById("board").style.height = w * this.level + "px";
        document.getElementById("flip-container").style.height = w * this.level + "px";
        setTimeout(this.flip.bind(this), 500);
        this.timer.sCallback = this.step.bind(this);
        this.timer.init();
    };
    BoardClown.prototype.flip = function () {
        Helper.node("flipper").classList.toggle("flipping");
    };
    BoardClown.prototype.randomCells = function (isInit) {
        for (var i = 0; i < this.boardArray.length; i++)
            for (var a = 0; a < this.boardArray[i].length; a++) {
                var r1 = Helper.ranMinMax(0, this.boardArray.length - 1);
                var r2 = Helper.ranMinMax(0, this.boardArray[0].length - 1);
                var cell1 = this.boardArray[i][a];
                var cell2 = this.boardArray[r1][r2];
                var auxCell = null;
                auxCell = cell2.innerHTML;
                cell2.innerHTML = cell1.innerHTML;
                cell1.innerHTML = auxCell;
            }
        if (isInit)
            for (var i = 0; i < this.boardArray.length; i++)
                for (var a = 0; a < this.boardArray[i].length; a++)
                    if (this.boardArray[i][a].innerHTML == 0) {
                        var cell1 = this.boardArray[i][a];
                        var cell2 = this.boardArray[0][0];
                        var auxCell = null;
                        auxCell = cell2.innerHTML;
                        cell2.innerHTML = cell1.innerHTML;
                        cell1.innerHTML = auxCell;
                    }
    };
    BoardClown.prototype.isWin = function () {
        var aux = 0;
        var max = (this.level * this.level) - 1;
        for (var i = 0; i < this.boardArray.length; i++)
            for (var a = 0; a < this.boardArray[i].length; a++) {
                if (this.boardArray[i][a].innerHTML == aux)
                    if (aux == max)
                        return true;
                    else
                        aux++;
                else
                    return false;
            }
    };
    return BoardClown;
}(Board));
var BoardMines = (function (_super) {
    __extends(BoardMines, _super);
    function BoardMines(id, size, level, mines, autoGen, crtl, interval) {
        var _this = _super.call(this, id, size, autoGen) || this;
        _this.step = function () {
            this.crtl.updateTimer(this.timer.getTime());
        };
        _this.clickCell = function (evt) {
            var cellNum = evt.target.innerHTML;
            var index = this.getIndexCellByNum(cellNum);
            var cell = evt.target;
            if (cell.innerHTML != '')
                this.paintCell(cell);
            else
                this.clickInVoid(cell);
        };
        _this.getIndexCellByNum = function (num) {
            for (var i = 0; i < this.boardArray.length; i++)
                for (var a = 0; a < this.boardArray[i].length; a++) {
                    if (this.boardArray[i][a].innerHTML == num)
                        return [i, a];
                }
            return null;
        };
        _this.paint = function () {
            var nodeBoard = document.getElementById("board");
            nodeBoard.innerHTML = "";
            var aux = 0;
            for (var i = 0; i < this.boardArray.length; i++)
                for (var a = 0; a < this.boardArray[i].length; a++) {
                    if (aux != this.size[1]) {
                        var cell = this.cell(i + 1, a + 1);
                        var num = this.boardArray[i][a].innerHTML;
                        nodeBoard.appendChild(cell);
                        aux++;
                    }
                    else {
                        var cell = this.cell(i + 1, a + 1);
                        var num = this.boardArray[i][a].innerHTML;
                        nodeBoard.appendChild(cell);
                        aux = 1;
                    }
                }
            for (var i = 0; i < this.boardArray.length; i++)
                for (var a = 0; a < this.boardArray[i].length; a++) {
                    if (this.boardArray[i][a].innerHTML == "0") {
                        this.boardArray[i][a].style.backgroundImage = "";
                    }
                }
        };
        _this.level = level;
        _this.crtl = crtl;
        _this.interval = interval;
        _this.timeMilli = 0;
        _this.timer = new TimerTs(crtl, interval, _this.timeMilli);
        _this.mines = mines;
        _this.colors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'];
        return _this;
    }
    BoardMines.prototype.init = function () {
        var size = this.size[0] * this.size[0];
        var listNodes = [];
        var w = (document.getElementById("board").offsetWidth * 0.95) / this.level;
        for (var i = 0; i < size; i++) {
            var n = document.createElement("div");
            n.setAttribute("class", "cell cell" + this.level);
            n.setAttribute("id_cell", i + "");
            n.style.backgroundColor = this.colors[Helper.ranMinMax(0, this.colors.length - 1)];
            n.innerHTML = '';
            listNodes.push(n);
            n.style.width = w + "px";
            n.style.height = w + "px";
        }
        this.generateMines(listNodes);
        this.inflate(listNodes, true);
        this.generateNumbers();
        this.paint();
        this.onAll("click", this.clickCell.bind(this));
        document.getElementById("board").style.width = w * this.level + "px";
        document.getElementById("board").style.height = w * this.level + "px";
        this.timer.sCallback = this.step.bind(this);
        this.timer.init();
    };
    BoardMines.prototype.generateMines = function (listNodes) {
        var totalMines = this.mines;
        do {
            var rand = Helper.ranMinMax(0, listNodes.length - 1);
            if (listNodes[rand].innerHTML != 'x') {
                listNodes[rand].innerHTML = 'x';
                totalMines = totalMines - 1;
            }
        } while (totalMines != 0);
    };
    BoardMines.prototype.generateNumbers = function () {
        for (var i = 0; i < this.boardArray.length; i++)
            for (var a = 0; a < this.boardArray[i].length; a++) {
                if (this.boardArray[i][a].innerHTML == 'x') {
                    continue;
                }
                var cell = this.boardArray[i][a];
                var n = 0;
                var length_1 = this.boardArray[i].length - 1;
                var cellDown = i - 1 >= 0 ? this.boardArray[i - 1][a] : null;
                var cellUp = i + 1 <= length_1 ? this.boardArray[i + 1][a] : null;
                var cellRight = a - 1 >= 0 ? this.boardArray[i][a - 1] : null;
                var cellLeft = a + 1 <= length_1 ? this.boardArray[i][a + 1] : null;
                var cellDownRight = i - 1 >= 0 && a - 1 >= 0 ? this.boardArray[i - 1][a - 1] : null;
                var cellUpLeft = i + 1 <= length_1 && a + 1 <= length_1 ? this.boardArray[i + 1][a + 1] : null;
                var cellDownLeft = i - 1 >= 0 && a + 1 <= length_1 ? this.boardArray[i - 1][a + 1] : null;
                var cellUpRight = i + 1 <= length_1 && a - 1 <= length_1 ? this.boardArray[i + 1][a - 1] : null;
                if (cellUp && cellUp.innerHTML == 'x')
                    n++;
                if (cellDown && cellDown.innerHTML == 'x')
                    n++;
                if (cellLeft && cellLeft.innerHTML == 'x')
                    n++;
                if (cellRight && cellRight.innerHTML == 'x')
                    n++;
                if (cellDownRight && cellDownRight.innerHTML == 'x')
                    n++;
                if (cellUpLeft && cellUpLeft.innerHTML == 'x')
                    n++;
                if (cellDownLeft && cellDownLeft.innerHTML == 'x')
                    n++;
                if (cellUpRight && cellUpRight.innerHTML == 'x')
                    n++;
                if (n > 0) {
                    cell.innerHTML = n;
                }
                else {
                    cell.innerHTML = '';
                }
            }
    };
    BoardMines.prototype.paintCell = function (cell) {
        if (cell.innerHTML == 'x') {
            console.log('Bumm!  Has perdido...');
        }
        else if (cell.innerHTML != '') {
            cell.style.backgroundImage = 'url("img/mines/numbers/' + cell.innerHTML + '.svg")';
            cell.style.backgroundColor = 'white';
        }
        else if (cell.innerHTML == '') {
            cell.style.backgroundColor = 'white';
        }
    };
    BoardMines.prototype.clickInVoid = function (cell) {
        var idCell = cell.getAttribute('id_cell');
        var listCellVoids = [];
        var listCellsCheck = [cell];
        var index = [parseInt(cell.getAttribute('i')), parseInt(cell.getAttribute('a'))];
        this.paintCell(this.boardArray[index[0]][index[1]]);
        try {
            this.paintCell(this.boardArray[index[0] - 1][index[1]]);
        }
        catch (e) { }
        try {
            this.paintCell(this.boardArray[index[0] + 1][index[1]]);
        }
        catch (e) { }
        try {
            this.paintCell(this.boardArray[index[0]][index[1] - 1]);
        }
        catch (e) { }
        try {
            this.paintCell(this.boardArray[index[0]][index[1] + 1]);
        }
        catch (e) { }
        try {
            this.paintCell(this.boardArray[index[0] - 1][index[1] - 1]);
        }
        catch (e) { }
        try {
            this.paintCell(this.boardArray[index[0] - 1][index[1] + 1]);
        }
        catch (e) { }
        try {
            this.paintCell(this.boardArray[index[0] + 1][index[1] + 1]);
        }
        catch (e) { }
        try {
            this.paintCell(this.boardArray[index[0] + 1][index[1] - 1]);
        }
        catch (e) { }
        try {
            if (this.boardArray[index[0] - 1][index[1]].innerHTML == '' && !this.isCheck(this.boardArray[index[0] - 1][index[1]].getAttribute('id_cell'), listCellsCheck))
                listCellVoids.push(this.boardArray[index[0] - 1][index[1]]);
        }
        catch (e) { }
        try {
            if (this.boardArray[index[0] + 1][index[1]].innerHTML == '' && !this.isCheck(this.boardArray[index[0] + 1][index[1]].getAttribute('id_cell'), listCellsCheck))
                listCellVoids.push(this.boardArray[index[0] + 1][index[1]]);
        }
        catch (e) { }
        try {
            if (this.boardArray[index[0]][index[1] - 1].innerHTML == '' && !this.isCheck(this.boardArray[index[0]][index[1] - 1].getAttribute('id_cell'), listCellsCheck))
                listCellVoids.push(this.boardArray[index[0]][index[1] - 1]);
        }
        catch (e) { }
        try {
            if (this.boardArray[index[0]][index[1] + 1].innerHTML == '' && !this.isCheck(this.boardArray[index[0]][index[1] + 1].getAttribute('id_cell'), listCellsCheck))
                listCellVoids.push(this.boardArray[index[0]][index[1] + 1]);
        }
        catch (e) { }
        try {
            if (this.boardArray[index[0] - 1][index[1] - 1].innerHTML == '' && !this.isCheck(this.boardArray[index[0] - 1][index[1] - 1].getAttribute('id_cell'), listCellsCheck))
                listCellVoids.push(this.boardArray[index[0] - 1][index[1] - 1]);
        }
        catch (e) { }
        try {
            if (this.boardArray[index[0] - 1][index[1] + 1].innerHTML == '' && !this.isCheck(this.boardArray[index[0] - 1][index[1] + 1].getAttribute('id_cell'), listCellsCheck))
                listCellVoids.push(this.boardArray[index[0] - 1][index[1] + 1]);
        }
        catch (e) { }
        try {
            if (this.boardArray[index[0] + 1][index[1] + 1].innerHTML == '' && !this.isCheck(this.boardArray[index[0] + 1][index[1] + 1].getAttribute('id_cell'), listCellsCheck))
                listCellVoids.push(this.boardArray[index[0] + 1][index[1] + 1]);
        }
        catch (e) { }
        try {
            if (this.boardArray[index[0] + 1][index[1] - 1].innerHTML == '' && !this.isCheck(this.boardArray[index[0] + 1][index[1] - 1].getAttribute('id_cell'), listCellsCheck))
                listCellVoids.push(this.boardArray[index[0] + 1][index[1] - 1]);
        }
        catch (e) { }
        this.recursivo(listCellVoids, listCellsCheck);
    };
    BoardMines.prototype.recursivo = function (lCellVoids, lCellsCheck) {
        var listCellVoids = lCellVoids;
        var listCellsCheck = lCellsCheck;
        var cell = listCellVoids[0];
        var index = [parseInt(cell.getAttribute('i')), parseInt(cell.getAttribute('a'))];
        listCellsCheck.push(cell);
        for (var a_1 = 0; a_1 < listCellVoids.length; a_1++)
            if (listCellVoids[a_1].getAttribute('id_cell') == cell.getAttribute('id_cell'))
                listCellVoids.splice(a_1, 1);
        this.paintCell(this.boardArray[index[0]][index[1]]);
        try {
            this.paintCell(this.boardArray[index[0] - 1][index[1]]);
        }
        catch (e) { }
        try {
            this.paintCell(this.boardArray[index[0] + 1][index[1]]);
        }
        catch (e) { }
        try {
            this.paintCell(this.boardArray[index[0]][index[1] - 1]);
        }
        catch (e) { }
        try {
            this.paintCell(this.boardArray[index[0]][index[1] + 1]);
        }
        catch (e) { }
        try {
            this.paintCell(this.boardArray[index[0] - 1][index[1] - 1]);
        }
        catch (e) { }
        try {
            this.paintCell(this.boardArray[index[0] - 1][index[1] + 1]);
        }
        catch (e) { }
        try {
            this.paintCell(this.boardArray[index[0] + 1][index[1] + 1]);
        }
        catch (e) { }
        try {
            this.paintCell(this.boardArray[index[0] + 1][index[1] - 1]);
        }
        catch (e) { }
        try {
            if (this.boardArray[index[0] - 1][index[1]].innerHTML == '' && !this.isCheck(this.boardArray[index[0] - 1][index[1]].getAttribute('id_cell'), listCellsCheck))
                listCellVoids.push(this.boardArray[index[0] - 1][index[1]]);
        }
        catch (e) { }
        try {
            if (this.boardArray[index[0] + 1][index[1]].innerHTML == '' && !this.isCheck(this.boardArray[index[0] + 1][index[1]].getAttribute('id_cell'), listCellsCheck))
                listCellVoids.push(this.boardArray[index[0] + 1][index[1]]);
        }
        catch (e) { }
        try {
            if (this.boardArray[index[0]][index[1] - 1].innerHTML == '' && !this.isCheck(this.boardArray[index[0]][index[1] - 1].getAttribute('id_cell'), listCellsCheck))
                listCellVoids.push(this.boardArray[index[0]][index[1] - 1]);
        }
        catch (e) { }
        try {
            if (this.boardArray[index[0]][index[1] + 1].innerHTML == '' && !this.isCheck(this.boardArray[index[0]][index[1] + 1].getAttribute('id_cell'), listCellsCheck))
                listCellVoids.push(this.boardArray[index[0]][index[1] + 1]);
        }
        catch (e) { }
        try {
            if (this.boardArray[index[0] - 1][index[1] - 1].innerHTML == '' && !this.isCheck(this.boardArray[index[0] - 1][index[1] - 1].getAttribute('id_cell'), listCellsCheck))
                listCellVoids.push(this.boardArray[index[0] - 1][index[1] - 1]);
        }
        catch (e) { }
        try {
            if (this.boardArray[index[0] - 1][index[1] + 1].innerHTML == '' && !this.isCheck(this.boardArray[index[0] - 1][index[1] + 1].getAttribute('id_cell'), listCellsCheck))
                listCellVoids.push(this.boardArray[index[0] - 1][index[1] + 1]);
        }
        catch (e) { }
        try {
            if (this.boardArray[index[0] + 1][index[1] + 1].innerHTML == '' && !this.isCheck(this.boardArray[index[0] + 1][index[1] + 1].getAttribute('id_cell'), listCellsCheck))
                listCellVoids.push(this.boardArray[index[0] + 1][index[1] + 1]);
        }
        catch (e) { }
        try {
            if (this.boardArray[index[0] + 1][index[1] - 1].innerHTML == '' && !this.isCheck(this.boardArray[index[0] + 1][index[1] - 1].getAttribute('id_cell'), listCellsCheck))
                listCellVoids.push(this.boardArray[index[0] + 1][index[1] - 1]);
        }
        catch (e) { }
        if (listCellVoids.length)
            this.recursivo(listCellVoids, listCellsCheck);
    };
    BoardMines.prototype.isCheck = function (id, arr) {
        var is = false;
        for (var i = 0; i < arr.length; i++)
            if (arr[i].getAttribute('id_cell') == id)
                return true;
        return is;
    };
    return BoardMines;
}(Board));
var BoardMinesweeper = (function (_super) {
    __extends(BoardMinesweeper, _super);
    function BoardMinesweeper(id, size, autoGen) {
        var _this = _super.call(this, id, size, autoGen) || this;
        _this.paint = function () {
        };
        return _this;
    }
    BoardMinesweeper.prototype.init = function () {
        this.paint();
    };
    return BoardMinesweeper;
}(Board));
var Helper = (function () {
    function Helper() {
    }
    Helper.ranMinMax = function (minimo, maximo) {
        return Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
    };
    Helper.node = function (id) {
        return document.getElementById(id);
    };
    return Helper;
}());
function l(msg) {
    console.log(msg);
}
function a(msg) {
    alert(msg);
}
var TimerTs = (function () {
    function TimerTs(controller, $interval, initMilli) {
        this.fCallback = function () { return 1; };
        this.sCallback = function () { return 1; };
        this.init = function () {
            this.isActive = true;
            var auxTime = new Date();
            this.initMilliseconds = auxTime.getTime() - this.saveTime;
            this.auxStep = auxTime.getTime();
            this.theInterval = this.$interval(this.update.bind(this), 100);
            this.ctrl.$on('$destroy', this.cancelTimer.bind(this));
        };
        this.getTime = function () {
            var auxTime = new Date();
            var millis = auxTime.getTime() - this.initMilliseconds;
            if (millis >= 0)
                return this.millisToMinutesAndSeconds(millis);
            else
                return "0:00";
        };
        this.getTimeMillis = function () {
            var auxTime = new Date();
            var millis = auxTime.getTime() - this.initMilliseconds;
            return millis;
        };
        this.cancelTimer = function () {
            if (this.theInterval)
                this.$interval.cancel(this.theInterval);
        };
        this.update = function () {
            this.ctrl.time = this.getTime();
            this.sCallback();
        };
        this.getIsActive = function () {
            return this.isActive;
        };
        this.reset = function () {
            this.isActive = true;
            var auxTime = new Date();
            this.initMilliseconds = auxTime.getTime();
        };
        this.add = function (millis) {
            this.limitTime += millis;
        };
        this.millisToMinutesAndSeconds = function (millis) {
            var minutes = Math.floor(millis / 60000);
            var seconds = parseInt(((millis % 60000) / 1000).toFixed(0));
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        };
        this.$interval = $interval;
        this.ctrl = controller;
        this.saveTime = (typeof initMilli == 'number') ? initMilli : 0;
        this.initMilliseconds = null;
        this.isActive = false;
        this.theInterval = null;
        this.auxStep = 0;
    }
    TimerTs.prototype.finish = function () {
        this.fCallback = function () { return 1; };
        this.sCallback = function () { return 1; };
    };
    return TimerTs;
}());
//# sourceMappingURL=allClass.js.map