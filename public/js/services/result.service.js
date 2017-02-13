/*
* @Author: bishal
* @Date:   2017-02-12 13:24:04
* @Last Modified by:   bishal
* @Last Modified time: 2017-02-12 17:19:38
*/

'use strict';
angular.module('resultService', []).
factory('Result', function($http) {
    var ResultFactory = {};
    ResultFactory.create = function(qstn) {
        return $http.post('/question/create', qstn)
    }

    ResultFactory.get = function(obj) {
        return $http.post('/result/listNeed',obj)
    }

    ResultFactory.query = function(query) {
        return $http.post('/result/query', query)
    }
    ResultFactory.delete = function(idarray) {
        return $http.post('/question/delete', idarray)
    }
    ResultFactory.exam = function(obj) {
        console.log(obj)
        return $http.post('/question/exam', obj)
    }
    ResultFactory.result = function(obj) {
        console.log(obj)
        return $http.post('/question/result', obj)
    }

    ResultFactory.paging = function(obj) {
        console.log(obj)
        return $http.post('/question/listNeed', obj)
    }

    ResultFactory.class = function(obj) {
        console.log(obj)
        return $http.post('/question/getClass', obj)
    }

    ResultFactory.subject = function(obj) {
        console.log(obj)
        return $http.post('/question/getSubject', obj)
    }

    ResultFactory.publish = function(idarray) {
        console.log(idarray)
        return $http.post('/question/publish', idarray)
    }
    ResultFactory.unpublish = function(idarray) {
        console.log(idarray)
        return $http.post('/question/unpublish', idarray)
    }
    return ResultFactory;
});