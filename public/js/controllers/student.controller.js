/*
 * @Author: rebatov
 * @Date:   2017-02-04 11:30:59
 * @Last Modified by:   bishal
 * @Last Modified time: 2017-02-12 12:38:27
 */

'use strict';
angular.module('stuCtrl', []).
controller('StudentController', function($scope, $rootScope, 
    $location,Auth, User, Question
) {
    var reqObj = {
        "_id": null,
        "answer": null
    }
    var reqarray = []

    $scope.getQstns = function() {
        var usr = {};
        $scope.user = Auth.getUser();
        User.getUser($scope.user).success(
            function(success) {
                console.log(success)
                usr = success.data[0];
                Question.exam(usr).success(function(success) {
                    console.log(success)
                    $scope.subject = success.data[0].subject
                    $scope.class = success.data[0].class
                    $scope.term = success.data[0].term
                    $scope.qstns = success.data
                }).error(function(err) {
                    console.log(err);
                })
            }
        ).error(function(err) {
            console.log(err);
        })
    }


    $scope.checkAnswer = function(x, y) {
        console.log(x, y)
        reqObj._id = y._id
        reqObj.answer = x
        pusher(reqObj)
        reqObj = {
            "_id": null,
            "answer": null
        }
    }

    $scope.submitQstns = function() {
        console.log(reqarray)
        var obj = {
        	reqarray:reqarray,
        	username:$scope.user,
        	subject:$scope.subject,
            class:$scope.class,
            term:$scope.term
        }
        Question.result(obj).
        success(function(success){
        	console.log(success)
        }).error(function(err){
        	console.log(err)
        })
    }

    /*
	function pusher
    */
    function pusher(obj) {
        var found = reqarray.some(function(el) {
        	console.log(el)
            return el._id === obj._id;
        });
        if (!found) {
            reqarray.push({ _id: obj._id, answer: obj.answer });
        }
    }




})
