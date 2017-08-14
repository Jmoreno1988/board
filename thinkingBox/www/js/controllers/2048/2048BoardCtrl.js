appControllers.controller('2048BoardCtrl', ['$scope', 'sessionService', '$state', 'bridgeService', '$ionicSideMenuDelegate', '$ionicPopup',
    function ($scope, sessionService, $state, bridgeService, $ionicSideMenuDelegate, $ionicPopup) {

        var b2048 = new Board2048("board1", [4, 4], true, $scope);
        b2048.init();

        $scope.onSwipe = function(direction) {
            b2048.handlerSwipe(direction);
            $scope.score = b2048.getScore();
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