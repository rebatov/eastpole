/*
* @Author: rebatov
* @Date:   2017-02-03 21:05:47
* @Last Modified by:   bishal
* @Last Modified time: 2017-02-11 20:55:40
*/

'use strict';
var mymodal = angular.module('mymodal', []);

mymodal.factory('Modal', function () {
    var modalfact = {};
    modalfact.showModal = true;
    modalfact.toggleModal = function(){
	   console.log('at modal');
        modalfact.showModal = true;
    };
    return modalfact;
  });

mymodal.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'EA',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        console.log('Hiyaaa')
        scope.title = attrs.title;
        scope.$watch(attrs.visible, function(value){
          console.log(scope,value);
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });
