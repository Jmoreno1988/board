appControllers.controller('resultCtrl', ['$scope', '$rootScope', '$stateParams', 'bridgeService', '$ionicSideMenuDelegate', '$state', "sessionService",
    function ($scope, $rootScope, $stateParams, bridgeService, $ionicSideMenuDelegate, $state, sessionService) {
        var listScores = bridgeService.data.listScore;
        var totalScore = listScores.reduce(function (a, b) { return a + b; }, 0);
        var timeTotal = bridgeService.data.timeCal;
        var level = bridgeService.data.levelCal;
        var selectLevel = bridgeService.data.selectLevel;
        var levelWin = bridgeService.data.levelCalWin;
        var isWin = level >= levelWin ? true : false;
        var msgResult = isWin ? "You win!!" : "You lose";

        $scope.isWin = msgResult;
        $scope.level = level;
        $scope.levelWin = levelWin;
        $scope.timeTotal = timeTotal;
        $scope.totalScore = totalScore;
        $scope.selectLevel = selectLevel;

        if (isWin) {
            disableNodes(["stateGameFail", "fail"]);
        } else {
            disableNodes(["stateGameSuccess", "medal"]);
        }

        $scope.openSettings = function () { $ionicSideMenuDelegate.toggleLeft() }

        $scope.goTo = function (page) {
            $state.go(page);
        }

        function disableNodes(ids) {
            for (var i = 0; i < ids.length; i++)
                document.getElementById(ids[i]).style.display = "none";
        }

        /*
        // Graficos
        var labels = [];

        for (var i = 0; i < listScores.length; i++)
            labels.push("L" + (i + 1));

        new Chartist.Line('.ct-chart', {
            labels: labels,
            series: [listScores]
        }, {
                fullWidth: true,
                chartPadding: {
                    right: 40
                }
            });
*/

        // Traduccion
        $scope.$on("changeLanguage", function () { translate() });

        function translate() {
            Translator.translate($scope, sessionService.get("config").lenguage, [
                "result_totalScore",
                "result_level",
                "result_timeTotal",
                "result_fail",
                "result_success",
                "result_home",
                "result_retry",
                "result_levels"
            ]);
        }

        translate();
        // Fin Traduccion
    }])