GameChess.prototype.constructor = GameChess;

function GameChess(options) {
    this.ctrl = options.ctrl;
    this.rootScope = options.rootScope;
    this.g_validMoves = null;
    this.g_allMoves = [];
    this.g_Checkmate = false;
    this.g_Stalemate = false;
    this.board = null;
    this.sessionService = options.sessionService;
    this.level = options.level;
    this.initFen = this.sessionService.get("progressChess")[this.level].fen || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    this.auxChessjs = new Chess(this.initFen);
    this.timeMilli = this.sessionService.get("progressChess")[this.level].time;
    this.timer = new Timer(options.ctrl, options.interval, this.timeMilli);
    this.state = options.state;
    this.totalMoves = this.sessionService.get("progressChess")[this.level].moves;
    this.bridgeService = options.bridgeService; 
    this.isFinish = false;
}

GameChess.prototype.init = function () {
    this.board = new Chessboard('boardChess', {
        position: this.initFen,
        eventHandlers: {
            onPieceSelected: this.pieceSelected.bind(this),
            onMove: this.pieceMove.bind(this)
        }
    });


    ResetGame(this.initFen);
    this.board.setPosition(this.initFen, true);
    this.updateGameInfo();
    this.g_Checkmate = false;
    this.g_Stalemate = false;
    this.g_timeout = 10;

    // Listener
    this.ctrl.$on('$destroy', function (evt) {
        this.save();
        this.rootScope.$broadcast('finishGameChess');
    }.bind(this));

    this.timer.sCallback = this.step.bind(this);
    this.timer.init();
}

GameChess.prototype.step = function() {
    this.ctrl.timer = this.timer.getTime();
    this.ctrl.totalMoves = this.totalMoves;
    this.ctrl.actualTurn = this.totalMoves % 2 ? "black" : "white";
    
    if(this.auxChessjs.in_check())
        document.getElementById("labelCheck").style.display = "block";
    else 
        document.getElementById("labelCheck").style.display = "none";

    if(this.auxChessjs.in_checkmate()) {
        document.getElementById("labelCheck").style.display = "none";
        document.getElementById("labelCheckMate").style.display = "block";
    } else {
        document.getElementById("labelCheckMate").style.display = "none";
    }

    this.save();
}

GameChess.prototype.save = function () {
    var aux = this.sessionService.get("progressChess");

    aux[this.level].fen = GetFen();
    aux[this.level].time = this.timer.getTimeMillis();
    aux[this.level].moves = this.totalMoves;

    this.sessionService.set("progressChess", aux);
}

GameChess.prototype.updateGameInfo = function () {
    this.auxChessjs.load(GetFen());

    if (this.auxChessjs.game_over())
        console.log("Game over")

    if (this.auxChessjs.in_check())
        console.log("in_check")

    if (this.auxChessjs.in_checkmate())
        this.isFinish = true;

    if (this.auxChessjs.in_draw())
        console.log("in_draw")

    if (this.auxChessjs.in_stalemate())
        console.log("in_stalemate")

    if (this.auxChessjs.in_threefold_repetition())
        console.log("in_threefold_repetition")

    if(this.auxChessjs.game_over()) {
        this.finish();
        this.state.go("chessResult", {});
    }

/*
    var fen = GetFen();
    if(this.auxChessjs.validate_fen(GetFen()))
        console.log(this.auxChessjs.validate_fen(GetFen()))
    else 
        console.log(this.auxChessjs.validate_fen(GetFen()))
  */  
    this.save();
}

GameChess.prototype.finish = function() {
    this.bridgeService.data.timeChess = this.timer.getTimeMillis();
    this.bridgeService.data.levelWinChess = (this.totalMoves % 2) ? true : false;
    this.bridgeService.data.totalMovesChess = this.totalMoves;
    this.bridgeService.data.totalWinsChess = this.sessionService.get("progressChess")[this.level].wins;
    this.bridgeService.data.totalDefeatsChess = this.sessionService.get("progressChess")[this.level].defeats;
}

