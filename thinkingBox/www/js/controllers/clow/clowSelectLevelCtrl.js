appControllers.controller('clowSelectLevelCtrl', ['$scope', 'sessionService', '$state', 'bridgeService', '$ionicSideMenuDelegate', '$ionicPopup',
function ($scope, sessionService, $state, bridgeService, $ionicSideMenuDelegate, $ionicPopup) {

    var actualLevel = 4;
    var actualImg = 1;

    $scope.openSettings = function () {
        $ionicSideMenuDelegate.toggleLeft();
    }

    $(document).ready(function () {
        $('.carouselClown').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 6,
            slidesToScroll: 6,
            centerMode: false,
            variableWidth: false
        });
    });

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
                actualLevel = 4;
                break;
            case "6":
                Helper.node("b3").classList.remove("colPressed");
                Helper.node("b4").classList.remove("colPressed");
                Helper.node("b6").classList.add("colPressed");
                Helper.node("b8").classList.remove("colPressed");
                actualLevel = 6;
                break;
            case "8":
                Helper.node("b3").classList.remove("colPressed");
                Helper.node("b4").classList.remove("colPressed");
                Helper.node("b6").classList.remove("colPressed");
                Helper.node("b8").classList.add("colPressed");
                actualLevel = 8;
                break;
        }
    }

    Helper.node("imgGrid1").addEventListener("click", function() {$scope.changeImage('1')})
    Helper.node("imgGrid2").addEventListener("click", function() {$scope.changeImage('2')})
    Helper.node("imgGrid3").addEventListener("click", function() {$scope.changeImage('3')})
    Helper.node("imgGrid4").addEventListener("click", function() {$scope.changeImage('4')})
    Helper.node("imgGrid5").addEventListener("click", function() {$scope.changeImage('5')})
    Helper.node("imgGrid6").addEventListener("click", function() {$scope.changeImage('6')})
    Helper.node("imgGrid7").addEventListener("click", function() {$scope.changeImage('7')})
    Helper.node("imgGrid8").addEventListener("click", function() {$scope.changeImage('8')})

    $scope.changeImage = function(number) {
        var listImgs = document.querySelectorAll(".imgCarousel");

        for(var i = 0 ; i < listImgs.length; i++) 
            listImgs[i].classList.remove("imgSelect");

        Helper.node("imgGrid" + number).classList.add("imgSelect");
        Helper.node("imgBig").src= "img/clow/split" + number + "/split" + number + ".jpeg";
        actualImg = number;
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