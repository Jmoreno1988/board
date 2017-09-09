appControllers.controller('clowBoardCtrl', ['$scope', 'sessionService', '$state', 'bridgeService', '$ionicSideMenuDelegate', '$ionicPopup',
    function ($scope, sessionService, $state, bridgeService, $ionicSideMenuDelegate, $ionicPopup) {

        var level = bridgeService.data.clownSelectLevel;
        var img = "split" + bridgeService.data.clownSelectImage;
        $scope.srcImg = "img/clow/" + img + "/" + img + ".jpeg";

        var bClown = new BoardClown("board1", [level, level], level, img, true, $scope);
        bClown.init();

        $scope.flipImg = function () {
            bClown.flip();
        }

        // Popup resultados
        $scope.endGame = function () {
            var d = dictionary;

            var alertPopup = $ionicPopup.alert({
                title: Translator.get("_2048Board_results", l, d),
                template: Translator.get("_2048Board_congratulation", l, d),
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