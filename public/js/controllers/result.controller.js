/*
 * @Author: bishal
 * @Date:   2017-02-12 10:09:44
 * @Last Modified by:   bishal
 * @Last Modified time: 2017-02-12 17:39:39
 */

'use strict';
var temp_rslt;
var idarray = [];
angular.module('resultCtrl', []).
controller('ResultController', function($scope, $rootScope,
    $location, Auth, User, Result) {
    var initDoc = 3;
    var initPage = 1;
    $scope.getResult = function() {
        var obj = {};
        obj.docsPerPage = initDoc;
        obj.pageNumber = initPage;
        Result.get(obj).success(function(data) {
            console.log(data)
            $scope.rsltData = data.documents
            $scope.total = data.count
            $scope.pageSize = initDoc;
            $scope.ifResult = true;
        }).error(function(err) {
            console.log(err)
        })
    }

    $scope.selectRslt = function(chk, each) {

        if (chk.select) {
            temp_rslt = each;
            if (idarray.indexOf(each._id) == -1) { idarray.push(each._id); }
            console.log(idarray);
        } else {
            idarray.splice(idarray.indexOf(each._id), 1);
        }
        console.log(idarray.length);
        if (idarray.length > 0) $scope.selectCAT = true;
        else { $scope.selectCAT = false; }

    }

    $scope.DoCtrlPagingAct = function(page, pageSize, total, val) {
        console.log(page, pageSize, total, val)
        if ($scope.returner == true) {
            console.log("returner",$scope)
            if($scope.query){
              $scope.query.pageNumber = page;
              $scope.query.docsPerPage = pageSize;
            Result.query($scope.query).success(function(data) {
                console.log(data)
                if (data.status == 200) {
                    console.log(data.data.documents)
                    $scope.rsltData = data.data.documents
                }
            }).error(function(err) {
                console.log('err');
            })
          }
          else{
            $scope.q.docsPerPage = pageSize;
            $scope.q.pageNumber = page;
            console.log($scope.q)
            Result.date($scope.q).success(function(data) {
                console.log(data)
                if (data.status == 200) {
                    console.log(data.data.documents)
                    $scope.rsltData = data.data.documents
                }
            }).error(function(err) {
                console.log('err');
            })
        }
      }else {
            console.log("else")
            var obj = {}
            obj.docsPerPage = pageSize;
            obj.pageNumber = page;
            Result.get(obj).success(function(data) {
                console.log(data)
                $scope.rsltData = data.documents;
            })
        }
    }

    $scope.selector = function(val) {
    	var obj ={}
    	obj.docsPerPage = parseInt(val);
    	obj.pageNumber = initPage;
        console.log(val)
        Result.get(obj).success(function(data) {
            console.log(data)
            $scope.rsltData = data.documents
            $scope.pageSize = obj.docsPerPage
            $scope.ifResult = true;
        }).error(function(err) {
            console.log(err)
        })

    }
    $scope.returner = false;

    $scope.advancedFilter = function() {
        $scope.returner = !$scope.returner;
    }

    $scope.dateQuery = function(query){
      query.docsPerPage = initDoc;
      query.pageNumber = initPage;
      query.date = query.date
      $scope.q = query;
      // $scope.query = null;
      console.log(query)
      Result.date($scope.q).success(function(data){
        console.log(data)
        if(data.status == 200){
          $scope.rsltData = data.data.documents
          $scope.pageSize = initDoc;
          $scope.page = initPage;
        }
      }).error(function(err) {
          alert(err);
      })
    }

    $scope.runQuery = function(query) {
        // console.log(query.subject, query.class,query.date.getFullYear())
        query.docsPerPage = initDoc;
        query.pageNumber = initPage;
        $scope.query = query
        $scope.q = null;
        Result.query(query).success(function(data) {
            console.log(data)
            if (data.status == 200) {
                console.log(data.data.documents)
                $scope.rsltData = data.data.documents
                $scope.pageSize = initDoc;
                $scope.page = initPage;
            }
        }).error(function(err) {
            console.log('err');
        })
    }
})
