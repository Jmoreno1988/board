// Aqui delegare todo lo relacionado con los eventos y asociacion de nodos del tablero
Board2048.prototype = new Board();
Board2048.prototype.constructor = Board2048;

function Board2048(id, size, autoGen) {
    Board.call(this, id, size, autoGen);
}

Board2048.prototype.init = function () {
    // Rellenamos el tablero
    // dos nuemros '2' en dos posiciones aleatorias del tablero 
    var r1 = Helper.ranMinMax(1, this.size[0]);
    var r2 = Helper.ranMinMax(1, this.size[1]);

    do {
        var r3 = Helper.ranMinMax(1, this.size[0]);
        var r4 = Helper.ranMinMax(1, this.size[1]);
    } while (r1 == r3 || r2 == r4)

    //this.cellSetValue(r1, r2, 2);
    //this.cellSetValue(r3, r4, 2);

    // Asociamos las escuchas 
    document.onkeydown = this.handlerKey.bind(this);

    // Representacion grafica del tablero
    this.paint();
}

/**
 * Escuchas asociadas a las teclas de direccion
 */
Board2048.prototype.handlerKey = function (e) {
    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        this.moveCells("up");
    }
    else if (e.keyCode == '40') {
        // down arrow
        this.moveCells("down");
    }
    else if (e.keyCode == '37') {
        // left arrow
        this.moveCells("left");

    }
    else if (e.keyCode == '39') {
        // right arrow
        this.moveCells("right");
    }
}

/**
 * 
 */
Board2048.prototype.moveCells = function (direction) {
    switch (direction) {
        case "left":
            for (var l = 0; l < 10; l++) {
                for (var i = 0; i < this.board.length; i++)
                    for (var a = 0; a < this.board[i].length; a++) {
                        if (this.board[i][a] != 0 && a - 1 >= 0) {
                            if (this.board[i][a - 1] == this.board[i][a] || this.board[i][a - 1] == 0) {
                                this.board[i][a - 1] = this.board[i][a - 1] + this.board[i][a];
                                this.board[i][a] = 0;
                            }
                        }
                    }

            }
            this.paint();
            break;

        case "right":
            for (var i = 0; i < this.board.length; i++)
                this.board[i].reverse();

            for (var l = 0; l < 10; l++) {

                for (var i = 0; i < this.board.length; i++)
                    for (var a = 0; a < this.board[i].length; a++) {
                        if (this.board[i][a] != 0 && a - 1 >= 0) {
                            if (this.board[i][a - 1] == this.board[i][a] || this.board[i][a - 1] == 0) {
                                this.board[i][a - 1] = this.board[i][a - 1] + this.board[i][a];
                                this.board[i][a] = 0;
                            }
                        }
                    }

            }

            for (var i = 0; i < this.board.length; i++)
                this.board[i].reverse();

            this.paint();
            break;

        case "up":
            for (var l = 0; l < 10; l++) {
                for (var i = 0; i < this.board.length; i++)

                    for (var a = 0; a < this.board[i].length; a++) {
                        if (this.board[i][a] != 0 && i - 1 >= 0) {
                            if (this.board[i - 1][a] == this.board[i][a] || this.board[i - 1][a] == 0) {
                                this.board[i - 1][a] = this.board[i - 1][a] + this.board[i][a];
                                this.board[i][a] = 0;
                            }
                        }
                    }
            }
            this.paint();
            break;

        case "down":
            var myTempArray = [];
            var i = 0; while (i < this.board.length) myTempArray = myTempArray.concat(this.board[i++]);
            myTempArray.reverse();
            this.inflate(myTempArray);

            for (var l = 0; l < 10; l++) {

                for (var i = 0; i < this.board.length; i++)
                    for (var a = 0; a < this.board[i].length; a++) {
                        if (this.board[i][a] != 0 && i - 1 >= 0) {
                            if (this.board[i - 1][a] == this.board[i][a] || this.board[i - 1][a] == 0) {
                                this.board[i - 1][a] = this.board[i - 1][a] + this.board[i][a];
                                this.board[i][a] = 0;
                            }
                        }
                    }

            }

            var myTempArray = [];
            var i = 0; while (i < this.board.length) myTempArray = myTempArray.concat(this.board[i++]);
            myTempArray.reverse();
            this.inflate(myTempArray);

            this.paint();
            break;

    }
}

/**
 * Pinta el tablero
 */
Board2048.prototype.paint = function () {
    var node = document.getElementById("board");
    node.innerHTML = "";

    var aux = 0;
    for (var i = 0; i < this.board.length; i++)
        for (var a = 0; a < this.board[i].length; a++) {
            
            if(aux +4 != this.size[1])
                node.innerHTML += '<div class="cell"><span>' + this.cell(i + 1, a + 1) + '</span></div>'
            else
                node.innerHTML += '<div class="cell noFloat"><span>' + this.cell(i + 1, a + 1) + '</span></div>'
            
            aux++;

            if (aux == this.size[1]) {
                aux = 0;
            }
        }
}