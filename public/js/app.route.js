/*
* @Author: bishal
* @Date:   2017-01-02 16:50:01
* @Last Modified by:   bishal
* @Last Modified time: 2017-01-02 23:38:17
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
            if(!AuthToken.getTokenAndRole().token){ 
                 $location.path('/login');
            }
        }
      }

    }).
	 when('/login',{
         templateUrl: 'templates/login.html'
    }).
	 otherwise({
        redirectTo: '/'
    })
	 $locationProvider.html5Mode(true);
})