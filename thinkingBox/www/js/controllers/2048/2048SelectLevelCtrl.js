appControllers.controller('2048SelectLevelCtrl', ['$scope', 'sessionService', '$state', 'bridgeService', '$ionicSideMenuDelegate', '$ionicPopup',
    function ($scope, sessionService, $state, bridgeService, $ionicSideMenuDelegate, $ionicPopup) {


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