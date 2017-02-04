/*
 * @Author: bishal
 * @Date:   2016-12-29 13:26:19
 * @Last Modified by:   rebatov
 * @Last Modified time: 2017-02-04 16:22:16
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


/*
paginated results
*/
var obj;
router.post('/listNeed/', function(req, res) {

    console.log(req.body);
    /*
    author:bishal
    Getting the needed page of language
     */
    resultController.getNeeded(req.body, function(err, result1) {
        if (err) {
            res.status(500).send(err);
        } else {
            /*
            author:bishal
            Getting the count of total languages in DB
             */
            resultController.getCount(req.body, function(err, result2) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    obj = ({
                        documents: result1.documents,
                        count: result2
                    })
                   res.status(200).send(obj);
                }
            })

        }
        
    });
});

module.exports = router;
