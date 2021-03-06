class BoardClown extends Board {

    private level: number;
    private crtl: any;
    private interval: any;
    private img: string;
    private timer: TimerTs;
    private timeMilli: number;

    constructor(id: string, size: number[], level: number, img: string, autoGen: boolean, crtl: any, interval: any) {
        super(id, size, autoGen);

        this.level = level;
        this.crtl = crtl;
        this.img = img;
        this.interval = interval;
        this.timeMilli = 0;
        this.timer = new TimerTs(crtl, interval, this.timeMilli);
    }

    public init() {
        var size = this.size[0] * this.size[0];
        var listNodes: any = [];
        var w = (document.getElementById("board").offsetWidth * 0.95) / this.level;

        for (var i = 0; i < size; i++) {
            var n = document.createElement("div");
            n.setAttribute("class", "cell cell" + this.level);
            (<any>n).innerHTML = i;
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
    }

    private step = function() {
        this.crtl.updateTimer(this.timer.getTime());
    }

    public flip() {
        Helper.node("flipper").classList.toggle("flipping");
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
        
        // Mostrar PopUp fin de partida
        if(this.isWin()) {
            this.timer.finish();
            this.crtl.endGame();
        }        
    }

    private randomCells(isInit?: boolean) {
        for (var i = 0; i < this.boardArray.length; i++)
            for (var a = 0; a < this.boardArray[i].length; a++) {
                var r1 = Helper.ranMinMax(0, this.boardArray.length - 1)
                var r2 = Helper.ranMinMax(0, this.boardArray[0].length - 1)
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
    }

    private getIndexCellByNum = function (num: number) {
        for (var i = 0; i < this.boardArray.length; i++)
            for (var a = 0; a < this.boardArray[i].length; a++) {
                if (this.boardArray[i][a].innerHTML == num)
                    return [i, a];
            }

        return null;
    }

    private isWin() {
        var aux = 0;
        var max = (this.level * this.level) - 1;
        for (var i = 0; i < this.boardArray.length; i++)
            for (var a = 0; a < this.boardArray[i].length; a++) {
                if(this.boardArray[i][a].innerHTML == aux)
                    if(aux == max)
                        return true;
                    else        
                        aux++;
                else
                    return false;
            }
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
                    var url = "img/clow/" + this.img + "/" + this.level + "x" + this.level + "/" + num + ".jpg";

                    cell.style.backgroundImage = "url(" + url + ")";
                    nodeBoard.appendChild(cell);
                    aux++;
                } else {
                    var cell = this.cell(i + 1, a + 1);
                    var num = this.boardArray[i][a].innerHTML;
                    var url = "img/clow/" + this.img + "/" + this.level + "x" + this.level + "/" + num + ".jpg";
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