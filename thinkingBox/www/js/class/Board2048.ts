class Board2048 extends Board{

    constructor(id: string, size: number[], autoGen: boolean) {
        super(id, size, autoGen);
    }

    public init() {
        // Rellenamos el tablero
        // dos nuemros '2' en dos posiciones aleatorias del tablero
        this.inflate([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

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
    private handlerKey = (e: any) =>  {
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

        this.generateCell();
        this.paint();
    }

    /**
     * 
     */
    private moveCells(direction:string) {
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
                var myTempArray:any[] = [];
                var i = 0; while (i < this.boardArray.length) myTempArray = myTempArray.concat(this.boardArray[i++]);
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

                if (aux + 4 != this.size[1])
                    node.innerHTML += '<div class="cell"><span>' + this.cell(i + 1, a + 1) + '</span></div>'
                else
                    node.innerHTML += '<div class="cell noFloat"><span>' + this.cell(i + 1, a + 1) + '</span></div>'

                aux++;

                if (aux == this.size[1]) {
                    aux = 0;
                }
            }
    }
}