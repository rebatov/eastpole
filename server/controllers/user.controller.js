/*
 * @Author: bishal
 * @Date:   2016-12-28 21:22:05
 * @Last Modified by:   rebatov
 * @Last Modified time: 2017-02-04 00:48:45
 */

'use strict';
var mongoose = require('mongoose');
var User = mongoose.model('User');
require('../models/user.model');
var ObjectId = require('mongoose').Types.ObjectId;
var password_encrypt = require('../utilities/password_encrypt');
var pass_encrypt = new password_encrypt();
var userController = function() {};

userController.prototype.create = function(obj, callback) {
    var user = new User(obj);
    pass_encrypt.cryptPassword(user.password, function(err, hash) {
        if (err) {
            console.log(err);
        } else {
            user.password = hash;
            console.log(user.password);
            user.save(function(err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, result);
                }
            })
        }
    })
}

userController.prototype.getUsers = function(callback) {
    User.find({}, function(err, users) {
        if (err)
            callback(err)
        else {
            callback(null, users)
        }
    })
}
userController.prototype.edit = function(obj, callback) {
    console.log(obj)
    User.findOneAndUpdate({ _id: obj._id }, obj,
        function(err, updated) {
            if (err)
                callback(err)
            else {
                console.log(updated)
                callback(null, updated)
            }
        })
}


userController.prototype.delete = function(arr,callback){
	User.remove({_id: {$in:arr}},function(err,deleted){
		if(err)
			callback(err)
		else{
			callback(null,deleted)
		}
	})
}
module.exports = userController;
