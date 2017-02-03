/*
 * @Author: rebatov
 * @Date:   2017-02-03 21:28:05
 * @Last Modified by:   rebatov
 * @Last Modified time: 2017-02-04 00:41:49
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

        return QuestionFactory;
    });
