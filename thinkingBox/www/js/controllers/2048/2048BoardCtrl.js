appControllers.controller('2048BoardCtrl', ['$scope', 'sessionService', '$state', 'bridgeService', '$ionicSideMenuDelegate', '$ionicPopup',
    function ($scope, sessionService, $state, bridgeService, $ionicSideMenuDelegate, $ionicPopup) {

        if(!bridgeService.data._2048SelectLevel)
            $state.go("2048SelectLevel");

        var level = bridgeService.data._2048SelectLevel;
        var b2048 = new Board2048("board1", [level, level], level, true, $scope);
        b2048.init();

        $scope.score = 0;
        $scope.onSwipe = function(direction) {
            b2048.handlerSwipe(direction);
            $scope.score = b2048.getScore();
        }

        // Popup resultados
        $scope.showResult = function(result) {
            console.log(result)
            var alertPopup = $ionicPopup.alert({
              title: 'Resultados!!',
              template: 'Felicidades has tenido 3420pts',
              buttons: [
                { text: 'Salir al menu' }
               ]
            });
         
            alertPopup.then(function(res) {
                $state.go("2048SelectLevel");
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