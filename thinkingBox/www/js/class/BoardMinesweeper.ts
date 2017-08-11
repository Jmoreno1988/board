class BoardMinesweeper extends Board {

    constructor(id: string, size: number[], autoGen: boolean) {
        super(id, size, autoGen);
    }

    public init() {
        // Rellenamos el tablero
        this.inflate(auxArr);


        // Asociamos las escuchas 
        //document.onkeydown = this.handlerKey.bind(this);

        // Representacion grafica del tablero
        this.paint();
    }

    /**
     * Pinta el tablero
     */
    public paint = function () {
        
    }
}