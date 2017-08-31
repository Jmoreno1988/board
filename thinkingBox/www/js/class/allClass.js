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
                    var value = this.boardArray[i][a];
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
    Board.prototype.inflate = function (arr) {
        var a = 0, e = 0;
        for (var i = 0; i < arr.length; i++) {
            var aux = arr[i];
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
        var _this = this;
        _super.call(this, id, size, autoGen);
        this.handlerKey = function (e) {
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
        this.generateCell = function () {
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
        this.paint = function () {
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
        this.level = level;
        this.crtl = crtl;
        this.score = 0;
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
    function BoardClown(id, size, level, img, autoGen, crtl) {
        _super.call(this, id, size, autoGen);
        this.moveCells = function (evt) {
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
        };
        this.getIndexCellByNum = function (num) {
            for (var i = 0; i < this.boardArray.length; i++)
                for (var a = 0; a < this.boardArray[i].length; a++) {
                    if (this.boardArray[i][a].innerHTML == num)
                        return [i, a];
                }
            return null;
        };
        this.paint = function () {
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
        this.level = level;
        this.crtl = crtl;
        this.img = img;
    }
    BoardClown.prototype.init = function () {
        var size = this.size[0] * this.size[0];
        var listNodes = [];
        for (var i = 0; i < size; i++) {
            var n = document.createElement("div");
            n.setAttribute("class", "cell cell" + this.level);
            n.innerHTML = i;
            listNodes.push(n);
        }
        this.inflate(listNodes);
        this.paint();
        this.onAll("click", this.moveCells.bind(this));
    };
    return BoardClown;
}(Board));
var BoardMinesweeper = (function (_super) {
    __extends(BoardMinesweeper, _super);
    function BoardMinesweeper(id, size, autoGen) {
        _super.call(this, id, size, autoGen);
        this.paint = function () {
        };
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
    return Helper;
}());
//# sourceMappingURL=allClass.js.map