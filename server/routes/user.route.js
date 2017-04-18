/*
 * @Author: bishal
 * @Date:   2016-12-28 21:11:11
 * @Last Modified by:   rebatov
 * @Last Modified time: 2017-02-05 16:24:32
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
var rcErr = "E11000 duplicate key error collection: student.users index: roll_1_class";
var uErr = "E11000 duplicate key error collection: student.users index: username_1 dup key";
router.post('/createUser', function(req, res) {
    userController.create(req.body, function(err, user) {
        if (err) {
            if (err.errmsg.indexOf(rcErr) > -1) {
                    userController.getRollClass(req.body, function(error, usr) {
                        if (error)
                            res.json({
                                "status": 500,
                                "message": "Internal server error",
                                "data": error
                            })
                        else {
                            usr[0].password = undefined;
                            console.log(usr[0])
                            res.json({
                                "status": 500,
                                "message": "User with your class and roll number already exists",
                                "data": usr
                            })
                        }
                    })
                }
                else{
                    res.json({
                                "status": 500,
                                "message": req.body.username+" username already exists"
                            })
                }
        } else {
            res.json({
                "status": 200,
                "message": "Success",
                "data": user
            })
        }
    });
});


router.post('/who', function(req, res) {
    userController.who(req.body, function(err, user) {
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


/*
paginated questions
*/
var obj;
router.post('/listNeed/', function(req, res) {

    console.log(req.body);
    /*
    author:bishal
    Getting the needed page of language
     */
    userController.getNeeded(req.body, function(err, result1) {
        if (err) {
            res.status(500).send(err);
        } else {
            /*
            author:bishal
            Getting the count of total languages in DB
             */
            userController.getCount(req.body, function(err, result2) {
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


var ob;
router.post('/getClass/', function(req, res) {

    console.log(req.body);
    /*
    author:bishal
    Getting the needed page of language
     */
    userController.getClass(req.body, function(err, result1) {
        if (err) {
            res.status(500).send(err);
        } else {
            /*
            author:bishal
            Getting the count of total languages in DB
             */
            userController.getClassCount(req.body, function(err, result2) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    ob = ({
                        documents: result1.documents,
                        count: result2
                    })
                    res.status(200).send(ob);
                }
            })

        }

    });
});

router.get('/count',function(req,res){
  userController.getCount(req.body,function(err, user) {
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

module.exports = router;
