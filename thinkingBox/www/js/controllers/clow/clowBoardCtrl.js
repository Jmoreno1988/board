appControllers.controller('clowBoardCtrl', ['$scope', 'sessionService', '$state', 'bridgeService', '$ionicSideMenuDelegate', '$ionicPopup',
function ($scope, sessionService, $state, bridgeService, $ionicSideMenuDelegate, $ionicPopup) {

    var level = bridgeService.data.clownSelectLevel;
    var img = "split"+ bridgeService.data.clownSelectImage;

    var bClown = new BoardClown("board1",  [level, level], level, img, true);
    bClown.init();

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