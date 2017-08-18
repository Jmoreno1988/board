appControllers.controller('clowSelectLevelCtrl', ['$scope', 'sessionService', '$state', 'bridgeService', '$ionicSideMenuDelegate', '$ionicPopup',
function ($scope, sessionService, $state, bridgeService, $ionicSideMenuDelegate, $ionicPopup) {

    var actualLevel = 4;

    $scope.openSettings = function () {
        $ionicSideMenuDelegate.toggleLeft();
    }

    $scope.changeLevel = function (level) {
        switch (level) {
            case "3":
                document.getElementById("b3").classList.add("colPressed");
                document.getElementById("b4").classList.remove("colPressed");
                document.getElementById("b6").classList.remove("colPressed");
                document.getElementById("b8").classList.remove("colPressed");
                document.getElementById("imgGrid").src = "img/2048/3x3.png";
                actualLevel = 3;
                break;
            case "4":
                document.getElementById("b3").classList.remove("colPressed");
                document.getElementById("b4").classList.add("colPressed");
                document.getElementById("b6").classList.remove("colPressed");
                document.getElementById("b8").classList.remove("colPressed");
                document.getElementById("imgGrid").src = "img/2048/4x4.png";
                actualLevel = 4;
                break;
            case "6":
                document.getElementById("b3").classList.remove("colPressed");
                document.getElementById("b4").classList.remove("colPressed");
                document.getElementById("b6").classList.add("colPressed");
                document.getElementById("b8").classList.remove("colPressed");
                document.getElementById("imgGrid").src = "img/2048/6x6.png";
                actualLevel = 6;
                break;
            case "8":
                document.getElementById("b3").classList.remove("colPressed");
                document.getElementById("b4").classList.remove("colPressed");
                document.getElementById("b6").classList.remove("colPressed");
                document.getElementById("b8").classList.add("colPressed");
                document.getElementById("imgGrid").src = "img/2048/8x8onic .png";
                actualLevel = 8;
                break;
        }
    }

    $scope.goToGame = function() {
        bridgeService.data.clownSelectLevel = actualLevel;
        $state.go("clowBoard");
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