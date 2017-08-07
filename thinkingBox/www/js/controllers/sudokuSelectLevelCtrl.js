appControllers.controller('sudokuSelectLevelCtrl', ['$scope', 'sessionService', '$state', 'bridgeService', '$ionicSideMenuDelegate', '$ionicPopup',
    function ($scope, sessionService, $state, bridgeService, $ionicSideMenuDelegate, $ionicPopup) {

        updateInfo();

        $scope.selectLevel = function (level) {
            bridgeService.data.sudokuSelectLevel = level;
            $state.go("sudokuBoard");
        }

        $scope.openSettings = function () {
            $ionicSideMenuDelegate.toggleLeft();
        }

        $scope.confirmRemoveBoard = function (level) {
            var l = sessionService.get("config").lenguage;
            var d = dictionary;
            var confirmPopup = $ionicPopup.confirm({
                title: Translator.get("sudokuSelectLevelCtrl_titlePopUp", l, d),
                template: Translator.get("sudokuSelectLevelCtrl_msgPopUp", l, d),
                cancelText: Translator.get("sudokuSelectLevelCtrl_cancelPopUp", l, d),
                okText: Translator.get("sudokuSelectLevelCtrl_acceptPopUp", l, d)
            });

            confirmPopup.then(function (res) {
                if (res) {
                    removeBoard(level);
                    updateInfo()
                } else { }
            });
        }

        function updateInfo() {
            var progressSudoku = sessionService.get("progressSudoku");
            $scope.easyWins = progressSudoku.easy.wins;
            $scope.easyTime = millisToMinutesAndSeconds(progressSudoku.easy.time);
            $scope.normalWins = progressSudoku.normal.wins;
            $scope.normalTime = millisToMinutesAndSeconds(progressSudoku.normal.time);
            $scope.hardWins = progressSudoku.hard.wins;
            $scope.hardTime = millisToMinutesAndSeconds(progressSudoku.hard.time);
            $scope.veryHardWins = progressSudoku.veryHard.wins;
            $scope.veryHardTime = millisToMinutesAndSeconds(progressSudoku.veryHard.time);
        }

        function removeBoard(level) {
            var aux = sessionService.get("progressSudoku");
            aux[level].board = null;
            aux[level].time = "--";
            sessionService.set("progressSudoku", aux);
        }

        function millisToMinutesAndSeconds(millis) {
            if (millis == '--') return "--";

            var minutes = Math.floor(millis / 60000);
            var seconds = ((millis % 60000) / 1000).toFixed(0);
            var result  = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            
            return result;
        }


        // Traduccion
        $scope.$on("changeLanguage", function () { translate() });

        function translate() {
            Translator.translate($scope, sessionService.get("config").lenguage, [
                "sudokuSelectLevelCtrl_easy",
                "sudokuSelectLevelCtrl_normal",
                "sudokuSelectLevelCtrl_hard",
                "sudokuSelectLevelCtrl_veryHard",
                "sudokuSelectLevelCtrl_wins",
                "sudokuSelectLevelCtrl_time"
            ]);
        }

        translate();
        // Fin Traduccion
    }])