GameChess.prototype.undoGame = function () {
    if (this.g_allMoves.length === 0) {
        return;
    }

    UnmakeMove(this.g_allMoves[this.g_allMoves.length - 1]);
    this.g_allMoves.pop();
    UnmakeMove(this.g_allMoves[this.g_allMoves.length - 1]);
    this.g_allMoves.pop();

    this.g_Checkmate = false;
    this.g_Stalemate = false;

    this.g_validMoves = GenerateValidMoves();

    this.board.setPosition(GetFen());
    
    this.totalMoves--;
    this.updateGameInfo(true);
}

GameChess.prototype.pieceMove = function (move) {
    var i,
        moveFromX = ChessUtils.convertIndexToColumn(ChessUtils.convertNotationSquareToIndex(move.from)),
        moveFromY = ChessUtils.convertIndexToRow(ChessUtils.convertNotationSquareToIndex(move.from)),
        moveToX = ChessUtils.convertIndexToColumn(ChessUtils.convertNotationSquareToIndex(move.to)),
        moveToY = ChessUtils.convertIndexToRow(ChessUtils.convertNotationSquareToIndex(move.to));

    for (i = 0; i < this.g_validMoves.length; i++) {
        fromX = (this.g_validMoves[i] & 0xF) - 4;
        fromY = 7 - (((this.g_validMoves[i] >> 4) & 0xF) - 2);
        toX = ((this.g_validMoves[i] >> 8) & 0xF) - 4;
        toY = 7 - (((this.g_validMoves[i] >> 12) & 0xF) - 2);

        if ((moveFromX === fromX) && (moveFromY === fromY) && (moveToX === toX) && (moveToY === toY)) {

            this.board.enableUserInput(false);

            this.g_allMoves[this.g_allMoves.length] = this.g_validMoves[i];
            MakeMove(this.g_validMoves[i]);

            this.updateGameInfo('');

            this.g_validMoves = null;

            if (GenerateValidMoves().length === 0) {
                if (this.g_inCheck) {
                    this.g_Checkmate = true;
                } else {
                    this.g_Stalemate = true;
                }
            } else {
                setTimeout(this.blackMoves.bind(this), 1000);
            }
            this.totalMoves++;
            return GetFen();
        }

    }
    
    return false;
}

GameChess.prototype.blackMoves = function () {
    this.totalMoves++;
    Search(function (nextMove) {
        this.g_allMoves[this.g_allMoves.length] = nextMove;
        MakeMove(nextMove);

        if (GenerateValidMoves().length === 0) {
            if (this.g_inCheck) {
                this.g_Checkmate = true;
            } else {
                this.g_Stalemate = true;
            }
        }
        
        this.updateGameInfo();

        this.board.setPosition(GetFen());
        this.board.enableUserInput(true);
        
    }.bind(this), 99, null);
}

GameChess.prototype.gcMoveToXY = function (gcMove) {
    return {
        fromX: (gcMove & 0xF) - 4,
        fromY: 7 - (((gcMove >> 4) & 0xF) - 2),
        toX: ((gcMove >> 8) & 0xF) - 4,
        toY: 7 - (((gcMove >> 12) & 0xF) - 2)
    }
}

GameChess.prototype.pieceSelected = function (notationSquare) {
    var i,
        pieceColumn,
        pieceRow,
        fromX,
        fromY,
        toX,
        toY,
        moves,
        movesPosition = [];

    if (!this.g_validMoves || this.g_validMoves === null) {
        this.g_validMoves = GenerateValidMoves();
    }

    pieceColumn = ChessUtils.convertIndexToColumn(ChessUtils.convertNotationSquareToIndex(notationSquare));
    pieceRow = ChessUtils.convertIndexToRow(ChessUtils.convertNotationSquareToIndex(notationSquare));

    for (i = 0; i < this.g_validMoves.length; i++) {
        fromX = this.gcMoveToXY(this.g_validMoves[i]).fromX;
        fromY = this.gcMoveToXY(this.g_validMoves[i]).fromY;
        toX = this.gcMoveToXY(this.g_validMoves[i]).toX;
        toY = this.gcMoveToXY(this.g_validMoves[i]).toY;

        if ((pieceColumn === fromX) && (pieceRow === fromY)) {
            movesPosition.push(ChessUtils.convertRowColumnToIndex(toY, toX));
        }

    }
    return movesPosition;
}


GameChess.prototype.showFen = function () {
    console.log(GetFen())
}