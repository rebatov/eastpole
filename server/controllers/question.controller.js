/*
 * @Author: bishal
 * @Date:   2016-12-28 21:49:20
 * @Last Modified by:   rebatov
 * @Last Modified time: 2017-02-05 00:26:02
 */

'use strict';
var mongoose = require('mongoose');
var Question = mongoose.model('Question');
let _ = require('lodash')
var mongoosePages = require('mongoose-pages');
require('../models/question.model');
require('../models/result.model');
var Result = mongoose.model('Result');
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


qstnController.prototype.bulk = function(array,callback){
  Question.create(array,function(err,data){
    if(err)
      callback(err)
      else{
        callback(null,data)
      }
  })
}



qstnController.prototype.delete = function(obj,callback) {
    Question.remove({ _id: {$in:obj} }, function(err, questions) {
        if (err)
            callback(err);
        else
            callback(null, questions);
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
    Question.findPaginated({"class":obj.class},function(err,result){
        if(err)
            callback(err)
        else{
            callback(null,result)
        }
    },obj.docsPerPage,obj.pageNumber)
}

qstnController.prototype.publish = function(idarray,callback){
   console.log(idarray)
    Question.update({_id:{$in:idarray}},
            {$set:{status:"published"}},
        {multi: true}
        ,function(err,result){
        if(err)
            callback(err)
        else{
            callback(null,result)
        }
    })
}


qstnController.prototype.publishClassAndSubject = function(obj,callback){
  //  console.log(idarray)
   Question.find({class:obj.class,subject:obj.subject},function(err,data){
     if(err)
     callback(err)
     else{
       let idarray = _.map(data,'_id')
       Question.update({_id:{$in:idarray}},
         {$set:{status:"published"}},
         {multi: true}
         ,function(err,result){
           if(err)
           callback(err)
           else{
             callback(null,result)
           }
         })

     }
   })
}

qstnController.prototype.unpublishClassAndSubject = function(obj,callback){
  //  console.log(idarray)
   Question.find({class:obj.class,subject:obj.subject},function(err,data){
     if(err)
     callback(err)
     else{
       let idarray = _.map(data,'_id')
       Question.update({_id:{$in:idarray}},
         {$set:{status:obj.status}},
         {multi: true}
         ,function(err,result){
           if(err)
           callback(err)
           else{
             callback(null,result)
           }
         })

     }
   })
}

qstnController.prototype.unpublish = function(idarray,callback){
   Question.update({_id:{$in:idarray}},
            {$set:{status:"unpublished"}},
        {multi: true}
        ,function(err,result){
        if(err)
            callback(err)
        else{
            callback(null,result)
        }
    })
}

qstnController.prototype.getClassCount = function(obj,callback){
    Question.find({class:obj.class}).count().exec(
        function(err,qstns){
            if(err)
                callback(err)
            else{
                callback(null,qstns)
            }
        }
        )
}

qstnController.prototype.getSubject = function(obj,callback) {
    Question.findPaginated({"subject":obj.subject},function(err,result){
        if(err)
            callback(err)
        else{
            callback(null,result)
        }
    },obj.docsPerPage,obj.pageNumber)
}

qstnController.prototype.getSubjectCount = function(obj,callback){
    Question.find({subject:obj.subject}).count().exec(
        function(err,qstns){
            if(err)
                callback(err)
            else{
                callback(null,qstns)
            }
        }
        )
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


qstnController.prototype.exam = function(obj,callback){
  console.log('what exam',obj)
    var responsearray = [];
    // obj.subject="gk"
    // obj.class=obj.class.toString()
    Question.find({
        class:obj.class,
        // subject:obj.subject,
        status:"published"
    }, function(err, questions) {
        if (err)
            callback(err);
        else{
            // console.log(questions)
        for(var x in questions){
            console.log(questions[x]['answer'])
            questions[x]['answer']=undefined
            // console.log(questions[x])
            responsearray.push(questions[x])
            if(responsearray.length === questions.length){
            callback(null,shuffle(responsearray))
            }
        }
        }
    });
}


qstnController.prototype.result = function(obj,callback){
  console.log(obj)
   let arr = _.map(obj.reqarray,'_id')
   let sorted = _.sortBy(obj.reqarray,'_id');
   var x = new Date();
   obj.year = x.getFullYear()
   let score = 0;
    Question.find({_id:{$in:arr}},function(err,rslt){
        if(err)
            callback(err)
        else{
            console.log(rslt)
            for(var each in rslt){
                console.log('compare',sorted[each].answer,rslt[each].answer)
                if(sorted[each].answer === rslt[each].answer){
                    score +=1;
                }
            }
            obj.score = score
            Result.create(obj,function(err,rslt){
                if(err)
                    callback(err)
                else{
                    callback(null,rslt)
                }
            })
        }
    })
}

qstnController.prototype.getCount = function(obj,callback){
    Question.count({},function(err,result){
        if(err){
            callback(err)
        }
        else{
            callback(null,result);
        }
    })
};

qstnController.prototype.getNeeded = function(obj,callback){
    Question.findPaginated({},function(err,result){
        if(err)
            callback(err)
        else{
            callback(null,result)
        }
    },obj.docsPerPage,obj.pageNumber)
}

// shuffler
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


// sorting
function sort(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

module.exports = qstnController;
