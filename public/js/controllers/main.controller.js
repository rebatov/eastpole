/*
 * @Author: bishal
 * @Date:   2017-01-02 15:19:54
 * @Last Modified by:   bishal
 * @Last Modified time: 2017-02-12 10:01:41
 */

'use strict';

var temp_qstn;
var idarray = [];
var usridarray = [];
var temp_user;

let app = angular.module('mainCtrl', ['angularModalService', 'mymodal']).
controller('MainController', function(Modal,
    $rootScope, $location, Auth, $scope,
    $http, ModalService, Question, User, Result,Upload, $timeout) {


    // time check
    let hr = new Date().getHours();
    if (hr >= 12 && hr <= 17)
        $scope.welcome = "Good Afternoon!!"
    if (hr > 17 && hr <= 23)
        $scope.welcome = "Good Night!!"
    if (hr == 0)
        $scope.welcome = "Boo... it's midnight!! "
    if (hr > 0 && hr <= 11)
        $scope.welcome = "Good Morning!!"
    var initDoc = 3,
        initPage = 1;
    $scope.selCount = initDoc;
    $scope.currentPage = initPage;
    $scope.pageSize = initDoc;
    $scope.total = 20;
    $scope.page = initPage;
    $scope.docsPerPages = [2, 3, 5]

    /*
user paging
    */
    $scope.cPage = initPage;
    $scope.pSize = initDoc;
    $scope.tot = 20;
    /*
            $scope.loadhomepage=function(){
                console.log('test1');
                Auth.getUser();


            }*/


    /*
    initial qstn load
    */
    function stringifier(object) {
        console.log(object)
        var stringify = ""
        object.forEach(function(x, i) {
            x.options.forEach(function(y, j) {
                stringify += y + ",";
            })
            stringify = stringify.slice(0, -1);
            console.log(stringify)
            x.options = stringify
            stringify = ""
        })
        return object;

    }
    function stringy(object) {
        console.log(object)
        var stringify = ""
        object.forEach(function(x, i) {
                stringify += x + ",";
            })
            stringify = stringify.slice(0, -1);
            console.log(stringify)
        return stringify;

    }
    $scope.preload = function() {

        // for qstns
        var obj = {}
        obj.docsPerPage = $scope.selCount
        obj.pageNumber = 1
        var stringify = ""
        Question.paging(obj).
        success(function(success) {
            console.log('sucesss',success)
            // var o = stringifier(success.documents)
            // success.documents.forEach(function(dat, index) {
            //         dat.options.forEach(function(x, i) {
            //             stringify += x + ",";
            //         })
            //         stringify = stringify.slice(0, -1);
            //         console.log(stringify)
            //         dat.options = stringify;
            //         stringify = "";
            //     })
            // success.data.options = stringify
            $scope.qstnData = success.documents;
            // $scope.qstnData[0].question=utf8.decode($scope.qstnData[0].question)
            $scope.total = success.count
            console.log($scope.total)
        }).
        error(function(err) {
            console.log(err);
        })
        // for users
        var usr = {}
        usr.docsPerPage = initDoc
        usr.pageNumber = 1
        User.paging(usr).
        success(function(success) {
            console.log(success)
            $scope.userData = success.documents
            $scope.tot = success.count;
        }).
        error(function(err) {
            console.log(err)
        })
        Question.getSubject().success(function(success){
          console.log(success)
          $scope.subject = success.data;
        })
    }

    $scope.whatrole = ["admin", "student"]
    $scope.class = []
    Question.getSubject().success(function(success){
      console.log(success)
      $scope.subject = success.data;
    })
    // $scope.subject = ["gk", "Maths", "English","n"]
    for (var i = 1; i <= 12; i++) {
        $scope.class.push(i);
    }
    $scope.stat = ["published", "unpublished"]
    var hideNav = function() {
        console.log("Hidenav");
        $scope.flagNav = false;
    }
    $scope.flagNav = true;

    var pointer = this;
    $scope.test = 'kina mildaina';

    var global = '';


    $rootScope.loggedInAsAdmin = Auth.isLoggedInAsAdmin();
    console.log($rootScope.loggedInAsAdmin)
    $rootScope.loggedInAsStudent = Auth.isLoggedInAsStudent();
    $rootScope.username = Auth.getUser()
    $rootScope.$on('$routeChangeStart', function() {

        $rootScope.loggedInAsAdmin = Auth.isLoggedInAsAdmin();
        $rootScope.loggedInAsStudent = Auth.isLoggedInAsStudent();
        $rootScope.username = Auth.getUser();
        // Auth.getUser()
        //     .then(function(data) {
        //     pointer.user = data.data;
        // });
    });


    pointer.doLogin = function() {

        pointer.processing = true;

        pointer.error = '';
        // console.log(pointer.loginData.Username)
        Auth.login(pointer.loginData.username, pointer.loginData.password)
            .success(function(data) {
                pointer.processing = false;
                console.log('checking here', data);
                // Auth.getUser()
                //     .then(function(data) {
                //     pointer.user = data.data;
                //     global = pointer.user;
                //     console.log('global' + global);
                //     console.log('data fetched '+ pointer.user.Username);
                //     $scope.Username = pointer.user.Username;
                //     console.log('$scope '+ $scope.Username);
                // });

                if (data.success) {
                    $scope.obj = global;
                    console.log("here" + $scope.obj);
                    $location.path('/');
                }
                // $scope.Username = global;
                else {
                    pointer.error = data.message;
                    console.log(pointer.error)
                }
                $scope.flagInvalid = true;

            });
    }

    pointer.doLogout = function() {
        console.log("LOGOUT")
        swal({
                title: "Are you sure?",
                text: "You are about to end the session",
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
                    Auth.logout();
                    location.reload('/');
                } else {
                    swal("Cancelled", "You can continue", "success");
                }
            });
        //        window.location.reload();
    }

    /*
    signup
    */
    $scope.signup = function() {
        Modal.toggleModal();
        $scope.showaddUserModal = Modal.showModal;
        console.log($scope.showaddUserModal)
    }

    //    $scope.signout = function(){
    //        console.log(pointer.user.Username);
    //        $http.delete('/api/signout/'+ pointer.user.username).success(function(err){
    //            if(err)
    //                console.log(err);
    //            else{
    //                Auth.logout();
    //                $location.path('/logout');
    //            }
    //        })
    //    }

    $scope.add_questions = function() {
        console.log("at adding qstn")
        Modal.toggleModal();
        $scope.showaddQstnModal = Modal.showModal;
    }

    $scope.qstnAdder = function(obj) {
        let arr = [];
        console.log(obj);
        if(obj.options.indexOf(',') == -1){
          alert("Options are comma separated!")
          location.reload()
        }
        else{
        arr = obj.options.split(',')
        obj.options = arr;
        obj.question = encodeURI(obj.question);
        obj.answer = encodeURI(obj.answer);
        obj.options.forEach(function(key,index){
          obj.options[index] = encodeURI(key);
        })
        Question.create(obj).success(
            function(success) {
                console.log(success)
                location.reload();
            }).
        error(function(err) {
            console.log(err);
            location.reload();
        })
        // location.reload();
    }
  }



    $scope.add_users = function() {
        console.log("at adding qstn")
        Modal.toggleModal();
        $scope.showaddUserModal = Modal.showModal;
    }

    $scope.userAdder = function(obj) {
        console.log(obj,Object.keys(obj).length);
        if(Object.keys(obj).length < 9){
          alert("Form not completely filled")
          location.reload();
        }
        if (Object.keys(obj).length == 9 && obj.password === obj.rePassword) {
          console.log("8 here")
            User.create(obj).
            success(function(success) {
                console.log(success)
                if(success.status == 200){
                  $scope.nowlogin = true;
                  swal("Successful signup","Now login with the credentials","success")
                  location.reload();
                }
                else{
                  swal("Error signup",success.message,"error")
                }
                // location.reload();
            }).
            error(function(err) {
                console.log(err)
                $scope.err = true;
                location.reload();
            })
        }
        else{
          alert("Password mismatch");
          location.reload();
        }
    }

    /*
    selct all cat
    */
    $scope.selectall = function(chkbox) {

        if (chkbox.select) {
            console.log('true');
            $scope.chk = {
                "select": true
            }
            for (var i = 0; i < $scope.qstnData.length; i++) {
                idarray.push($scope.qstnData[i]._id);
                $scope.selectCAT = true;

            };
            console.log(idarray);

        } else {
            $scope.chk = {
                "select": false
            }
            idarray = [];
            $scope.selectCAT = false;
        }


    }
    /*
    select one
    */

    $scope.selectQstn = function(chk, each) {
      console.log('each',each)
        if (chk.select) {
            temp_qstn = each;
            if (idarray.indexOf(each._id) == -1) {
                idarray.push(each._id);
            }
            console.log(idarray);
        } else {


            idarray.splice(idarray.indexOf(each._id), 1);
        }
        console.log(idarray.length);
        if (idarray.length > 0) $scope.selectCAT = true;
        else {
            $scope.selectCAT = false;
        }


    }


    /*
    for edit qstn modal
    */
    $scope.edit_qstn = function() {
        if (idarray.length > 1) {
            swal("Select only one data","Multiple edits not supported for now","warning")
        } else {
            $scope.showQstnEditModal = Modal.showModal;
            Modal.toggleModal();
            console.log('before',temp_qstn)
            var basicArray = temp_qstn.options.map(function(k){console.log(k);return k.value})
            // temp_qstn.answerPath = temp_qstn.answer.path
            let index = temp_qstn.answer
            temp_qstn.questionPath = temp_qstn.question.path;
            temp_qstn.opts = temp_qstn.options;
            temp_qstn.question = temp_qstn.question.value;
            console.log(basicArray)
            temp_qstn.ans = temp_qstn.answer;
            temp_qstn.answer = temp_qstn.options[temp_qstn.ans].value;
            temp_qstn.options = stringy(basicArray)
            console.log(temp_qstn.answer,temp_qstn.options)
            temp_qstn.updatedDate = new Date(temp_qstn.updatedDate);
            $scope.editQstn = temp_qstn;
            console.log(temp_qstn)
        }
    }

    $scope.publish_qstns = function() {
        Question.publish(idarray).success(
            function(success) {
                console.log(success)
                location.reload();
            }).error(function(err) {
            console.log(err)
        })
    }

    $scope.unpublish_qstns = function() {
        Question.unpublish(idarray).success(
            function(success) {
                console.log(success)
                location.reload();
            }).error(function(err) {
            console.log(err)
        })
    }

    $scope.qstnEditor = function(obj) {
        let arr = [];
        console.log(obj);
        arr = obj.options.split(',')
        obj.options = arr;
        Question.edit(obj).
        success(function(success) {
            console.log(success);
            swal('Edit failed','','success')
            location.reload();
        }).
        error(function(err) {
            console.log(err);
            swal('Edit failed','','error')
            location.reload();
        })
    }

    $scope.del_qstn = function() {
        console.log(idarray);
        Question.delete(idarray).
        success(function(success) {
            console.log(success)
            location.reload();
        }).
        error(function(err) {
            console.log(err)
            location.reload();
        })
    }

    /*
    for users
    */
    $scope.selectUser = function(chk, each) {

        if (chk.sel) {
            temp_user = each;
            if (usridarray.indexOf(each._id) == -1) {
                usridarray.push(each._id);
            }
            console.log(usridarray);
        } else {


            usridarray.splice(usridarray.indexOf(each._id), 1);
        }
        console.log(usridarray.length);
        if (usridarray.length > 0) {
            $scope.selectUSR = true;
        } else {
            $scope.selectUSR = false;
        }

    }

    $scope.edit_user = function() {
        if (usridarray.length > 1) {
            swal("Select only one data","Multiple edits not supported for now","warning")
        } else {
            console.log(temp_user)
            $scope.showUserEditModal = Modal.showModal;
            Modal.toggleModal();
            $scope.editUser = temp_user;
        }
    }


    $scope.userEditor = function(obj) {
        console.log(obj);
        User.edit(obj).success(function(success) {
            console.log(success)
            swal('Successful edit','','success')
            location.reload();
        }).error(function(err) {
            console.log(err);
            swal('Edit failed','','error')
            location.reload();
        })
    }


    $scope.del_user = function() {
        User.delete(usridarray).success(function(success) {
            console.log(success)
            swal("Successfull delete","Deleted required user/s","success")
            location.reload();
        }).error(function(err) {
            console.log(err)
            swal("Something went wrong",err,"error")
        })
    }

    /*
    pagination testing
    */

    $scope.DoCtrlPagingAct = function(page, pageSize, total) {
        console.log(page, pageSize, total)
        $scope.page = page
        initDoc = $scope.selCount;
        var obj = {}
        obj.docsPerPage = pageSize;
        obj.pageNumber = page
        Question.paging(obj).
        success(function(success) {
            console.log(success)
            // var o = stringifier(success.documents)
            $scope.qstnData = success.documents
        }).error(function(err) {
            console.log(err);
        })

    }

    $scope.perPage = function(perpage) {
        console.log(perPage)
    }

    // $scope.$watch('selCount', function(selCount) {
    //     console.log(selCount)
    //     initDoc = $scope.selCount;
    //     var obj = {}
    //     obj.docsPerPage = initDoc;
    //     obj.pageNumber = $scope.page
    //     Question.paging(obj).
    //     success(function(success) {
    //         console.log(success)
    //         $scope.qstnData = success.documents
    //     }).error(function(err) {
    //         console.log(err);
    //     })
    // })
    $scope.value = 3
    $scope.selector = function(value) {
        console.log(value)
        var obj = {};
        obj.docsPerPage = parseInt(value);
        obj.pageNumber = 1
        Question.paging(obj).
        success(function(success) {
            console.log(success)
            // var o = stringifier(success.documents)
            $scope.qstnData = success.documents
            $scope.total = success.count
            $scope.pageSize = obj.docsPerPage
        }).error(function(err) {
            console.log(err);
        })
        // console.log($scope.value)
    }

    /*
    userpaging
    */
    $scope.val = 3
    $scope.userPaging = function(page, pageSize, total) {
        console.log(page, pageSize, total)
        $scope.cPage = page
        initDoc = $scope.selCount;
        var obj = {}
        obj.docsPerPage = pageSize;
        obj.pageNumber = $scope.cPage;
        User.paging(obj).
        success(function(success) {
            console.log(success)
            $scope.userData = success.documents
            $scope.tot = success.count;
        }).error(function(err) {
            console.log(err);
        })

    }

    $scope.selecting = function(val) {
        console.log(val)
        var obj = {};
        obj.docsPerPage = parseInt(val);
        obj.pageNumber = 1
        User.paging(obj).
        success(function(success) {
            console.log(success)
            $scope.userData = success.documents
            $scope.tot = success.count
            $scope.pSize = obj.docsPerPage
        }).error(function(err) {
            console.log(err);
        })
        // console.log($scope.value)
    }


    /*
    class wise filtering
    */
    $scope.valCQ = 3
    $scope.total = 5
    $scope.whichClass = function(grade) {
        $scope.classPagination = true;
        $scope.subjectPagination = false;
        $scope.whichGrade = grade
        console.log(grade)
        var obj = {}
        obj.class = grade;
        obj.docsPerPage = initDoc;
        obj.pageNumber = 1
        Question.class(obj).success(function(success) {
            console.log(success)
            // $scope.qstnData = stringifier(success.documents);
            $scope.qstnData = success.documents
            $scope.total = success.count;
            $scope.pageSize = obj.docsPerPage;
        }).error(function(err) {
            console.log(err);
        })
    }
    $scope.classQstn = function(page, pageSize, total) {
        console.log(page, pageSize, total)
        $scope.currentPageClassQ = page
        var obj = {}
        obj.docsPerPage = pageSize;
        obj.pageNumber = $scope.currentPageClassQ;
        obj.class = $scope.whichGrade;
        Question.class(obj).
        success(function(success) {
            console.log(success)
            $scope.qstnData = success.documents
            $scope.total = success.count;
        }).error(function(err) {
            console.log(err);
        })

    }


    $scope.selectorQstnClass = function(value) {
        console.log(value)
        var obj = {};
        obj.docsPerPage = parseInt(value);
        obj.pageNumber = 1;
        obj.class = $scope.whichGrade
        Question.class(obj).
        success(function(success) {
            console.log(success)
            // var o = stringifier(success.documents)
            $scope.qstnData = success.documents
            $scope.total = success.count
            $scope.pageSize = obj.docsPerPage
        }).error(function(err) {
            console.log(err);
        })
        // console.log($scope.value)
    }
    /*
    sub wise filtering
    */
    $scope.valSQ = 3
    $scope.whichSubject = function(sub) {
        $scope.classPagination = false;
        $scope.subjectPagination = true;
        $scope.whichSub = sub
        console.log(sub)
        var obj = {}
        obj.subject = sub;
        obj.docsPerPage = initDoc;
        obj.pageNumber = 1
        Question.subject(obj).success(function(success) {
            console.log('sub',success)
            // $scope.qstnData = stringifier(success.documents)
            $scope.qstnData = success.documents
            $scope.total = success.count;
            $scope.pageSize = obj.docsPerPage;
        }).error(function(err) {
            console.log(err);
        })
    }

    $scope.subQstn = function(page, pageSize, total) {
        console.log(page, pageSize, total)
        $scope.currentPageClassQ = page
        var obj = {}
        obj.docsPerPage = pageSize;
        obj.pageNumber = $scope.currentPageClassQ;
        obj.subject = $scope.whichSub;
        Question.subject(obj).
        success(function(success) {
            console.log(success)
            $scope.qstnData = success.documents
            $scope.total = success.count;
        }).error(function(err) {
            console.log(err);
        })

    }

    $scope.selectorQstnSub = function(value) {
        console.log(value)
        var obj = {};
        obj.docsPerPage = parseInt(value);
        obj.pageNumber = 1;
        obj.subject = $scope.whichSub
        Question.subject(obj).
        success(function(success) {
            console.log(success)
          $scope.qstnData = success.documents
            // $scope.qstnData = o
            $scope.total = success.count
            $scope.pageSize = obj.docsPerPage
        }).error(function(err) {
            console.log(err);
        })
        // console.log($scope.value)
    }


    /*
    User class based pagination
    */
    $scope.valUsr = 3
    $scope.whichClassUser = function(grade) {
        $scope.classUserPagination = true;
        $scope.whichGrd = grade
        console.log(grade)
        var obj = {}
        obj.class = grade;
        obj.docsPerPage = initDoc;
        obj.pageNumber = 1
        User.class(obj).success(function(success) {
            console.log(success)
            $scope.userData = success.documents
            $scope.total = success.count;
            $scope.pageSize = obj.docsPerPage;
        }).error(function(err) {
            console.log(err);
        })
    }

    $scope.selectingClass = function(val) {
        console.log(val)
        var obj = {};
        obj.docsPerPage = parseInt(val);
        obj.pageNumber = 1
        obj.class = $scope.whichGrd
        User.class(obj).
        success(function(success) {
            console.log(success)
            $scope.userData = success.documents
            $scope.total = success.count
            $scope.pageSize = obj.docsPerPage
        }).error(function(err) {
            console.log(err);
        })
        // console.log($scope.value)
    }

    $scope.userClassPaging = function(page, pageSize, total) {
        console.log(page, pageSize, total)
        $scope.currentPage = page
        var obj = {}
        obj.docsPerPage = pageSize;
        obj.pageNumber = $scope.currentPage;
        obj.class = $scope.whichGrd;
        User.class(obj).
        success(function(success) {
            console.log(success)
            $scope.userData = success.documents
            $scope.total = success.count;
        }).error(function(err) {
            console.log(err);
        })

    }
      $scope.upload = function(file) {
        console.log(file)
        // if(file.type == "text/csv" || file.type == "application/vnd.ms-excel"){
      file.upload = Upload.upload({
        url: '/question/upload/',
        data: {class: $scope.class,subject:$scope.sub,file: file},
      });

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
      // }
      // else{
      //   swal("Filetype mismatch!", "Please upload CSV file", "error")
      // }
    }

    // multi publish


    $scope.btnMulti = function(){
      Modal.toggleModal();
      $scope.showMulti = Modal.showModal;
    }

    $scope.multiStat = function(mul){
      console.log(mul)
      Question.multi(mul).success(function(data){
        console.log(data)
        if(data.status == 200){
          swal("Successful multi status change");
          location.reload();
        }
      })
    }

// add questions using images
$scope.add_questions_images = function(){
  $scope.nice = 0;
  // alert("here here")
  Modal.toggleModal();
  $scope.showaddQstnPicModal = Modal.showModal;
}

$scope.uploadFile = function(x,y,z){
  console.log(x,y,z)
  var filename = event.target.files[0].name;
        alert('file was selected: ' + filename);
}

$scope.upload_now = function(obj){
  // console.log(obj)
  let x = 'file'+obj.answer;
  obj.answer = x;
  console.log(obj)
  var formData = new FormData()
  for ( var key in obj ) {
    formData.append(key, obj[key]);
}
  console.log(formData)
  jQuery.ajax({
    url: '/question/create/',
    data: formData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    dataType: 'json',
    processData: false,
    type: 'POST',
    success: function(data){
        console.log(data);
    },
    error: function(err){
      console.log(err);
    }
});
}

})



