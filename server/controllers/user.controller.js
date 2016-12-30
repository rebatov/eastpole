/*
* @Author: bishal
* @Date:   2016-12-28 21:22:05
* @Last Modified by:   bishal
* @Last Modified time: 2016-12-28 21:43:57
*/

'use strict';
var mongoose= require('mongoose');
var User=mongoose.model('User');
require('../models/user.model');
var ObjectId = require('mongoose').Types.ObjectId;
var password_encrypt=require('../utilities/password_encrypt');
var pass_encrypt=new password_encrypt();
var userController=function(){};

userController.prototype.create = function(obj,callback){
	var user = new User(obj);
	pass_encrypt.cryptPassword(user.password,function(err,hash){
		if(err){
			console.log(err);
		}
		else{
			user.password = hash;
			console.log(user.password);
			user.save(function(err,result){
				if(err){
					callback(err);
				}
				else{
					callback(null,result);
				}
			})
		}
	})
}

module.exports = userController;