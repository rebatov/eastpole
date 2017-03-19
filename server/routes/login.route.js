/*
* @Author: bishal
* @Date:   2016-12-28 22:05:03
* @Last Modified by:   bishal
* @Last Modified time: 2016-12-29 12:35:17
*/

'use strict';
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.model');
var token = require('../utilities/tokenHandling');
// var controller=require('../controllers/user.controller');
var password_encrypt=require('../utilities/password_encrypt');
var pass_encrypt=new password_encrypt();
// var userController= new controller();
var Islogged = require('../utilities/loginCheck');
var islogged = new Islogged();




var tokenAuth = new token();

router.post('/' , function(req,res){
	console.log(req.body)
	       User.findOne({
            username: req.body.username
        }).
        select('username password role').
        exec(function(err,user){
            if(err) throw err;
            if(!user){
                res.send({message: "No user of that username"});
            }
            else if(user){
               // console.log(req.body.Password);
               console.log(user.password); 
                var validPassword = pass_encrypt.comparePassword(req.body.password ,user.password);

                if(!validPassword){
                    res.send({message: "Password invalid"});
                }
                else{

                    //token
                    var token = tokenAuth.createToken(user);
                    
                    res.json({
                        user: user,
                        success: true,
                        message: "Successful login",
                        token: token
                    });
                }
            }
        });
    });

module.exports = router;