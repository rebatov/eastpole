/*
 * @Author: bishal
 * @Date:   2016-12-28 21:48:38
 * @Last Modified by:   rebatov
 * @Last Modified time: 2017-02-03 23:44:09
 */

'use strict';
var express = require('express');
var router = express.Router();
require('../models/question.model');
var Controller = require('../controllers/question.controller');
var qstnController = new Controller();
var Islogged = require('../utilities/loginCheck');
var islogged = new Islogged();

router.get('/get', function(req, res) {
    islogged.islogged(req, function(err, logged) {
        console.log(logged)
        if (logged.role != "admin") {
            res.json({
                "status": 500,
                "message": "Not logged in"
            })
        } else {
            qstnController.getQstns(function(err, questions) {
                if (err)
                    res.json({
                        "status": 500,
                        "message": "Internal server error",
                        "data": null
                    });
                else
                    res.json({
                        "status": 200,
                        "message": "Success",
                        "data": questions
                    });
            })
        }
    })
})
router.post('/delete', function(req, res) {
    islogged.islogged(req, function(err, logged) {
        if (logged.role != "admin") {
            res.json({
                "status": 500,
                "message": "Not logged in"
            })
        } else {
        	console.log(req.body)
            qstnController.delete(req.body, function(err, question) {
                if (err)
                    res.json({
                        "status": 500,
                        "message": "Internal server error",
                        "data": null
                    });
                else
                    res.json({
                        "status": 200,
                        "message": "Success",
                        "data": question
                    });
            })
        }
    })
})
router.post('/create', function(req, res) {
    islogged.islogged(req, function(err, logged) {
        if (logged.role != "admin") {
            res.json({
                "status": 500,
                "message": "Not logged in"
            })
        } else {
            qstnController.create(req.body, function(err, question) {
                if (err)
                    res.json({
                        "status": 500,
                        "message": "Internal server error",
                        "data": null
                    });
                else
                    res.json({
                        "status": 200,
                        "message": "Success",
                        "data": question
                    });
            })
        }
    })
});

router.get('/active', function(req, res) {
    islogged.islogged(req, function(err, logged) {
        if (logged.role != "admin") {
            res.json({
                "status": 500,
                "message": "Not logged in"
            })
        } else {
            qstnController.getActive(function(err, questions) {
                if (err)
                    res.json({
                        "status": 500,
                        "message": "Internal server error",
                        "data": null
                    });
                else
                    res.json({
                        "status": 200,
                        "message": "Success",
                        "data": questions
                    });
            })
        }
    })
});


router.post('/makeActive', function(req, res) {
    islogged.islogged(req, function(err, logged) {
        if (logged.role != "admin") {
            res.json({
                "status": 500,
                "message": "Not logged in"
            })
        } else {
            qstnController.makeActive(req.body, function(err, questions) {
                if (err)
                    res.json({
                        "status": 500,
                        "message": "Internal server error",
                        "data": null
                    });
                else
                    res.json({
                        "status": 200,
                        "message": "Success",
                        "data": questions
                    });
            })
        }
    })
});


router.post('/updateOne', function(req, res) {
    islogged.islogged(req, function(err, logged) {
        if (logged.role != "admin") {
            res.json({
                "status": 500,
                "message": "Not logged in"
            })
        } else {
            qstnController.updateOne(req.body, function(err, questions) {
                if (err)
                    res.json({
                        "status": 500,
                        "message": "Internal server error",
                        "data": null
                    });
                else
                    res.json({
                        "status": 200,
                        "message": "Success",
                        "data": questions
                    });
            })
        }
    })
});


router.post('/getClass', function(req, res) {
    islogged.islogged(req, function(err, logged) {
        if (logged.role != "admin") {
            res.json({
                "status": 500,
                "message": "Not logged in"
            })
        } else {
            qstnController.getClass(req.body, function(err, questions) {
                if (err)
                    res.json({
                        "status": 500,
                        "message": "Internal server error",
                        "data": null
                    });
                else
                    res.json({
                        "status": 200,
                        "message": "Success",
                        "data": questions
                    });
            })
        }
    })
});

module.exports = router;