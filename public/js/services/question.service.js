/*
 * @Author: rebatov
 * @Date:   2017-02-03 21:28:05
 * @Last Modified by:   rebatov
 * @Last Modified time: 2017-02-05 00:19:40
 */

'use strict';
angular.module('qstnService', [])
    .factory('Question', function($http) {
        var QuestionFactory = {};
        QuestionFactory.create = function(qstn) {
            return $http.post('/question/create', qstn)
        }

        QuestionFactory.get = function() {
            return $http.get('/question/get')
        }

        QuestionFactory.edit = function(qstn) {
            return $http.post('/question/updateOne', qstn)
        }
        QuestionFactory.delete = function(idarray) {
            return $http.post('/question/delete', idarray)
        }
        QuestionFactory.exam = function(obj) {
            console.log(obj)
            return $http.post('/question/exam', obj)
        }
        QuestionFactory.result = function(obj) {
            console.log(obj)
            return $http.post('/question/result', obj)
        }

        QuestionFactory.paging = function(obj) {
            console.log(obj)
            return $http.post('/question/listNeed', obj)
        }

        QuestionFactory.class = function(obj) {
            console.log(obj)
            return $http.post('/question/getClass', obj)
        }

        QuestionFactory.subject = function(obj) {
            console.log(obj)
            return $http.post('/question/getSubject', obj)
        }

        QuestionFactory.publish = function(idarray) {
            console.log(idarray)
            return $http.post('/question/publish', idarray)
        }
        QuestionFactory.unpublish = function(idarray) {
            console.log(idarray)
            return $http.post('/question/unpublish', idarray)
        }
        return QuestionFactory;
    });
