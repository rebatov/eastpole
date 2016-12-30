/*
 * @Author: bishal
 * @Date:   2016-12-28 21:49:20
 * @Last Modified by:   bishal
 * @Last Modified time: 2016-12-29 11:42:09
 */

'use strict';
var mongoose = require('mongoose');
var Question = mongoose.model('Question');
require('../models/question.model');
var qstnController = function() {};

qstnController.prototype.create = function(question, callback) {
    console.log('Question', question)
    var qstn = new Question(question);
    qstn.save(function(err, result) {
        if (err)
            callback(err);
        else
            callback(null, result);
    });
}

qstnController.prototype.getQstns = function(callback) {
    Question.find({})
    .sort({createdDate:-1})
    .exec(function(err,questions){
    	if(err)
    		callback(err);
    	else
    		callback(null,questions)
    })
}

qstnController.prototype.getActive = function(callback) {
    Question.find({ status: "active" }, function(err, questions) {
        if (err)
            callback(err);
        else
            callback(null, questions);
    });
}

qstnController.prototype.updateOne = function(obj, callback) {
    console.log(obj)
    Question.findOneAndUpdate({ _id: obj._id }, obj, function(err, updated) {
        if (err)
            callback(err);
        else {
            console.log(updated)
            callback(null, updated);
        }
    });
}

qstnController.prototype.makeActive = function(obj, callback) {
    // console.log(obj)
    let activeArray = [];
    Question.find({ status: "active" }, function(err, questions) {
        if (err)
            callback(err);
        else {
            if (questions.length > 0) {
                for (var i = 0; i < questions.length; i++) {
                    activeArray.push(questions[i]._id)
                }
                if (activeArray.length == questions.length) {
                    Question.update({ "_id": { $in: activeArray } }, { "status": "inactive" }, { multi: true },
                        function(err, updated) {
                            if (err)
                                callback(err);
                            else {
                                console.log(activeArray)
                                var x = findInactive(obj);
                                callback(null,x);
                            }
                        })
                }
            } else {
            	console.log('HERE')
            	var y = findInactive(obj);
            	callback(null,y);
            }
        }
    });
}


qstnController.prototype.getClass = function(obj,callback) {
    Question.find({ class: obj.class }, function(err, questions) {
        if (err)
            callback(err);
        else
            callback(null, questions);
    });
}

function findInactive(obj) {
	let inactiveArray = [];
	console.log(obj);
    Question.find({
                class: obj.class,
                subject: obj.subject
        },
        function(err, qstns) {
            if (err)
                return(err);
            else {
            	console.log(qstns)
                for (var j = 0; j < qstns.length; j++) {
                    inactiveArray.push(qstns[j]._id);
                }
                if (inactiveArray.length == qstns.length) {
                    Question.update({ _id: { $in: inactiveArray } }, { status: "active" }, { multi: true },
                        function(err, updatedLast) {
                            if (err)
                                return err;
                            else{
                            	console.log(inactiveArray);
                                return updatedLast;
                            }
                        }
                    )
                }
            }
        }
    )
}
module.exports = qstnController;