//Directive that returns an element which adds buttons on click which show an alert on click
app.directive("addbuttonsbutton", function(){
	return {
		restrict: "E",
		template: "<button addbuttons>Click to add options</button>"
	}
});

//Directive for adding buttons on click that show an alert on click
app.directive("addbuttons", function($compile){
	return function(scope, element, attrs){
		element.bind("click", function(){
			scope.nice++;
			angular.element(document.getElementById('space-for-buttons')).append($compile("<input type='file' ngf-select ng-model='addPicQstn.file"+scope.nice+ "' "+"name=file-"+scope.nice
             + "accept='image/*' ngf-max-size='2MB' required ngf-model-invalid='errorFile'><i ng-show='myForm.file.$error.required'>*required</i><br>")(scope));
		});
	};
});

app.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      console.log(attrs)
      var onChangeFunc = scope.$eval(attrs.customOnChange);
      element.bind('change', onChangeFunc);
    }
  };
});

//Directive for showing an alert on click
app.directive("alert", function(){
	return function(scope, element, attrs){
		element.bind("click", function(){
			console.log(attrs);
			alert("This is alert #"+attrs.alert);
		});
	};
})
app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
  // $scope.uploadtest = "voila"
  //   $scope.upload = function(file) {
  //   file.upload = Upload.upload({
  //     url: '/question/upload/',
  //     data: {username: $scope.username, file: file},
  //   });
  //
  //   file.upload.then(function (response) {
  //     $timeout(function () {
  //       file.result = response.data;
  //     });
  //   }, function (response) {
  //     if (response.status > 0)
  //       $scope.errorMsg = response.status + ': ' + response.data;
  //   }, function (evt) {
  //     // Math.min is to fix IE which reports 200% sometimes
  //     file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
  //   });
  //   }
}]);
