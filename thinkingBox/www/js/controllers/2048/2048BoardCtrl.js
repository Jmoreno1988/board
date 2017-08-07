appControllers.controller('2048BoardCtrl', ['$scope', 'sessionService', '$state', 'bridgeService', '$ionicSideMenuDelegate', '$ionicPopup',
    function ($scope, sessionService, $state, bridgeService, $ionicSideMenuDelegate, $ionicPopup) {


        $scope.openSettings = function () {
            $ionicSideMenuDelegate.toggleLeft();
        }

        var b2048 = new Board2048("board1", [4,4], true);

        b2048.inflate([0,4,4,0,2,4,4,0,0,0,4,0,0,4,0,0]);
    
        b2048.init();
        

       


        // Traduccion
        $scope.$on("changeLanguage", function () { translate() });

        function translate() {
            Translator.translate($scope, sessionService.get("config").lenguage, [
               ]);
        }

        translate();
        // Fin Traduccion
    }])