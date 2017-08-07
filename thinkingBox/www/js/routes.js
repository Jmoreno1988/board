angular.module('app.routes', [])

  .config(function ($stateProvider, $urlRouterProvider) {
      $stateProvider.state('selectLevel', {
        url: '/pageSelectLevel',
        templateUrl: 'templates/selectLevel.html',
        controller: 'selectLevelCtrl'
      })

      $stateProvider.state('canvas', {
        url: '/page2',
        templateUrl: 'templates/canvas.html',
        controller: 'canvasCtrl'
      })

      $stateProvider.state('countdown', {
        url: '/page3',
        templateUrl: 'templates/countdown.html',
        controller: 'countdownCtrl'
      })

      $stateProvider.state('result', {
        url: '/page4',
        templateUrl: 'templates/result.html',
        controller: 'resultCtrl'
      })

      $stateProvider.state('settings', {
        url: '/page13',
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      })

      $stateProvider.state('mainMenu', {
        url: '/page1',
        templateUrl: 'templates/mainMenu.html',
        controller: 'mainMenuCtrl'
      })

      $stateProvider.state('menuRecordsCal', {
        url: '/pageRecords',
        templateUrl: 'templates/menuRecordsCal.html',
        controller: 'menuRecordsCalCtrl'
      })

      $stateProvider.state('sudokuBoard', {
        url: '/pageSudokuBoard',
        templateUrl: 'templates/sudokuBoard.html',
        controller: 'sudokuBoardCtrl'
      })

      $stateProvider.state('sudokuSelectLevel', {
        url: '/pageSudokuSelectLevel',
        templateUrl: 'templates/sudokuSelectLevel.html',
        controller: 'sudokuSelectLevelCtrl'
      })

      $stateProvider.state('sudokuResult', {
        url: '/pageSudokuResult',
        templateUrl: 'templates/sudokuResult.html',
        controller: 'sudokuResultCtrl'
      })

      $stateProvider.state('chessSelectLevel', {
        url: '/pageChessSelectLevel',
        templateUrl: 'templates/chessSelectLevel.html',
        controller: 'chessSelectLevelCtrl'
      })

      $stateProvider.state('chessBoard', {
        url: '/pageChessBoard',
        templateUrl: 'templates/chessBoard.html',
        controller: 'chessBoardCtrl'
      })

      $stateProvider.state('chessResult', {
        url: '/pageChessResult',
        templateUrl: 'templates/chessResult.html',
        controller: 'chessResultCtrl'
      })

    $urlRouterProvider.otherwise('/page1')
  });