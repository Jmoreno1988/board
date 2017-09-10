appControllers.controller('clowBoardCtrl', ['$scope', 'sessionService', '$state', 'bridgeService', '$ionicSideMenuDelegate', '$ionicPopup', '$interval',
    function ($scope, sessionService, $state, bridgeService, $ionicSideMenuDelegate, $ionicPopup, $interval) {

        var level = bridgeService.data.clownSelectLevel;
        var img = "split" + bridgeService.data.clownSelectImage;
        $scope.srcImg = "img/clow/" + img + "/" + img + ".jpeg";
        $scope.labelTimer = "--:--";

        var bClown = new BoardClown("board1", [level, level], level, img, true, $scope, $interval);
        bClown.init();

        $scope.flipImg = function () {
            bClown.flip();
        }

        $scope.updateTimer = function (newValue) {
            $scope.labelTimer = newValue;
        }

        // Popup resultados
        $scope.endGame = function () {
            var l = sessionService.get("config").lenguage;
            var d = dictionary;

            var alertPopup = $ionicPopup.alert({
                title: Translator.get("clownBoard_results", l, d),
                template: Translator.get("clownBoard_congratulation", l, d),
                buttons: [
                    { text: Translator.get("_2048Board_backMenu", l, d) }
                ]
            });

            alertPopup.then(function (res) {
                $state.go("clowSelectLevel");
            });

        }


        $scope.openSettings = function () {
            $ionicSideMenuDelegate.toggleLeft();
        }

        // Traduccion
        $scope.$on("changeLanguage", function () { translate() });

        function translate() {
            Translator.translate($scope, sessionService.get("config").lenguage, [
            ]);
        }

        translate();
        // Fin Traduccion
    }])