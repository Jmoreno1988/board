var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Board = (function () {
    function Board(id, size, autoGen) {
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
    Board.prototype.cellRandom = function (item) {
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
    function Board2048(id, size, autoGen) {
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
            _this.generateCell();
            _this.paint();
        };
        _this.generateCell = function () {
        };
        _this.paint = function () {
            var node = document.getElementById("board");
            node.innerHTML = "";
            var aux = 0;
            for (var i = 0; i < this.boardArray.length; i++)
                for (var a = 0; a < this.boardArray[i].length; a++) {
                    if (aux + 4 != this.size[1])
                        node.innerHTML += '<div class="cell"><span>' + this.cell(i + 1, a + 1) + '</span></div>';
                    else
                        node.innerHTML += '<div class="cell noFloat"><span>' + this.cell(i + 1, a + 1) + '</span></div>';
                    aux++;
                    if (aux == this.size[1]) {
                        aux = 0;
                    }
                }
        };
        return _this;
    }
    Board2048.prototype.init = function () {
        this.inflate([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
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
    Board2048.prototype.moveCells = function (direction) {
        switch (direction) {
            case "left":
                for (var l = 0; l < 10; l++) {
                    for (var i = 0; i < this.boardArray.length; i++)
                        for (var a = 0; a < this.boardArray[i].length; a++) {
                            if (this.boardArray[i][a] != 0 && a - 1 >= 0) {
                                if (this.boardArray[i][a - 1] == this.boardArray[i][a] || this.boardArray[i][a - 1] == 0) {
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
    return Board2048;
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