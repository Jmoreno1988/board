appControllers.controller('minesBoardCtrl', ['$scope', 'sessionService', '$state', 'bridgeService', '$ionicSideMenuDelegate', '$ionicPopup', '$interval',
function ($scope, sessionService, $state, bridgeService, $ionicSideMenuDelegate, $ionicPopup, $interval) {

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