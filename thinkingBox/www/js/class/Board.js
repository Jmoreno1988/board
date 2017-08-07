/**
 * Calse abstracta para la creacion y manipulacion de tableros genericos sin representacion grafica.
 */
Board.prototype.constructor = Board;

// var b = new Board("idBoard", [NxM]);
function Board(id, size, autoGen) {
    this.id = id;
    this.size = size; // Dimensiones [NxM] N: filas
    this.autoGen = autoGen || false;
    this.board = null;


    if (this.autoGen)
        this.generate();
}

/**
 * Genera el array bidimensional del tablero
 */
Board.prototype.generate = function () {
    var N = this.size[0];
    var M = this.size[1];

    this.board = new Array(N);
    
    for(var i = 0; i < this.board.length; i++)
        this.board[i] = new Array(M);
}

/**
 * Devuelve el contenido de una celda por notacion [N,M]
 */
Board.prototype.cell = function(N, M) {
    if(N > this.size[0] || M > this.size[1]){
        console.log(":: ERROR :: Out of range.")
        return null;
    }

    return this.board[N - 1][M - 1];
}

/**
 * Manda un valor a una celda [NxM]
 */
Board.prototype.cellSetValue = function(N, M, value) {
    this.board[N - 1][M - 1] = value;
}

/**
 * Rellena el tablero por un array unidimensional si no llegan suficientes datos los espacios los rellena con nulls
 */
Board.prototype.inflate = function(arr) {
    var a = 0, e = 0;

    for(var i = 0; i < arr.length; i++){
        var aux = arr[i]
        this.board[a][e] = aux;
        e++;

        if(e == this.size[1]) {
            a++;
            e = 0;
        }
    }
}

/**
 * Rellena todas las casillas del tablero con el mismo valos
 */
Board.prototype.inflateAll = function(item) {}

/**
 * Devuelve una celda al azar
 */
Board.prototype.cellRandom = function(item) {

}


// Eventos a celdas individuales
// Eventos a celdas colectivo


// Getters & Setters
Board.prototype.getBoard = function() {
    return this.board;
}
Board.prototype.setBoard = function(newBoard) {
    this.board = newBoard;
}
