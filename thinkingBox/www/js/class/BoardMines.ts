class BoardMines extends Board {

    private level: number;
    private crtl: any;
    private interval: any;
    private img: string;
    private timer: TimerTs;
    private timeMilli: number;
    private mines: number;

    constructor(id: string, size: number[], level: number, mines: number, autoGen: boolean, crtl: any, interval: any) {
        super(id, size, autoGen);

        this.level = level;
        this.crtl = crtl;
        this.interval = interval;
        this.timeMilli = 0;
        this.timer = new TimerTs(crtl, interval, this.timeMilli);
        this.mines = mines;
    }

    public init() {
        var size = this.size[0] * this.size[0];
        var listNodes: any = [];
        var w = (document.getElementById("board").offsetWidth * 0.95) / this.level;

        for (var i = 0; i < size; i++) {
            var n = document.createElement("div");
            n.setAttribute("class", "cell cell" + this.level);
            (<any>n).innerHTML = '';
            listNodes.push(n);
            n.style.width = w + "px";
            n.style.height = w + "px";
        }

        this.generateMines(listNodes);
        this.inflate(listNodes);
        this.generateNumbers();
        this.paint();

        //this.onAll("click", this.moveCells.bind(this));

        document.getElementById("board").style.width = w * this.level + "px";
        document.getElementById("board").style.height = w * this.level + "px";

        this.timer.sCallback = this.step.bind(this);
        this.timer.init();
    }

    private generateMines(listNodes: any) {
        let totalMines = this.mines;

        do {
            let rand = Helper.ranMinMax(0, listNodes.length - 1);

            if (listNodes[rand].innerHTML != 'x') {
                listNodes[rand].innerHTML = 'x';
                totalMines = totalMines - 1;
            }


        } while (totalMines != 0);
    }

    private generateNumbers() {
        for (var i = 0; i < this.boardArray.length; i++)
            for (var a = 0; a < this.boardArray[i].length; a++) {
                if (this.boardArray[i][a].innerHTML == 'x'){ 
                    this.boardArray[i][a].style.backgroundImage = 'url("img/mines/numbers/x.svg")';
                    continue;
                }

                let cell = this.boardArray[i][a];
                let n = 0;
                let length = this.boardArray[i].length - 1;
                let cellDown = i - 1 >= 0 ? this.boardArray[i - 1][a] : null;
                let cellUp = i + 1 <= length ? this.boardArray[i + 1][a] : null;
                let cellRight = a - 1 >= 0 ? this.boardArray[i][a - 1] : null;
                let cellLeft = a + 1 <= length ? this.boardArray[i][a + 1] : null;
                let cellDownRight = i - 1 >= 0 && a - 1 >= 0 ? this.boardArray[i - 1][a - 1] : null;
                let cellUpLeft = i + 1 <= length && a + 1 <= length ? this.boardArray[i + 1][a + 1] : null;
                let cellDownLeft = i - 1 >= 0 && a + 1 <= length ? this.boardArray[i - 1][a + 1] : null;
                let cellUpRight = i + 1 <= length && a - 1 <= length ? this.boardArray[i + 1][a - 1] : null;

                if (cellUp && cellUp.innerHTML == 'x') n++;
                if (cellDown && cellDown.innerHTML == 'x') n++;
                if (cellLeft && cellLeft.innerHTML == 'x') n++;
                if (cellRight && cellRight.innerHTML == 'x') n++;
                if (cellDownRight && cellDownRight.innerHTML == 'x') n++;
                if (cellUpLeft && cellUpLeft.innerHTML == 'x') n++;
                if (cellDownLeft && cellDownLeft.innerHTML == 'x') n++;
                if (cellUpRight && cellUpRight.innerHTML == 'x') n++;


                
                if (n > 0) {
                    cell.style.backgroundImage = 'url("img/mines/numbers/' + n + '.svg")';
                    cell.innerHTML = n;
                } else {
                    cell.innerHTML = '';
                }
            }
    }

    private step = function () {
        this.crtl.updateTimer(this.timer.getTime());
    }

    /**
    * 
    */
    private moveCells = function (evt: any) {
        var cellNum = evt.target.innerHTML;
        var index = this.getIndexCellByNum(cellNum);
        var cell = this.boardArray[index[0]][index[1]];

        cell.style.backgroundImage = 'url("img/mines/flag.svg")';
        cell.style.backgroundColor = 'white';

        //this.paint();

        /*
        // Mostrar PopUp fin de partida
        if (this.isWin()) {
            this.timer.finish();
            this.crtl.endGame();
        }
        */
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
                    nodeBoard.appendChild(cell);
                    aux++;
                } else {
                    var cell = this.cell(i + 1, a + 1);
                    var num = this.boardArray[i][a].innerHTML;
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