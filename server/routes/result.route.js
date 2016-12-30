/*
 * @Author: bishal
 * @Date:   2016-12-29 13:26:19
 * @Last Modified by:   bishal
 * @Last Modified time: 2016-12-29 21:15:27
 */

'use strict';
var express = require('express');
var router = express.Router();
require('../models/result.model');
var Controller = require('../controllers/result.controller');
var resultController = new Controller();

router.get('/get', function(req, res) {
    resultController.getResults(function(err, results) {
        if (err){
        	console.log(err);
            res.json({
                "status": 500,
                "message": "Internal server error",
                "data": null
            });
        }
        else
            res.json({
                "status": 200,
                "message": "Success",
                "data": results
            });
    })
})

router.post('/create', function(req, res) {
    resultController.create(req.body, function(err, result) {
        if (err){
        	console.log(err);
            res.json({
                "status": 500,
                "message": "Internal server error",
                "data": null
            });
        }
        else
            res.json({
                "status": 200,
                "message": "Success",
                "data": result
            });
    })
})


router.post('/term', function(req, res) {
    resultController.getResultByTerm(req.body.term, function(err, result) {
        if (err){
        	console.log(err);
            res.json({
                "status": 500,
                "message": "Internal server error",
                "data": null
            });
        }
        else
            res.json({
                "status": 200,
                "message": "Success",
                "data": result
            });
    })
})

router.post('/subject', function(req, res) {
    resultController.getResultBySubject(req.body.subject, function(err, result) {
        if (err){
        	console.log(err);
            res.json({
                "status": 500,
                "message": "Internal server error",
                "data": null
            });
        }
        else
            res.json({
                "status": 200,
                "message": "Success",
                "data": result
            });
    })
})


router.post('/student', function(req, res) {
    resultController.getResultByName(req.body.username, function(err, result) {
        if (err){
        	console.log(err);
            res.json({
                "status": 500,
                "message": "Internal server error",
                "data": null
            });
        }
        else
            res.json({
                "status": 200,
                "message": "Success",
                "data": result
            });
    })
})

router.post('/class', function(req, res) {
    resultController.getResultByClass(req.body.class, function(err, result) {
        if (err){
        	console.log(err);
            res.json({
                "status": 500,
                "message": "Internal server error",
                "data": null
            });
        }
        else
            res.json({
                "status": 200,
                "message": "Success",
                "data": result
            });
    })
})

module.exports = router;
