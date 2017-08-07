appControllers.controller('chessResultCtrl', ['$scope', '$rootScope', 'sessionService', 'bridgeService', '$ionicSideMenuDelegate',
    function ($scope, $rootScope, sessionService, bridgeService, $ionicSideMenuDelegate) {

        var level = bridgeService.data.chessSelectLevel;
        var time = bridgeService.data.timeChess;
        var levelWin = bridgeService.data.levelWinChess;
        var isWin = level >= levelWin ? true : false;
        var msgResult = isWin ? "You win!!" : "You lose";
        var totalMoves = bridgeService.data.totalMovesChess;
        var totalWins = bridgeService.data.totalWinsChess;
        var totalDefeats = bridgeService.data.totalDefeatsChess;

        $scope.isWin = msgResult;
        $scope.selectLevel = level;
        $scope.time = millisToMinutesAndSeconds(time);
        $scope.totalMoves = totalMoves;
        //$scope.totalWins = totalWins;
        //$scope.totalDefeats = totalDefeats;

        if (isWin) {
            disableNodes(["stateGameFail", "fail"]);
        } else {
            disableNodes(["stateGameSuccess", "medal"]);
        }

        $scope.openSettings = function () { $ionicSideMenuDelegate.toggleLeft() }

        function disableNodes(ids) {
            for (var i = 0; i < ids.length; i++)
                document.getElementById(ids[i]).style.display = "none";
        }

        function millisToMinutesAndSeconds(millis) {
            var minutes = Math.floor(millis / 60000);
            var seconds = ((millis % 60000) / 1000).toFixed(0);
            return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
        }


        // Traduccion
        $scope.$on("changeLanguage", function () { translate() });

        function translate() {
            Translator.translate($scope, sessionService.get("config").lenguage, [
                "chess_Result_fail",
                "chess_Result_success",
                "chess_Result_time",
                "chess_Result_totalMoves",
                "chess_Result_home",
                "chess_Result_levels"

            ]);
        }

        translate();
        // Fin Traduccion
    }])