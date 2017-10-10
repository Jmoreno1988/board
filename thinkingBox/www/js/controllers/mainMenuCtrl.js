appControllers.controller('mainMenuCtrl', ['$scope', '$stateParams', '$ionicSideMenuDelegate', 'sessionService', '$http', '$ionicPopup', '$state', '$cordovaSocialSharing', '$ionicModal',
    function ($scope, $stateParams, $ionicSideMenuDelegate, sessionService, $http, $ionicPopup, $state, $cordovaSocialSharing, $ionicModal) {
        // $ionicSideMenuDelegate.canDragContent(false);

        if (cfg.resetLocalStorage)
            sessionService.clear();

        if (!sessionService.exist("isLocalStorage")) {
            console.log("Reinicio localStorage");
            sessionService.set("isLocalStorage", true);
            sessionService.set("progressMathCalcu", cfg.modelObjectLocalStorage.progress.mathCalcu);
            sessionService.set("progressSudoku", cfg.modelObjectLocalStorage.progress.sudoku);
            sessionService.set("progressChess", cfg.modelObjectLocalStorage.progress.chess);
            sessionService.set("config", cfg.modelObjectLocalStorage.config);
            sessionService.set("infoUser", cfg.modelObjectLocalStorage.infoUser);
        }

        translateCarousel();
        
        document.getElementById("cardChess").addEventListener("click", function(){ $scope.goTo('chess', 'chessSelectLevel') })
        document.getElementById("cardSudoku").addEventListener("click", function(){ $scope.goTo('sudoku', 'sudokuSelectLevel') })
        document.getElementById("cardCalcu").addEventListener("click", function(){ $scope.goTo('calcu', 'selectLevel') })
        document.getElementById("card2048").addEventListener("click", function(){ $scope.goTo('2048', '2048SelectLevel') })
        document.getElementById("cardPuzzle").addEventListener("click", function(){ $scope.goTo('clown', 'clowSelectLevel') })
        document.getElementById("cardMines").addEventListener("click", function(){ $scope.goTo('mines', 'minesSelectLevel') })

        $scope.goTo = function(game, page) {
            document.getElementById("card-icon-" +  game).style.margin = '-280px auto';
            document.getElementById("card-icon-" +  game).style.width = "80px";
            document.getElementById("card-circle-" +  game).style.height = '670px';
            document.getElementById("wrapper-" +  game).style.display = "none";

            setTimeout(function(){ $state.go(page); }, 1000);
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

        
        $scope.showValorateModal = function () {
            var l = sessionService.get("config").lenguage;
            var d = dictionary;
            var confirmPopup = $ionicPopup.confirm({
                title: Translator.get("mainMenuCtrl_titleOpinion", l, d),
                template: Translator.get("mainMenuCtrl_msgOpinion", l, d),
                cancelText: Translator.get("mainMenuCtrl_cancel", l, d),
                okText: Translator.get("mainMenuCtrl_accept", l, d)
            });

            confirmPopup.then(function (res) {
                if (res) {
                    window.open('https://play.google.com/store/apps/details?id=com.ionicframework.thinkingbox148390', '_system');
                } else { }
            });
        };

        $scope.showShareMenu = function () {
             var l = sessionService.get("config").lenguage;
            var d = dictionary;
            var alertPopup = $ionicPopup.alert({
                title: Translator.get("mainMenuCtrl_titleShare", l, d),
                template:
                '<div class="row">' +
                    '<div class="col" onclick="shareWith(2)"><img src="img/social-networks-logos/facebook.svg"></div>' +
                    '<div class="col" onclick="shareWith(1)"><img src="img/social-networks-logos/twitter.svg"></div>' +
                    '<div class="col" onclick="shareWith(3)"><img src="img/social-networks-logos/whatsapp.svg"></div>' +
                '</div>'
            });
        };

        $scope.shareWith = function(socialNetworks) {
            switch(socialNetworks) {
                case '1': 
                    console.log("facebook")
                    break;
                
                case '2': 
                    console.log("twitter")
                    break;
                
                case '3': 
                    console.log("whatsapp")
                    break;
            }
        }
        

        $scope.openModal = function () {
            $scope.modal.show();
        };
        $scope.closeModal = function () {
            $scope.modal.hide();
        };
        /*
        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        */
        // Execute action on hide modal
        $scope.$on('modal.hidden', function () {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });

        // Traduccion
        $scope.$on("changeLanguage", function () { translate(); translateCarousel () });

        function translate() {
            Translator.translate($scope, sessionService.get("config").lenguage, [
                "mainMenuCtrl_play",
                "mainMenuCtrl_userProfile",
                "mainMenuCtrl_editAccount",
                "mainMenuCtrl_nickName",
                "mainMenuCtrl_email",
                "mainMenuCtrl_save",
                "mainMenuCtrl_reset",
                "mainMenuCtrl_options",
                "mainMenuCtrl_share",
                "mainMenuCtrl_sudoku",
                "mainMenuCtrl_rate",
                "mainMenuCtrl_chess",
                "mainMenuCtrl_calcu"
            ]);
        }

        translate();

        function translateCarousel (){
            var l = sessionService.get("config").lenguage;
            var d = dictionary;

            document.getElementById("buttonPlayChess").textContent = Translator.get("mainMenuCtrl_play", l, d);
            document.getElementById("buttonPlaySudoku").textContent = Translator.get("mainMenuCtrl_play", l, d);
            document.getElementById("buttonPlayCalcu").textContent = Translator.get("mainMenuCtrl_play", l, d);
            document.getElementById("buttonPlay2048").textContent = Translator.get("mainMenuCtrl_play", l, d);
            document.getElementById("buttonPlayClown").textContent = Translator.get("mainMenuCtrl_play", l, d);
            document.getElementById("quoteChess").textContent = Translator.get("quoteChess", l, d);
            document.getElementById("quoteSudoku").textContent = Translator.get("quoteSudoku", l, d);
            document.getElementById("quotePuzzle").textContent = Translator.get("quotePuzzle", l, d);
            document.getElementById("quoteCalcu").textContent = Translator.get("quoteCalcu", l, d);
            document.getElementById("quote2048").textContent = Translator.get("quote2048", l, d);
            document.getElementById("quotePuzzle").textContent = Translator.get("quotePuzzle", l, d);
        }
        // Fin Traduccion
    }])