/*
* @Author: bishal
* @Date:   2016-12-29 20:28:02
* @Last Modified by:   bishal
* @Last Modified time: 2016-12-29 21:18:41
*/

'use strict';
var mongoose = require('mongoose');
var Result = mongoose.model('Result');
require('../models/result.model');
var resultController = function() {};

resultController.prototype.create = function(result,callback){
	var rslt = new Result(result);
	rslt.save(function(err,data){
		if(err)
			callback(err);
		else{
			callback(null,data);
		}
	})
}

resultController.prototype.getResultByName = function(username,callback){
Result.find({username:username}).exec(function(err,result){
	if(err)
		callback(err);
	else
		callback(null,result);
})
}

resultController.prototype.getResultByClass = function(Class,callback){
Result.find({class:Class}).exec(function(err,result){
	if(err)
		callback(err);
	else
		callback(null,result);
})
}

resultController.prototype.getResultBySubject = function(subject,callback){
Result.find({subject:subject}).exec(function(err,result){
	if(err)
		callback(err);
	else
		callback(null,result);
})
}

resultController.prototype.getResultByTerm = function(term,callback){
Result.find({term:term}).exec(function(err,result){
	if(err)
		callback(err);
	else
		callback(null,result);
})
}
module.exports = resultController;