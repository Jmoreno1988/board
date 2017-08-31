appControllers.controller('2048BoardCtrl', ['$scope', 'sessionService', '$state', 'bridgeService', '$ionicSideMenuDelegate', '$ionicPopup',
    function ($scope, sessionService, $state, bridgeService, $ionicSideMenuDelegate, $ionicPopup) {

        if (!bridgeService.data._2048SelectLevel)
            $state.go("2048SelectLevel");

        var progress2048 = sessionService.get("progress2048");
        var level = bridgeService.data._2048SelectLevel;
        var b2048 = new Board2048("board1", [level, level], level, true, $scope);
        b2048.init();

        $scope.score = 0;
        $scope.record = progress2048["score" + level + "x" + level];
        $scope.onSwipe = function (direction) {
            b2048.handlerSwipe(direction);
            $scope.score = b2048.getScore();
        }

        // Popup resultados
        $scope.showResult = function (isWinner, result) {
            var l = sessionService.get("config").lenguage;
            var d = dictionary;
            
            if (result > progress2048["score" + level + "x" + level])
                updateRecord(result);

            if (isWinner) {
                var alertPopup = $ionicPopup.alert({
                    title: Translator.get("_2048Board_results", l, d),
                    template: Translator.get("_2048Board_congratulation", l, d) + " " + result + ' pts.',
                    buttons: [
                        { text: Translator.get("_2048Board_backMenu", l, d) }
                    ]
                });

                alertPopup.then(function (res) {
                    $state.go("2048SelectLevel");
                });
            } else {
                var alertPopup = $ionicPopup.alert({
                    title: Translator.get("_2048Board_results", l, d),
                    template: Translator.get("_2048Board_badLuck", l, d) + " " + result + ' pts.',
                    buttons: [
                        { text: Translator.get("_2048Board_backMenu", l, d) }
                    ]
                });

                alertPopup.then(function (res) {
                    $state.go("2048SelectLevel");
                });
            }
        }

        $scope.openSettings = function () {
            $ionicSideMenuDelegate.toggleLeft();
        }

        // Traduccion
        $scope.$on("changeLanguage", function () { translate() });

        function translate() {
            Translator.translate($scope, sessionService.get("config").lenguage, [
                "_2048Board_score"
            ]);
        }

        translate();
        // Fin Traduccion

        // Update Record
        function updateRecord(newRecord) {
            var aux = sessionService.get("progress2048");
            aux[["score" + level + "x" + level]] = newRecord;
            sessionService.set("progress2048", aux);
        }
    }])