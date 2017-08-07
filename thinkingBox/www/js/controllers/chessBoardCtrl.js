appControllers.controller('chessBoardCtrl', ['$scope', '$rootScope', 'sessionService', 'bridgeService', '$interval', '$state', '$ionicSideMenuDelegate',
	function ($scope, $rootScope, sessionService, bridgeService, $interval, $state, $ionicSideMenuDelegate) {

		var level = bridgeService.data.chessSelectLevel;

		var gameChess = new GameChess({
			ctrl: $scope,
			rootScope: $rootScope,
			sessionService: sessionService,
			level: level,
			interval: $interval,
			state: $state,
			bridgeService: bridgeService
		});

		gameChess.init();

		$scope.level = dictionary[sessionService.get("config").lenguage][level];

		$scope.openSettings = function () {
            $ionicSideMenuDelegate.toggleLeft();
        }


		// Traduccion
        $scope.$on("changeLanguage", function () { translate() });

        function translate() {
            Translator.translate($scope, sessionService.get("config").lenguage, [
                "chessBoard_check",
                "chessBoard_checkMate",
                "chessBoard_totalMoves",
                "chessBoard_turn"
            ]);
        }

        translate();
        // Fin Traduccion
	}])