/* 
* @Author: bishal
* @Date:   2016-01-20 12:24:42
* @Last Modified by:   bishal
* @Last Modified time: 2016-12-29 13:03:03
*/

'use strict';

var jsonwebtoken = require('jsonwebtoken');
var bodyParser = require('body-parser');
var ObjectId = require('mongoose').Types.ObjectId;
var config = require('../../config/config.js');
var User = require('../models/user.model');
var secretKey = config.secretKey;

var tokenAuth = function(){};

tokenAuth.prototype.createToken=function(user){
	console.log("Your token is created successfully, " + user.username);
     var token= jsonwebtoken.sign({
        username: user.username,
        role:user.role
    },secretKey,{
        expiresIn: 60*60*24
    });
    return token;
}

tokenAuth.prototype.tokenAuthentication=function (req ,callback){
    /*console.log('test');
	 console.log('Req1 '+ req.body.token);
     console.log('Req2 '+ req.param('token'));
     console.log('Req3 '+ req.headers['x-access-token']);
*/
var token = req.body.token || req.param('token') || req.headers['x-access-token'];
 
        if(token){
           jsonwebtoken.verify(token,secretKey,function(err,decode){
                if(err){
                	//console.log('Error');
                    return callback(err);
                } 
                else{
                   // console.log('decodedd '+ decode.Name);
                    // req.decode = decode;
                    // console.log(decode);
                    return callback(null,decode);
                }
            });
        }

        else{
           return callback(null,false);
        }
   }

module.exports = tokenAuth;