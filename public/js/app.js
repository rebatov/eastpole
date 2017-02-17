/*
* @Author: bishal
* @Date:   2017-01-02 15:17:27
* @Last Modified by:   bishal
* @Last Modified time: 2017-02-12 13:29:02
*/

'use strict';
angular.module('app',['ngRoute','mainCtrl','appRoutes','authService',
				'angularModalService','mymodal',
				'qstnService','userService','stuCtrl',
				'bw.paging','resultService','resultCtrl','dashCtrl'
	])
// .config(function($httpProvider) {
//  	$httpProvider.interceptors.push('AuthInterceptor');
//  })
.config(function($httpProvider) {

 	$httpProvider.interceptors.push('AuthInterceptor');


 })
