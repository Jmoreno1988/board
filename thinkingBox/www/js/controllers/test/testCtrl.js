appControllers.controller('testCtrl', ['$scope', 'sessionService', '$state', 'bridgeService', '$ionicSideMenuDelegate', '$ionicPopup',
    function ($scope, sessionService, $state, bridgeService, $ionicSideMenuDelegate, $ionicPopup) {

        document.getElementById("buttonPlayChess").addEventListener("click", function(){
            $scope.goTo('chess');
        })

        document.getElementById("buttonPlaySudoku").addEventListener("click", function(){
            $scope.goTo('sudoku');
        })

        document.getElementById("buttonPlayCalcu").addEventListener("click", function(){
            $scope.goTo('calcu');
        })

        document.getElementById("buttonPlay2048").addEventListener("click", function(){
            $scope.goTo('2048');
        })

        document.getElementById("buttonPlayClown").addEventListener("click", function(){
            $scope.goTo('clown');
        })

        $scope.goTo = function(game) {
            document.getElementById("card-icon-" +  game).style.margin = '-280px auto';
            document.getElementById("card-icon-" +  game).style.width = "80px";
            document.getElementById("card-circle-" +  game).style.height = '670px';
            document.getElementById("wrapper-" +  game).style.display = "none";

            setTimeout(function(){ $state.go('chessSelectLevel'); }, 1000);
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