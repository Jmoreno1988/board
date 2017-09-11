appControllers.controller('minesSelectLevelCtrl', ['$scope', 'sessionService', '$state', 'bridgeService', '$ionicSideMenuDelegate', '$ionicPopup',
function ($scope, sessionService, $state, bridgeService, $ionicSideMenuDelegate, $ionicPopup) {

    $scope.openSettings = function () {
        $ionicSideMenuDelegate.toggleLeft();
    }
    $state.go("minesBoard");
    $scope.goToGame = function() {
        /*
        bridgeService.data.clownSelectImage = actualImg;
        bridgeService.data.clownSelectLevel = actualLevel;
        $state.go("clowBoard");
        */
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