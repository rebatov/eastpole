/*
* @Author: bishal
* @Date:   2016-12-29 20:28:02
* @Last Modified by:   rebatov
* @Last Modified time: 2017-02-04 16:22:03
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

resultController.prototype.getCount = function(obj,callback){
    Result.count({},function(err,result){
        if(err){
            callback(err)
        }
        else{
            callback(null,result);
        }
    })
};

resultController.prototype.getNeeded = function(obj,callback){
    Result.findPaginated({},function(err,result){
        if(err)
            callback(err)
        else{
            callback(null,result)
        }
    },obj.docsPerPage,obj.pageNumber)
}




module.exports = resultController;