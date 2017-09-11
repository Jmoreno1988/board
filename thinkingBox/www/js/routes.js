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

      // Init 2048
      $stateProvider.state('2048SelectLevel', {
        url: '/page2048SelectLevel',
        templateUrl: 'templates/2048/2048SelectLevel.html',
        controller: '2048SelectLevelCtrl'
      })

      $stateProvider.state('2048Board', {
        url: '/page2048Board',
        templateUrl: 'templates/2048/2048Board.html',
        controller: '2048BoardCtrl'
      })
      // End 2048

      // Init Clow
      $stateProvider.state('clowSelectLevel', {
        url: '/pageclowSelectLevel',
        templateUrl: 'templates/clow/clowSelectLevel.html',
        controller: 'clowSelectLevelCtrl'
      })

      $stateProvider.state('clowBoard', {
        url: '/pageclowBoard',
        templateUrl: 'templates/clow/clowBoard.html',
        controller: 'clowBoardCtrl'
      }) 
      //End clow

      // Init Mines
      $stateProvider.state('minesSelectLevel', {
        url: '/pageminesSelectLevel',
        templateUrl: 'templates/mines/minesSelectLevel.html',
        controller: 'minesSelectLevelCtrl'
      })

      $stateProvider.state('minesBoard', {
        url: '/pageminesBoard',
        templateUrl: 'templates/mines/minesBoard.html',
        controller: 'minesBoardCtrl'
      }) 
      //End mines
      
      $stateProvider.state('test', {
        url: '/test',
        templateUrl: 'templates/test/test.html',
        controller: 'testCtrl'
      }) 

    $urlRouterProvider.otherwise('/page1')
  });