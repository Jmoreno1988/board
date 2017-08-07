appControllers.controller('mainMenuCtrl', ['$scope', '$stateParams', '$ionicSideMenuDelegate', 'sessionService', '$http', '$ionicPopup', '$state', '$cordovaSocialSharing', '$ionicModal',
    function ($scope, $stateParams, $ionicSideMenuDelegate, sessionService, $http, $ionicPopup, $state, $cordovaSocialSharing, $ionicModal) {
        // $ionicSideMenuDelegate.canDragContent(false);

        $scope.versionApp = cfg.version;

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

        $scope.openListGames = function () {
            document.getElementById("planet1").classList.toggle("p1SecondPosition");
            document.getElementById("planet2").classList.toggle("p2SecondPosition");
            document.getElementById("planet3").classList.toggle("p3SecondPosition");
            document.getElementById("planet4").classList.toggle("p4SecondPosition");
            document.getElementById("planet5").classList.toggle("p5SecondPosition");
            document.getElementById("planet1Icon").classList.toggle("pIcon1SecondPosition");

            document.getElementById("wpChess").classList.toggle("wpActivate");
            document.getElementById("wpCalcu").classList.toggle("wpActivate");
            document.getElementById("wpSudo").classList.toggle("wpActivate");
            document.getElementById("wpShare").classList.toggle("wpActivate");
            document.getElementById("wpOpi").classList.toggle("wpActivate");
        }

        $scope.showHelp = function () {
            var list = document.querySelectorAll(".helpTitle")
            for (var i = 0; i < list.length; i++)
                list[i].classList.toggle("helpOptionsShowSecond");
        }

        $scope.openSettings = function () {
            $ionicSideMenuDelegate.toggleLeft();
        }

        $scope.goTo = function (page) {
            switch (page) {
                case 'menuRecordsCal':
                    $state.go(page);
                    break;
                case 'sudokuBoard':
                    $state.go(page);
                    break;
            }
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
        // Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });
        // Execute action on hide modal
        $scope.$on('modal.hidden', function () {
            // Execute action
        });
        // Execute action on remove modal
        $scope.$on('modal.removed', function () {
            // Execute action
        });

        $scope.test = function () {
            console.log("Inicio juego")
        }

        // Traduccion
        $scope.$on("changeLanguage", function () { translate() });

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
        // Fin Traduccion
    }])