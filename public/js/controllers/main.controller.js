/*
* @Author: bishal
* @Date:   2017-01-02 15:19:54
* @Last Modified by:   bishal
* @Last Modified time: 2017-01-03 00:57:39
*/

'use strict';
angular.module('mainCtrl',[])
    .controller('MainController', function($rootScope, $location, Auth, $scope,$http) {
/*
        $scope.loadhomepage=function(){
            console.log('test1');
            Auth.getUser();
            
            
        }*/



        var hideNav = function(){
            console.log("Hidenav");
            $scope.flagNav = false;
        }
        $scope.flagNav = true;

    var pointer = this;
    $scope.test = 'kina mildaina';

    var global='';


    $rootScope.loggedInAsAdmin = Auth.isLoggedInAsAdmin();
    $rootScope.loggedInAsStudent = Auth.isLoggedInAsStudent();
    $rootScope.username = Auth.getUser()
    $rootScope.$on('$routeChangeStart', function() {

        $rootScope.loggedInAsAdmin = Auth.isLoggedInAsAdmin();
        $rootScope.loggedInAsStudent = Auth.isLoggedInAsStudent();
        $rootScope.username = Auth.getUser();
        // Auth.getUser()
        //     .then(function(data) {
        //     pointer.user = data.data;
        // });
    });


    pointer.doLogin = function() {

        pointer.processing = true;

        pointer.error = '';
        // console.log(pointer.loginData.Username)
        Auth.login(pointer.loginData.username, pointer.loginData.password)
            .success(function(data) {
            pointer.processing = false;
            console.log('checking here', data);
            // Auth.getUser()
            //     .then(function(data) {
            //     pointer.user = data.data;
            //     global = pointer.user;
            //     console.log('global' + global);
            //     console.log('data fetched '+ pointer.user.Username);
            //     $scope.Username = pointer.user.Username;
            //     console.log('$scope '+ $scope.Username);
            // });

            if(data.success){
                $scope.obj = global;
                console.log("here" +$scope.obj);
                $location.path('/');
            }
            // $scope.Username = global;
            else
                pointer.error = data.message;
                 $scope.flagInvalid = true;

        });
    }

    pointer.doLogout = function() {
    	console.log("LOGOUT")
        Auth.logout();
        $location.path('/logout');
        //        window.location.reload();
    }

//    $scope.signout = function(){
//        console.log(pointer.user.Username);
//        $http.delete('/api/signout/'+ pointer.user.username).success(function(err){
//            if(err)
//                console.log(err);
//            else{
//                Auth.logout();
//                $location.path('/logout');
//            }
//        })
//    }

});
