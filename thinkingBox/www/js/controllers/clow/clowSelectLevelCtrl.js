appControllers.controller('clowSelectLevelCtrl', ['$scope', 'sessionService', '$state', 'bridgeService', '$ionicSideMenuDelegate', '$ionicPopup',
function ($scope, sessionService, $state, bridgeService, $ionicSideMenuDelegate, $ionicPopup) {

    var actualLevel = 4;
    var actualImg = 1;

    $scope.openSettings = function () {
        $ionicSideMenuDelegate.toggleLeft();
    }

    $scope.changeLevel = function (level) {
        switch (level) {
            case "3":
                Helper.node("b3").classList.add("colPressed");
                Helper.node("b4").classList.remove("colPressed");
                Helper.node("b6").classList.remove("colPressed");
                Helper.node("b8").classList.remove("colPressed");
                actualLevel = 3;
                break;
            case "4":
                Helper.node("b3").classList.remove("colPressed");
                Helper.node("b4").classList.add("colPressed");
                Helper.node("b6").classList.remove("colPressed");
                Helper.node("b8").classList.remove("colPressed");
                //Helper.node("imgGrid").src = "img/2048/4x4.png";
                actualLevel = 4;
                break;
            case "6":
                Helper.node("b3").classList.remove("colPressed");
                Helper.node("b4").classList.remove("colPressed");
                Helper.node("b6").classList.add("colPressed");
                Helper.node("b8").classList.remove("colPressed");
                //Helper.node("imgGrid").src = "img/2048/6x6.png";
                actualLevel = 6;
                break;
            case "8":
                Helper.node("b3").classList.remove("colPressed");
                Helper.node("b4").classList.remove("colPressed");
                Helper.node("b6").classList.remove("colPressed");
                Helper.node("b8").classList.add("colPressed");
                //Helper.node("imgGrid").src = "img/2048/8x8onic .png";
                actualLevel = 8;
                break;
        }
    }

    $scope.changeImage = function(number) {
        var listImgs = document.querySelectorAll(".imgCarousel");

        for(var i = 0 ; i < listImgs.length; i++) 
            listImgs[i].classList.remove("imgSelect");

        Helper.node("imgGrid" + number).classList.add("imgSelect");
        Helper.node("imgBig").src= "img/clow/split" + number + "/split" + number + ".jpeg";
        actualImg = number;
    }

    function node(id) {
        return document.getElementById(id);
    }

    $scope.goToGame = function() {
        bridgeService.data.clownSelectImage = actualImg;
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