class BoardClown extends Board {

    private level: number;
    private crtl: any;
    private img: string;

    constructor(id: string, size: number[], level: number, img:string, autoGen: boolean, crtl: any) {
        super(id, size, autoGen);

        this.level = level;
        this.crtl = crtl;
        this.img = img;
    }

    public init() {
        var size = this.size[0] * this.size[0];
        var listNodes: any = [];

        for (var i = 0; i < size; i++) {
            var n = document.createElement("div");
            n.setAttribute("class", "cell cell" + this.level);
            (<any>n).innerHTML = i;
            listNodes.push(n);
        }

        this.inflate(listNodes);
        this.randomCells();
        this.paint();
        
        this.onAll("click", this.moveCells.bind(this));

    }

    /**
 * 
 */
    private moveCells = function (evt: any) {
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

        } else if (index[0] + 1 <= this.boardArray[1].length - 1 && this.boardArray[index[0] + 1][index[1]].innerHTML == "0") {
            this.boardArray[index[0] + 1][index[1]].innerHTML = this.boardArray[index[0]][index[1]].innerHTML;
            this.boardArray[index[0]][index[1]].innerHTML = "0";
        }


        this.paint();

    }

    private randomCells() {
        var aLength = this.boardArray[0].length;
        var totalL = this.getBoardInSimpleArray().length;
        var interractions = totalL * 3;
        
        for(var i = 0; i < interractions; i++) {
            var r1 = Helper.ranMinMax(0, aLength - 1);
            var r2 = Helper.ranMinMax(0, aLength - 1);
            var r3 = Helper.ranMinMax(0, aLength - 1);
            var r4 = Helper.ranMinMax(0, aLength - 1);

            var cell1 = this.boardArray[r1][r2];
            var cell2 = this.boardArray[r1][r2];

            console.log(cell1)
            
        }
    }

    private getIndexCellByNum = function (num: number) {
        for (var i = 0; i < this.boardArray.length; i++)
            for (var a = 0; a < this.boardArray[i].length; a++) {
                if (this.boardArray[i][a].innerHTML == num)
                    return [i, a];
            }

        return null;
    }

    /**
     * Pinta el tablero
     */
    private paint = function () {
        var nodeBoard = document.getElementById("board");
        nodeBoard.innerHTML = "";

        var aux = 0;
        for (var i = 0; i < this.boardArray.length; i++)
            for (var a = 0; a < this.boardArray[i].length; a++) {
                if (aux != this.size[1]) {
                    var cell = this.cell(i + 1, a + 1)
                    var num = this.boardArray[i][a].innerHTML;
                    var url = "img/clow/" + this.img + "/"+ this.level +"x"+ this.level +"/" + num + ".jpg";

                    cell.style.backgroundImage = "url(" + url + ")";
                    nodeBoard.appendChild(cell);
                    aux++;
                } else {
                    var cell = this.cell(i + 1, a + 1);
                    var num = this.boardArray[i][a].innerHTML;
                    var url = "img/clow/" + this.img + "/"+ this.level +"x"+ this.level +"/" + num + ".jpg";
                    cell.setAttribute("class", "cell noFloat cell" + this.level);
                    cell.style.backgroundImage = "url(" + url + ")";
                    nodeBoard.appendChild(cell);
                    aux = 1;
                }
            }

        // La casilla con valor 0 no la pintamos es la casilla vacia
        for (var i = 0; i < this.boardArray.length; i++)
            for (var a = 0; a < this.boardArray[i].length; a++) {
                if (this.boardArray[i][a].innerHTML == "0") {
                    this.boardArray[i][a].style.backgroundImage = "";
                }
            }
    }
}