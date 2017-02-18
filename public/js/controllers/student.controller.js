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
                    success.data.forEach(function(key,index){
                      console.log(key,index)
                      reqarray.push({_id:key._id,answer:null})
                    })
                }).error(function(err) {
                    console.log(err);
                })
            }
        ).error(function(err) {
            console.log(err);
        })
    }


    $scope.checkAnswer = function(x, y) {
        console.log(x, y,reqarray)
        reqObj = {
          "_id": y._id,
          "answer": x
        }
        var pos = reqarray.map(function(e) { return e._id; }).indexOf(y._id);
        console.log(pos)
        reqarray[pos].answer = x
        // reqarray[reqarray.indexOf(y._id)].answer = x
        // pusher(reqObj)
        // reqarray.forEach(function(key,index){
        //   if (key._id == reqObj._id){
        //     key.answer = reqObj.answer
        //   }
        //   else{
        //     key.answer = reqObj.answer
        //   }
        // })
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
        swal({
                title: "Are you sure?",
                text: "You are about submit the paper",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, I understand!",
                cancelButtonText: "No, cancel!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm) {
                if (isConfirm) {
                  console.log('obj',obj)
                  Question.result(obj).
                  success(function(success){
                    console.log(success)
                    swal("Thanks for your patience", "We'll notify you further", "success");
                    Auth.logout();
                    location.reload('/');
                  }).error(function(err){
                    console.log(err)
                  })
                } else {
                    swal("Cancelled", "You can continue", "success");
                }
            });
    }

    /*
	function pusher
    */
    function pusher(obj) {
        var found = reqarray.some(function(el,x) {
        	console.log(el,obj,x,reqarray)
          reqarray[x].answer = obj.answer
          reqarray[x]._id=obj._id
            return el._id === obj._id;
        });
        if (!found) {
            reqarray.push({ _id: obj._id, answer: obj.answer });
            console.log('reqarray',reqarray);
        }
    }




})
