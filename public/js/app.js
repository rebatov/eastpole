/*
* @Author: bishal
* @Date:   2017-01-02 15:17:27
* @Last Modified by:   bishal
* @Last Modified time: 2017-01-02 17:18:53
*/

'use strict';
angular.module('app',['ngRoute','mainCtrl','appRoutes','authService'])
// .config(function($httpProvider) {
//  	$httpProvider.interceptors.push('AuthInterceptor');
//  })
.config(function($httpProvider) {

 	$httpProvider.interceptors.push('AuthInterceptor');


 })