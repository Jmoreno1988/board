appControllers.controller('2048SelectLevelCtrl', ['$scope', 'sessionService', '$state', 'bridgeService', '$ionicSideMenuDelegate', '$ionicPopup',
    function ($scope, sessionService, $state, bridgeService, $ionicSideMenuDelegate, $ionicPopup) {

        if(!sessionService.get("progress2048"))
            createData2048();

        var progress2048 = sessionService.get("progress2048");
        var actualLevel = 4;
        
        $scope.score = progress2048.score4x4;

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
                    $scope.score = progress2048.score3x3;
                    break;
                case "4":
                    document.getElementById("b3").classList.remove("colPressed");
                    document.getElementById("b4").classList.add("colPressed");
                    document.getElementById("b6").classList.remove("colPressed");
                    document.getElementById("b8").classList.remove("colPressed");
                    document.getElementById("imgGrid").src = "img/2048/4x4.png";
                    actualLevel = 4;
                    $scope.score = progress2048.score4x4;
                    break;
                case "6":
                    document.getElementById("b3").classList.remove("colPressed");
                    document.getElementById("b4").classList.remove("colPressed");
                    document.getElementById("b6").classList.add("colPressed");
                    document.getElementById("b8").classList.remove("colPressed");
                    document.getElementById("imgGrid").src = "img/2048/6x6.png";
                    actualLevel = 6;
                    $scope.score = progress2048.score6x6;
                    break;
                case "8":
                    document.getElementById("b3").classList.remove("colPressed");
                    document.getElementById("b4").classList.remove("colPressed");
                    document.getElementById("b6").classList.remove("colPressed");
                    document.getElementById("b8").classList.add("colPressed");
                    document.getElementById("imgGrid").src = "img/2048/8x8.png";
                    actualLevel = 8;
                    $scope.score = progress2048.score8x8;
                    break;
            }
        }

        $scope.goToGame = function() {
            bridgeService.data._2048SelectLevel = actualLevel;
            $state.go("2048Board");
        }

        // Traduccion
        $scope.$on("changeLanguage", function () { translate() });

        function translate() {
            Translator.translate($scope, sessionService.get("config").lenguage, [
                "play"
            ]);
        }

        translate();
        // Fin Traduccion

        // Creacion de Local Storage
        function createData2048() {
            sessionService.set("progress2048", {
                score3x3: 0,
                score4x4: 0,
                score6x6: 0,
                score8x8: 0
            });
        }
    }])