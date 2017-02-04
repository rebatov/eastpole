/*
 * @Author: bishal
 * @Date:   2017-01-02 15:19:54
 * @Last Modified by:   rebatov
 * @Last Modified time: 2017-02-04 20:47:55
 */

'use strict';

var temp_qstn;
var idarray = [];
var usridarray = [];
var temp_user;

angular.module('mainCtrl', ['angularModalService', 'mymodal']).
controller('MainController', function(Modal,
    $rootScope, $location, Auth, $scope,
    $http, ModalService, Question, User) {
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
    $scope.preload = function() {

        // for qstns
        var obj = {}
        obj.docsPerPage = $scope.selCount
        obj.pageNumber = 1
        var stringify = ""
        Question.paging(obj).
        success(function(success) {
            console.log(success)
            var o = stringifier(success.documents)
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
            $scope.qstnData = o;
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
    }

    $scope.whatrole = ["admin", "student"]
    $scope.class = []
    for (var i = 1; i <= 12; i++) {
        $scope.class.push(i);
    }
    $scope.stat = ["Publish", "Unpublish"]
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
                else
                    pointer.error = data.message;
                $scope.flagInvalid = true;

            });
    }

    pointer.doLogout = function() {
        console.log("LOGOUT")
        Auth.logout();
        $location.path('/logout');
        //        window.location.reload();
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
        arr = obj.options.split(',')
        obj.options = arr;
        Question.create(obj).success(
            function(success) {
                console.log(success)
                location.reload()
            }).
        error(function(err) {
                console.log(err);
                location.reload()
            })
            // location.reload();
    }



    $scope.add_users = function() {
        console.log("at adding qstn")
        Modal.toggleModal();
        $scope.showaddUserModal = Modal.showModal;
    }

    $scope.userAdder = function(obj) {
        console.log(obj);
        if (obj.password === obj.rePassword) {
            User.create(obj).
            success(function(success) {
                console.log(success)
            }).
            error(function(err) {
                console.log(err)
            })
        }
    }

    /*
    selct all cat
    */
    $scope.selectall = function(chkbox) {

            if (chkbox.select) {
                console.log('true');
                $scope.chk = { "select": true }
                for (var i = 0; i < $scope.qstnData.length; i++) {
                    idarray.push($scope.qstnData[i]._id);
                    $scope.selectCAT = true;

                };
                console.log(idarray);

            } else {
                $scope.chk = { "select": false }
                idarray = [];
                $scope.selectCAT = false;
            }
            console.log();


        }
        /*
        select one
        */

    $scope.selectQstn = function(chk, each) {

        if (chk.select) {
            temp_qstn = each;
            if (idarray.indexOf(each._id) == -1) { idarray.push(each._id); }
            console.log(idarray);
        } else {


            idarray.splice(idarray.indexOf(each._id), 1);
        }
        console.log(idarray.length);
        if (idarray.length > 0) $scope.selectCAT = true;
        else { $scope.selectCAT = false; }


    }


    /*
    for edit qstn modal
    */
    $scope.edit_qstn = function() {
        if (idarray.length > 1) {
            alert("Fuck you, select only one!")
        } else {
            $scope.showQstnEditModal = Modal.showModal;
            Modal.toggleModal();
            temp_qstn.updatedDate = new Date(temp_qstn.updatedDate);
            $scope.editQstn = temp_qstn;
        }
    }


    $scope.qstnEditor = function(obj) {
        let arr = [];
        console.log(obj);
        arr = obj.options.split(',')
        obj.options = arr;
        Question.edit(obj).
        success(function(success) {
            console.log(success)
            location.reload();
        }).
        error(function(err) {
            console.log(err);
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
            if (usridarray.indexOf(each._id) == -1) { usridarray.push(each._id); }
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
            alert("Fuck you, select only one!")
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
        }).error(function(err) {
            console.log(err);
        })
    }


    $scope.del_user = function() {
        User.delete(usridarray).success(function(success) {
            console.log(success)
        }).error(function(err) {
            console.log(err)
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
            var o = stringifier(success.documents)
            $scope.qstnData = o
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
                var o = stringifier(success.documents)
                $scope.qstnData = o
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


});
