/*
* @Author: bishal
* @Date:   2017-01-02 15:17:27
* @Last Modified by:   rebatov
* @Last Modified time: 2017-02-03 22:16:50
*/

'use strict';
angular.module('app',['ngRoute','mainCtrl','appRoutes','authService',
				'angularModalService','mymodal',
				'qstnService','userService'
	])
// .config(function($httpProvider) {
//  	$httpProvider.interceptors.push('AuthInterceptor');
//  })
.config(function($httpProvider) {

 	$httpProvider.interceptors.push('AuthInterceptor');


 })