appControllers.controller('canvasCtrl', ['$scope', '$stateParams', 'bridgeService', '$interval', '$state', 'sessionService', '$rootScope',
    function ($scope, $stateParams, bridgeService, $interval, $state, sessionService, $rootScope) {
        var level = bridgeService.data.selectLevel;
        var game = new GameCal(level, $rootScope, $scope, $state, $interval, bridgeService, sessionService);

        game.init(); // lets rock!!!

        // Binding events
        $scope.checkResult = function(option) { game.checkResult(option) };
        $scope.reset = function() { game.reset(); };

         // Traduccion
        $scope.$on("changeLanguage", function () { translate() });

        function translate() {
            Translator.translate($scope, sessionService.get("config").lenguage, [
                "canvas_level",
                "canvas_totalScore",
                "canvas_score",
                "canvas_errors"
            ]);
        }

        translate();
        // Fin Traduccion
    }])