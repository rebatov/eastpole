/*
 * @Author: bishal
 * @Date:   2016-12-29 13:26:19
 * @Last Modified by:   bishal
 * @Last Modified time: 2017-02-12 12:59:49
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
    var obj;
    console.log(req.body);
    /*
    author:bishal
    Getting the needed page of language
     */
    resultController.getResultByTerm(req.body, function(err, result1) {
        if (err) {
            res.status(500).send(err);
        } else {
            /*
            author:bishal
            Getting the count of total languages in DB
             */
            resultController.getCountForTerm(req.body, function(err, result2) {
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
})

router.post('/subject', function(req, res) {
    var obj;
    console.log(req.body);
    /*
    author:bishal
    Getting the needed page of language
     */
    resultController.getResultBySubject(req.body, function(err, result1) {
        if (err) {
            res.status(500).send(err);
        } else {
            /*
            author:bishal
            Getting the count of total languages in DB
             */
            resultController.getCountForSubject(req.body, function(err, result2) {
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
    var obj;
    console.log(req.body);
    /*
    author:bishal
    Getting the needed page of language
     */
    resultController.getResultByClass(req.body, function(err, result1) {
        if (err) {
            res.status(500).send(err);
        } else {
            console.log(result1)
            /*
            author:bishal
            Getting the count of total languages in DB
             */
            resultController.getCountForClass(req.body, function(err, result2) {
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


router.post('/query',function(req,res){
    resultController.parseQuery(req.body,function(err,data){
        if(err){
            res.json({
                "status":500,
                "message":"Internal server error"
            })
        }
        else{
            res.json({
                "status":200,
                "message":"success",
                data:data
            })
        }
    })
})

module.exports = router;
