var cfg = {
    version: "1.1.0",
    // Caution !!!
    resetLocalStorage: false,
    isForPaymentVersion: false,

    // Url del servidor
    urlServer: "http://localhost:3000/",
    // urlServer: "http://46.101.187.32:3000/",

    modelObjectLocalStorage: {
        progress: {
            mathCalcu: {
                easy: {
                    lastScore: 0,
                    maxScore: 0
                },
                normal: {
                    lastScore: 0,
                    maxScore: 0
                },
                hard: {
                    lastScore: 0,
                    maxScore: 0
                },
                master: {
                    lastScore: 0,
                    maxScore: 0
                },
                kids: {
                    lastScore: 0,
                    maxScore: 0
                },
                survival: {
                    lastScore: 0,
                    maxScore: 0
                }
            },

            sudoku: {
                easy: {
                    board: null,
                    wins: 0,
                    time: "--"
                },

                normal: {
                    board: null,
                    wins: 0,
                    time: "--"
                },
                
                hard: {
                    board: null,
                    wins: 0,
                    time: "--"
                },

                veryHard: {
                    board: null,
                    wins: 0,
                    time: "--"
                }
            },

            chess: {
                easy:{
                    fen: null,
                    time: "--",
                    wins: 0,
                    defeats: 0,
                    moves: 0
                },

                normal:{
                    fen: null,
                    time: "--",
                    wins: 0,
                    defeats: 0,
                    moves: 0
                },

                hard:{
                    fen: null,
                    time: "--",
                    wins: 0,
                    defeats: 0,
                    moves: 0
                }
            }
        },

        config: {
            isSound: false,
            isEvaluate: false,
            isVibration: true,
            lenguage: "en"
        },

        infoUser: {
            id: null,
            nick: null,
            email: null
        }
    }
}