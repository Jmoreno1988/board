appControllers.controller('selectLevelCtrl', ['$scope', '$stateParams', '$state', 'sessionService', '$ionicPopup', 'bridgeService', '$ionicSideMenuDelegate',
    function ($scope, $stateParams, $state, sessionService, $ionicPopup, bridgeService, $ionicSideMenuDelegate) {
        var mathCalcu = sessionService.get("progressMathCalcu");

        updateInfoCal();

        $scope.selectLevel = function (level) {
            if (!mathCalcu[level].blocked) {
                bridgeService.data.selectLevel = level;
                $state.go("canvas", { level: level });
            } else {
                var confirmPopup = $ionicPopup.alert({
                    title: 'Level is blocked',
                    template: 'If you want to unlock the level...'
                });
            }
        }

        $scope.showPopup = function () {
            var confirmPopup = $ionicPopup.alert({
                title: 'Work in progress',
                template: 'Estara listo en la versión final del juego ;)'
            });
        }

        $scope.openSettings = function () {
            $ionicSideMenuDelegate.toggleLeft();
        }

        $scope.$on("changeLanguage", function () { translate() });

        function updateInfoCal() {
            $scope.recordEasy = mathCalcu.easy.maxScore;
            $scope.lastScoreEasy = mathCalcu.easy.lastScore;
            $scope.recordNormal = mathCalcu.normal.maxScore;
            $scope.lastScoreNormal = mathCalcu.normal.lastScore;
            $scope.recordHard = mathCalcu.hard.maxScore;
            $scope.lastScoreHard = mathCalcu.hard.lastScore;
            $scope.recordMaster = mathCalcu.master.maxScore;
            $scope.lastScoreMaster = mathCalcu.master.lastScore;
            $scope.recordKids = mathCalcu.kids.maxScore;
            $scope.lastScoreKids = mathCalcu.kids.lastScore;
            $scope.recordSurvival = mathCalcu.survival.maxScore;
            $scope.lastScoreSurvival = mathCalcu.survival.lastScore;
        }

        function translate() {
            Translator.translate($scope, sessionService.get("config").lenguage, [
                "selectLevelCtrl_levelEasy",
                "selectLevelCtrl_levelNormal",
                "selectLevelCtrl_levelHard",
                "selectLevelCtrl_levelMaster",
                "selectLevelCtrl_record",
                "selectLevelCtrl_lastScore",
                "selectLevelCtrl_otherCategories",
                "selectLevelCtrl_levelKids",
                "selectLevelCtrl_levelSurvival",
                "selectLevelCtrl_goodLuck",
            ]);
        }

        translate();
    }])