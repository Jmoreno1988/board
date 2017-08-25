class Board2048 extends Board {

    private level: number;
    private score: number;
    private crtl: any;

    constructor(id: string, size: number[], level: number, autoGen: boolean, crtl: any) {
        super(id, size, autoGen);

        this.level = level;
        this.crtl = crtl;
        this.score = 0;
    }

    public init() {
        this.crtl.score = 0;
        this.crtl.record = 0;
        // Rellenamos el tablero
        // dos nuemros '2' en dos posiciones aleatorias del tablero
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
        } while (r1 == r3 || r2 == r4)

        this.cellSetValue(r1, r2, 2);
        this.cellSetValue(r3, r4, 2);

        // Asociamos las escuchas 
        document.onkeydown = this.handlerKey.bind(this);

        // Representacion grafica del tablero
        this.paint();
    }

    /**
     * Escuchas asociadas a las teclas de direccion
     */
    private handlerKey = (e: any) => {
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

        if (!this.isLost() && !this.isWin())
            setTimeout(function () {
                this.generateCell();
            }.bind(this), 100);

        this.paint();
    }

    public handlerSwipe(direction: string) {
        this.moveCells(direction);

        if (!this.isLost() && !this.isWin())
            setTimeout(function () {
                this.generateCell();
            }.bind(this), 100);

        this.paint();
    }

    // TODO: falta que si no hay movimiento no se genree celda
    /**
     * 
     */
    private moveCells(direction: string) {
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
                var myTempArray: any[] = [];
                var i = 0; while (i < this.boardArray.length) myTempArray = myTempArray.concat(this.boardArray[i++]);
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
                var i = 0; while (i < this.boardArray.length) myTempArray = myTempArray.concat(this.boardArray[i++]);
                myTempArray.reverse();
                this.inflate(myTempArray);


                break;

        }
    }

    /**
     * genera un numero aleatorio donde sea posible
     */
    public generateCell = function () {
        var auxArray = this.getBoardInSimpleArray();
        var newNumber = Math.random() > 0.9 ? 4 : 2;
        var voidCells = [];
        var random = Helper.ranMinMax(0, voidCells.length - 1);

        for (var i = 0; i < auxArray.length; i++)
            if (auxArray[i].cell == 0)
                voidCells.push(auxArray[i]);

        var pos = [voidCells[random].pos[0], voidCells[random].pos[1]];
        console.log(pos)
        this.boardArray[pos[0]][pos[1]] = newNumber;

        this.paint();
    }

    /**
     * Comprueba si ha perdido
     */
    public isLost() {
        var auxArray = this.getBoardInSimpleArray();
        var isLost = true;

        for (var i = 0; i < auxArray.length; i++) {
            if (auxArray[i].cell == 0) {
                isLost = false;
            }
        }
        console.log(isLost)

        // Comprobar si no hay casillas vacias
        // Comprobar si se puede hacer algun movimiento en alguna direccion
        return isLost;
    }

    /**
    * Comprueba si ha ganado
    */
    public isWin() {
        var auxArray = this.getBoardInSimpleArray();

        for (var i = 0; i < auxArray.length; i++)
            if (auxArray[i].cell == 2048) {
                console.log("WIN!!!!!!!!!")
                return true;
            }

        return false;
    }

    /**
     * Pinta el tablero
     */
    public paint = function () {
        var node = document.getElementById("board");
        node.innerHTML = "";

        var aux = 0;
        for (var i = 0; i < this.boardArray.length; i++)
            for (var a = 0; a < this.boardArray[i].length; a++) {

                var listClass = "cell" + this.level;

                if (this.cell(i + 1, a + 1) == 0)
                    listClass += " void ";

                if (this.cell(i + 1, a + 1) == 2) listClass += " _2 ";
                if (this.cell(i + 1, a + 1) == 4) listClass += " _4 ";
                if (this.cell(i + 1, a + 1) == 8) listClass += " _8 ";
                if (this.cell(i + 1, a + 1) == 16) listClass += " _16 ";
                if (this.cell(i + 1, a + 1) == 32) listClass += " _32 ";
                if (this.cell(i + 1, a + 1) == 64) listClass += " _64 ";
                if (this.cell(i + 1, a + 1) == 128) listClass += " _128 ";
                if (this.cell(i + 1, a + 1) == 256) listClass += " _256 ";
                if (this.cell(i + 1, a + 1) == 512) listClass += " _512 ";
                if (this.cell(i + 1, a + 1) == 1024) listClass += " _1024 ";
                if (this.cell(i + 1, a + 1) >= 2048) listClass += " _2048 ";

                if (aux + this.level != this.size[1])
                    node.innerHTML += '<div class="cell ' + listClass + '"><span>' + this.cell(i + 1, a + 1) + '</span></div>'
                else
                    node.innerHTML += '<div class="cell noFloat ' + listClass + '"><span>' + this.cell(i + 1, a + 1) + '</span></div>'

                aux++;

                if (aux == this.size[1]) {
                    aux = 0;
                }
            }
    }

    private updateScore(score: number) {
        this.score += score;
        //this.crtl.score = this.score;
        //console.log(this.crtl.score)
    }

    /* Getters & Setters */

    public getScore() {
        return this.score;
    }
}