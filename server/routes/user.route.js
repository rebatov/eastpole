/*
 * @Author: bishal
 * @Date:   2016-12-28 21:11:11
 * @Last Modified by:   rebatov
 * @Last Modified time: 2017-02-04 00:49:01
 */

'use strict';
var express = require('express');
var router = express.Router();
require('../models/user.model');
var controller = require('../controllers/user.controller');
var userController = new controller();
var Islogged = require('../utilities/loginCheck');
var islogged = new Islogged();

router.get('/getUsers', function(req, res) {
    userController.getUsers(function(err, users) {
        if (err)
            res.json({
                "status": 500,
                "message": "Internal server error",
                "data": null
            })
        else {
            res.json({
                "status": "500",
                "message": "Success",
                "data": users
            })
        }
    });
});

router.post('/createUser', function(req, res) {
    userController.create(req.body, function(err, user) {
        if (err)
            res.json({
                "status": 500,
                "message": "Internal server error",
                "data": null
            })
        else {
            res.json({
                "status": 200,
                "message": "Success",
                "data": user
            })
        }
    });
});

router.post('/delete', function(req, res) {
    userController.delete(req.body, function(err, user) {
        if (err)
            res.json({
                "status": 500,
                "message": "Internal server error",
                "data": null
            })
        else {
            res.json({
                "status": 200,
                "message": "Success",
                "data": user
            })
        }
    });
})

router.post('/editUser', function(req, res) {
    userController.edit(req.body, function(err, user) {
        if (err)
            res.json({
                "status": 500,
                "message": "Internal server error",
                "data": null
            })
        else {
            res.json({
                "status": 200,
                "message": "Success",
                "data": user
            })
        }
    });
});

module.exports = router;
