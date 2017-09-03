/**
 * Clase padre para la creacion y manipulacion de tableros genericos sin representacion grafica.
 */
class Board {

    protected id: string;
    protected size: number[]; //[NxM]
    protected autoGen: boolean;
    protected boardArray: any[][];

    constructor(id: string, size: number[], autoGen: boolean) {
        this.id = id;
        this.size = size; // Dimensiones [NxM] N: filas
        this.autoGen = autoGen || false;
        this.boardArray = null;


        if (this.autoGen)
            this.generate();
    }

    /**
     * Genera el array bidimensional del tablero
     */
    public generate() {
        var N = this.size[0];
        var M = this.size[1];

        this.boardArray = new Array(N);

        for (var i = 0; i < this.boardArray.length; i++)
            this.boardArray[i] = new Array(M);
    }

    /**
     * Devuelve el contenido de una celda por notacion [N,M]
     */
    public cell(N: number, M: number) {
        if (N > this.size[0] || M > this.size[1]) {
            console.log(":: ERROR :: Out of range.")
            return null;
        }

        return this.boardArray[N - 1][M - 1];
    }

    /**
     * Manda un valor a una celda [NxM]
     */
    public cellSetValue(N: number, M: number, value: any) {
        this.boardArray[N - 1][M - 1] = value;
    }

    /**
     * Rellena el tablero por un array unidimensional si no llegan suficientes datos los espacios los rellena con nulls
     */
    public inflate(arr: any[]) {
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
    }

    /**
     * Rellena todas las casillas del tablero con el mismo valos
     */
    public inflateAll(item: any) { }

    /**
     * Devuelve una celda al azar
     */
    public cellRandom(item: any) { }

    /**
     * Devuelve el tablero como un array e una dimension
     */
    public getBoardInSimpleArray() {
        var aux: any[] = [];

        for (var i = 0; i < this.boardArray.length; i++)
            for (var a = 0; a < this.boardArray[i].length; a++)
                aux.push({ cell: this.boardArray[i][a], pos: [i, a] })

        return aux;
    }


    // Eventos a celdas individuales
    // Eventos a celdas colectivo
    protected onAll = function (event: any, callback: any) {
        for (var i = 0; i < this.boardArray.length; i++)
            for (var a = 0; a < this.boardArray[i].length; a++) {
                this.boardArray[i][a].addEventListener(event, callback);
            }
    }

    // Getters & Setters
    public getBoard() {
        return this.boardArray;
    }
    public setBoard(newBoard: any[][]) {
        this.boardArray = newBoard;
    }
}