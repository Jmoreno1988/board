appControllers.controller('chessSelectLevelCtrl', ['$scope', 'sessionService', '$state', 'bridgeService', '$ionicSideMenuDelegate', '$ionicPopup',
    function ($scope, sessionService, $state, bridgeService, $ionicSideMenuDelegate, $ionicPopup) {

        updateInfo();

        $scope.selectLevel = function (level) {
            bridgeService.data.chessSelectLevel = level;
            $state.go("chessBoard");
        }

        $scope.openSettings = function () {
            $ionicSideMenuDelegate.toggleLeft();
        }

        $scope.confirmRemoveBoard = function (level) {
            var l = sessionService.get("config").lenguage;
            var d = dictionary;
            var confirmPopup = $ionicPopup.confirm({
                title: Translator.get("chessSelectLevelCtrl_titlePopUp", l, d),
                template: Translator.get("chessSelectLevelCtrl_msgPopUp", l, d),
                cancelText: Translator.get("chessSelectLevelCtrl_cancelPopUp", l, d),
                okText: Translator.get("chessSelectLevelCtrl_acceptPopUp", l, d)
            });

            confirmPopup.then(function (res) {
                if (res) {
                    removeBoard(level);
                    updateInfo();
                } else { }
            });
        }

        function updateInfo() {
            var progressChess = sessionService.get("progressChess");

            $scope.easyWins = progressChess.easy.wins;
            $scope.easyDefeats = progressChess.easy.defeats;
            $scope.easyMoves = progressChess.easy.moves;
            $scope.easyTime = Util.millisToMinutesAndSeconds(progressChess.easy.time);
            $scope.normalWins = progressChess.normal.wins;
            $scope.normalDefeats = progressChess.normal.defeats;
            $scope.normalMoves = progressChess.normal.moves;
            $scope.normalTime = Util.millisToMinutesAndSeconds(progressChess.normal.time);
            $scope.hardWins = progressChess.hard.wins;
            $scope.hardDefeats = progressChess.hard.defeats;
            $scope.hardMoves = progressChess.hard.moves;
            $scope.hardTime = Util.millisToMinutesAndSeconds(progressChess.hard.time);
        }

        function removeBoard(level) {
            var aux = sessionService.get("progressChess");
            
            aux[level].fen = null;
            aux[level].time = "--";
            aux[level].moves = 0;
            sessionService.set("progressChess", aux);
        }


        // Traduccion
        $scope.$on("changeLanguage", function () { translate() });

        function translate() {
            Translator.translate($scope, sessionService.get("config").lenguage, [
                "chessSelectLevelCtrl_easy",
                "chessSelectLevelCtrl_normal",
                "chessSelectLevelCtrl_hard",
                "chessSelectLevelCtrl_wins",
                "chessSelectLevelCtrl_defeats",
                "chessSelectLevelCtrl_moves",
                "chessSelectLevelCtrl_time"
            ]);
        }

        translate();
        // Fin Traduccion
    }])