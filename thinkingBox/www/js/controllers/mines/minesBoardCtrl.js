appControllers.controller('minesBoardCtrl', ['$scope', 'sessionService', '$state', 'bridgeService', '$ionicSideMenuDelegate', '$ionicPopup', '$interval',
function ($scope, sessionService, $state, bridgeService, $ionicSideMenuDelegate, $ionicPopup, $interval) {

    $scope.labelTimer = "--:--";
    $scope.totalMines = 0;
    var level = 16;

    var bMines = new BoardMines("board1", [level, level], level, 40,true, $scope, $interval);
    bMines.init();

    $scope.updateTimer = function (newValue) {
        $scope.labelTimer = newValue;
    }

    $scope.changeMode =function() {
        bMines.toggleMode();
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