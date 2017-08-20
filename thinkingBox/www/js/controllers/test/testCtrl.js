appControllers.controller('testCtrl', ['$scope', 'sessionService', '$state', 'bridgeService', '$ionicSideMenuDelegate', '$ionicPopup',
    function ($scope, sessionService, $state, bridgeService, $ionicSideMenuDelegate, $ionicPopup) {

        document.getElementById("buttonPlayChess").addEventListener("click", function(){
            $scope.goTo();
        })

        $scope.goTo = function() {
            document.getElementById("card-icon-chess").style.margin = '-280px auto';
            document.getElementById("card-icon-chess").style.width = "80px";
            document.getElementById("card-circle-chess").style.height = '670px';
            document.getElementById("wrapperChess").style.display = "none";

            //setTimeout(function(){ $state.go('chessSelectLevel'); }, 1000);
        }

        $(document).ready(function () {
            $('.carousel').slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                centerMode: true,
                variableWidth: false
            });
        });


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