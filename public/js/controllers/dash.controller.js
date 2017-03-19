angular.module('dashCtrl', ['angularModalService', 'mymodal']).
controller('DashController', function(Modal,
    $rootScope, $location, Auth, $scope,
    $http, ModalService, Question, User, Result) {
      $scope.testing = "hola"
      $scope.counters = function(){
        // dashboard counts
         User.count().success(function(data){
          console.log(data)
          $scope.countUsers = data.data
        })

          Question.count().success(function(data){
          console.log(data)
          $scope.countQstns = data.data
        })

         Result.count().success(function(data){
          console.log(data)
          $scope.countRslts = data.data
        })
      }
    })
