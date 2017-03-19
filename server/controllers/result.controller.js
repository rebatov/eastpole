/*
 * @Author: bishal
 * @Date:   2016-12-29 20:28:02
 * @Last Modified by:   bishal
 * @Last Modified time: 2017-02-12 13:19:57
 */

'use strict';
var mongoose = require('mongoose');
var Result = mongoose.model('Result');
require('../models/result.model');
var resultController = function() {};

resultController.prototype.create = function(result, callback) {
    var rslt = new Result(result);
    rslt.save(function(err, data) {
        if (err)
            callback(err);
        else {
            callback(null, data);
        }
    })
}

resultController.prototype.getResultByName = function(username, callback) {
    Result.find({
        username: username
    }).exec(function(err, result) {
        if (err)
            callback(err);
        else
            callback(null, result);
    })
}

resultController.prototype.getCountForClass = function(obj, callback) {
    Result.count({
        class: obj.class
    }, function(err, result) {
        if (err) {
            callback(err)
        } else {
            callback(null, result);
        }
    })
};

resultController.prototype.getResultByClass = function(obj, callback) {
    Result.findPaginated({
        class: obj.class
    }, {}, {
        sort: {
            date: -1
        }
    }, function(err, result) {
        if (err)
            callback(err)
        else {
            callback(null, result)
        }
    }, obj.docsPerPage, obj.pageNumber)
}


resultController.prototype.getCountForSubject = function(obj, callback) {
    Result.count({
        subject: obj.subject
    }, function(err, result) {
        if (err) {
            callback(err)
        } else {
            callback(null, result);
        }
    })
};

resultController.prototype.getResultBySubject = function(obj, callback) {
    Result.findPaginated({
        subject: obj.subject
    }, {}, {
        sort: {
            date: -1
        }
    }, function(err, result) {
        if (err)
            callback(err)
        else {
            callback(null, result)
        }
    }, obj.docsPerPage, obj.pageNumber)
}

resultController.prototype.getCountForTerm = function(obj, callback) {
    Result.count({
        term: obj.term
    }, function(err, result) {
        if (err) {
            callback(err)
        } else {
            callback(null, result);
        }
    })
};


resultController.prototype.getResultByTerm = function(obj, callback) {
    Result.findPaginated({
        term: obj.term
    }, {}, {
        sort: {
            date: -1
        }
    }, function(err, result) {
        if (err)
            callback(err)
        else {
            callback(null, result)
        }
    }, obj.docsPerPage, obj.pageNumber)
}



resultController.prototype.getCountForDate = function(obj, callback) {

  var year = obj.date.split('-')[0];
    Result.count({
        date: {"$gte": new Date(obj.date)}
    }, function(err, result) {
        if (err) {
            callback(err)
        } else {
          console.log(result)
            callback(null, result);
        }
    })
};


resultController.prototype.getResultByDate = function(obj, callback) {
  console.log(obj.date.split('-'))

    Result.findPaginated({
        date: {"$gte": new Date(obj.date)}
    }, {}, {
    }, function(err, result) {
        if (err)
            callback(err)
        else {
          console.log(result)
            callback(null, result)
        }
    }, obj.docsPerPage, obj.pageNumber)
}


resultController.prototype.getCountForClassAndSubject = function(obj, callback) {
    Result.count({
        subject: obj.subject,
        class: obj.class
    }, function(err, result) {
        if (err) {
            callback(err)
        } else {
            callback(null, result);
        }
    })
};

resultController.prototype.getResultByClassAndSubject = function(obj, callback) {
    Result.findPaginated({
        subject: obj.subject,
        class: obj.class
    }, {}, {
        sort: {
            date: -1
        }
    }, function(err, result) {
        if (err)
            callback(err)
        else {
            callback(null, result)
        }
    }, obj.docsPerPage, obj.pageNumber)
}



resultController.prototype.getCountForClassSubjectAndDate = function(obj, callback) {
  let d = new Date(obj.date)
  var month = d.getMonth() + 1; //months from 1-12
  var day = d.getUTCDate();
  var year = d.getUTCFullYear();
    Result.count({
        subject: obj.subject,
        class: obj.class,
        date: {"$gte": new Date(year, month, day), "$lt": new Date(year, month, day+1)}
    }, function(err, result) {
        if (err) {
            callback(err)
        } else {
            callback(null, result);
        }
    })
};

resultController.prototype.getResultByClassSubjectAndDate = function(obj, callback) {
  let d = new Date(obj.date)
  var month = d.getMonth() + 1; //months from 1-12
  var day = d.getUTCDate();
  var year = d.getUTCFullYear();

    Result.findPaginated({
        subject: obj.subject,
        class: obj.class,
        date: {"$gte": new Date(year, month, day), "$lt": new Date(year, month, day+1)},
        name:undefined
    }, {}, {
        sort: {
            date: -1
        }
    }, function(err, result) {
        if (err)
            callback(err)
        else {
            callback(null, result)
        }
    }, obj.docsPerPage, obj.pageNumber)
}


resultController.prototype.getCount = function(obj, callback) {
    Result.count({}, function(err, result) {
        if (err) {
            callback(err)
        } else {
            callback(null, result);
        }
    })
};

resultController.prototype.getNeeded = function(obj, callback) {
    Result.findPaginated({}, {}, {
        sort: {
            date: -1
        }
    }, function(err, result) {
        if (err)
            callback(err)
        else {
            callback(null, result)
        }
    }, obj.docsPerPage, obj.pageNumber)
}




resultController.prototype.parseQuery = function(obj, callback) {
    if (obj.class) {
        if (obj.subject) {
                var obj;
                resultController.prototype.getResultByClassAndSubject(obj, function(err, result1) {
                    if (err) {
                        callback(err)
                    } else {
                        resultController.prototype.getCountForClassAndSubject(obj, function(err, result2) {
                            if (err) {
                                callback(err)
                            } else {
                                obj = ({
                                    documents: result1.documents,
                                    count: result2
                                })
                                callback(null, obj)
                            }
                        })

                    }
                });
            //  else {
            //     var obj;
            //     resultController.prototype.getResultByClassSubjectAndDate(obj, function(err, result1) {
            //         if (err) {
            //             callback(err)
            //         } else {
            //             resultController.prototype.getCountForClassSubjectAndDate(obj, function(err, result2) {
            //                 if (err) {
            //                     callback(err)
            //                 } else {
            //                     obj = ({
            //                         documents: result1.documents,
            //                         count: result2
            //                     })
            //                     callback(null, obj)
            //                 }
            //             })
            //
            //         }
            //     });
            // }
        } else {
            var obj;
            resultController.prototype.getResultByClass(obj, function(err, result1) {
                if (err) {
                    callback(err)
                } else {
                    resultController.prototype.getCountForClass(obj, function(err, result2) {
                        if (err) {
                            callback(err)
                        } else {
                            obj = ({
                                documents: result1.documents,
                                count: result2
                            })
                            callback(null, obj)
                        }
                    })

                }
            });
        }
    } else if (obj.subject) {
        var obj;
        resultController.prototype.getResultBySubject(obj, function(err, result1) {
            if (err) {
                callback(err)
            } else {
                resultController.prototype.getCountForTerm(obj, function(err, result2) {
                    if (err) {
                        callback(err)
                    } else {
                        obj = ({
                            documents: result1.documents,
                            count: result2
                        })
                        callback(null, obj)
                    }
                })

            }
        });
    }


    // testing


}


module.exports = resultController;
