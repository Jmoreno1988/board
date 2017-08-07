appControllers.controller('menuRecordsCalCtrl', ['$scope', '$stateParams', '$http',
    function ($scope, $stateParams, $http, $cordovaSocialSharing) {
        $scope.options = {
            loop: false,
            effect: 'fade',
            speed: 500,
        }

        $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
            // data.slider is the instance of Swiper
            $scope.slider = data.slider;
        });

        $scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
            //console.log('Slide change is beginning');
        });

        $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
            // note: the indexes are 0-based
            $scope.activeIndex = data.slider.activeIndex;
            $scope.previousIndex = data.slider.previousIndex;
        });

        var trophyRoom = new TrophyRoom();

        var id = 0;

        getScoresEasy(id);
        getScoresNormal(id);
        getScoresHard(id);
        getScoresMaster(id);
        getScoresSurvive(id);

        /*
                console.log($scope.listRecordsEasy)
                getScores(id, 'easy', $scope.listRecordsEasy);
        
                function getScores(id, level, node) {
                    $http({
                        method: 'GET',
                        url: cfg.urlServer + 'getscore' + level
                    }).then(function successCallback(response, node) {
                        //trophyRoom.setRecords(response.data);
                        console.log(node)
                        node = orderList(response.data);
                    }, function errorCallback(response) {
                        console.log("Error:")
                        console.log(response)
                    });
                }
        */
        function initSpinner(id) {
            //var node = angular.element(document.getElementById(id))
            //if(node)
            //   node.style.display = "block";
        }

        function finishSpinner() {
            var node = document.getElementById(id)

            if (node)
                node.style.display = "none";
        }

        function getScoresEasy(id) {
            initSpinner('spinnerEasy');
            $http({
                method: 'GET',
                url: cfg.urlServer + 'getscoreeasy'
            }).then(function successCallback(response) {
                finishSpinner('spinnerEasy');
                $scope.listRecordsEasy = orderList(response.data);
            }.bind(this), function errorCallback(response) {
                finishSpinner('spinnerEasy');
                console.log("Error:")
                console.log(response)
            });
        }

        function getScoresNormal(id) {
            $http({
                method: 'GET',
                url: cfg.urlServer + 'getscorenormal'
            }).then(function successCallback(response) {
                //trophyRoom.setRecords(response.data);
                $scope.listRecordsNormal = orderList(response.data);
            }, function errorCallback(response) {
                console.log("Error:")
                console.log(response)
            });
        }

        function getScoresHard(id) {
            $http({
                method: 'GET',
                url: cfg.urlServer + 'getscorehard'
            }).then(function successCallback(response) {
                //trophyRoom.setRecords(response.data);
                $scope.listRecordsHard = orderList(response.data);
            }, function errorCallback(response) {
                console.log("Error:")
                console.log(response)
            });
        }

        function getScoresMaster(id) {
            $http({
                method: 'GET',
                url: cfg.urlServer + 'getscoremaster'
            }).then(function successCallback(response) {
                //trophyRoom.setRecords(response.data);
                $scope.listRecordsMaster = orderList(response.data);
            }, function errorCallback(response) {
                console.log("Error:")
                console.log(response)
            });
        }

        function getScoresSurvive(id) {
            $http({
                method: 'GET',
                url: cfg.urlServer + 'getscoresurvive'
            }).then(function successCallback(response) {
                //trophyRoom.setRecords(response.data);
                $scope.listRecordsSurvive = orderList(response.data);
            }, function errorCallback(response) {
                console.log("Error:")
                console.log(response)
            });
        }

        function orderList(list) {
            return list.sort(function (a, b) {
                return (b.record - a.record)
            })
        }
    }])