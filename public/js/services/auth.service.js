/*
 * @Author: bishal
 * @Date:   2017-01-02 17:17:50
 * @Last Modified by:   rebatov
 * @Last Modified time: 2017-02-04 01:17:53
 */

'use strict';
angular.module('authService', [])



.factory('Auth', function($http, $q, AuthToken) {


    var authFactory = {};


    authFactory.login = function(username, password) {
        console.log(username);
        return $http.post('/login', {
                username: username,
                password: password
            })
            .success(function(data) {
                console.log("logged in")
                AuthToken.setToken(data);
                return data;
            })
    }

    authFactory.logout = function() {
        AuthToken.setToken();
    }

    authFactory.isLoggedInAsAdmin = function() {
        if (AuthToken.getTokenAndRole().role == "admin")
            return true;
        else
            return false;
    }

    authFactory.isLoggedInAsStudent = function() {
        if (AuthToken.getTokenAndRole().role == "student")
            return true;
        else
            return false;
    }

    authFactory.getUser = function() {
        if (AuthToken.getTokenAndRole())
            return AuthToken.getTokenAndRole().username;
        else
            return false;
    }

    // authFactory.getUser = function() {
    //     if(AuthToken.getToken()){
    //         console.log(AuthToken.getToken());
    //       var obj=  $http.get('/admin/login',{
    //         token: AuthToken.getToken()
    //       }).success(function(data){
    //                 console.log(data);
    //         });
    //       return obj;
    //     }
    //     else
    //         return $q.reject({ message: "User has no token"});

    // }


    return authFactory;

})


.factory('AuthToken', function($window) {

    var authTokenFactory = {};

    authTokenFactory.getTokenAndRole = function() {
        let obj = {};
        obj.token = $window.localStorage.getItem('token');
        obj.role = $window.localStorage.getItem('role');
        obj.username = $window.localStorage.getItem('username')
        return obj;
    }

    authTokenFactory.setToken = function(data) {
        // console.log('AT SETTOKEN',data.user);
        if (data) {
            $window.localStorage.setItem('token', data.token);
            $window.localStorage.setItem('role', data.user.role);
            $window.localStorage.setItem('username', data.user.username);
        } else {
            $window.localStorage.removeItem('role');
            $window.localStorage.removeItem('token');
            $window.localStorage.removeItem('username');
        }

    }

    return authTokenFactory;

})


.factory('AuthInterceptor', function($q, $location, AuthToken) {

    var interceptorFactory = {};


    interceptorFactory.request = function(config) {

        var token = AuthToken.getTokenAndRole();

        if (token) {

            config.headers['x-access-token'] = token.token;

        }

        return config;

    };




    return interceptorFactory;
});
