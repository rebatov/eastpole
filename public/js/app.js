/*
* @Author: bishal
* @Date:   2017-01-02 15:17:27
* @Last Modified by:   rebatov
* @Last Modified time: 2017-02-04 16:31:43
*/

'use strict';
angular.module('app',['ngRoute','mainCtrl','appRoutes','authService',
				'angularModalService','mymodal',
				'qstnService','userService','stuCtrl',
				'bw.paging'
	])
// .config(function($httpProvider) {
//  	$httpProvider.interceptors.push('AuthInterceptor');
//  })
.config(function($httpProvider) {

 	$httpProvider.interceptors.push('AuthInterceptor');


 })