/*
 * @Author: rebatov
 * @Date:   2017-02-03 22:15:52
 * @Last Modified by:   rebatov
 * @Last Modified time: 2017-02-04 20:05:57
 */

'use strict';
angular.module('userService', [])
    .factory('User', function($http) {
        var UserFactory = {};
        UserFactory.create = function(usr) {
            return $http.post('/user/createUser', usr)
        }

        UserFactory.get = function(usr) {
            return $http.get('/user/getUsers')
        }

        UserFactory.edit = function(usr){
        	return $http.post('/user/edituser',usr)
        }

        UserFactory.delete = function(array){
        	return $http.post('/user/delete',array)
        }

        UserFactory.getUser = function(username){
        	var x = {}
        	x.username=username
        	return $http.post('/user/who',x)
        }


         UserFactory.paging = function(obj){
        	return $http.post('/user/listNeed',obj)
        }
        return UserFactory;
    });
