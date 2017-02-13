/*
* @Author: bishal
* @Date:   2017-01-02 16:50:01
* @Last Modified by:   bishal
* @Last Modified time: 2017-02-12 09:49:49
*/

'use strict';
angular.module('appRoutes' , ['ngRoute'])
.config(function($routeProvider, $locationProvider) {

	$routeProvider.
 when('/',{

        
//        index has dependencies, scripts,routes, and home is main template
         templateUrl: 'templates/dashboard.html',
          resolve:{
        /*To check whether the user has access with token*/
        function($location,AuthToken){ 
            if(!AuthToken.getTokenAndRole().token || AuthToken.getTokenAndRole().token==undefined){ 
                 console.log('TOKEN')
                 $location.path('/login');
            }
            if(AuthToken.getTokenAndRole().role === "student"){
                $location.path('/student')
            }
        }
      }

    }).
    when('/student',{
         templateUrl: 'templates/student.html',
         resolve:{
            function($location,AuthToken){
                if(AuthToken.getTokenAndRole().role !== "student"){
                $location.path('/')
            }
            }
         }
    }).
        when('/result',{
         templateUrl: 'templates/result.html',
         resolve:{
            function($location,AuthToken){
                if(AuthToken.getTokenAndRole().role !== "admin"){
                $location.path('/')
            }
            }
         }
    }).
	 when('/login',{
         templateUrl: 'templates/login.html',
                   resolve:{
        /*To check whether the user has access with token*/
        function($location,AuthToken){ 
            if(AuthToken.getTokenAndRole().token!=undefined){ 
                console.log('TOKEN')
                 $location.path('/');
            }
        }
      }
    }).

	 otherwise({
        redirectTo: '/'
    })
	 $locationProvider.html5Mode(true);
})