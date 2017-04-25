/*
 * @Author: bishal
 * @Date:   2016-12-28 21:48:38
 * @Last Modified by:   rebatov
 * @Last Modified time: 2017-02-05 00:24:23
 */

'use strict';
var express = require('express');
var utf8 = require('../../utf8.js')
var router = express.Router();
require('../models/question.model');
var Controller = require('../controllers/question.controller');
var qstnController = new Controller();
var Islogged = require('../utilities/loginCheck');
var islogged = new Islogged();
var multer = require('multer')
// let LineByLineReader = require('line-by-line');
let subjects = require('../utilities/subject.js')
const preeti = require('../utilities/preeti')
router.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



var storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
        // cb(null, '/home/eastpole/eastpole/public/uploads/');
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
        // cb(null, datetimestamp)
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');


var qUpload = multer({
    storage: storage
}).any()

router.get('/get', function(req, res) {
    islogged.islogged(req, function(err, logged) {
        console.log(logged)
        if (logged.role != "admin") {
            res.json({
                "status": 500,
                "message": "Not logged in"
            })
        } else {
            qstnController.getQstns(function(err, questions) {
                if (err)
                    res.json({
                        "status": 500,
                        "message": "Internal server error",
                        "data": null
                    });
                else
                    res.json({
                        "status": 200,
                        "message": "Success",
                        "data": questions
                    });
            })
        }
    })
})
router.post('/delete', function(req, res) {
    islogged.islogged(req, function(err, logged) {
        if (logged.role != "admin") {
            res.json({
                "status": 500,
                "message": "Not logged in"
            })
        } else {
            console.log(req.body)
            qstnController.delete(req.body, function(err, question) {
                if (err)
                    res.json({
                        "status": 500,
                        "message": "Internal server error",
                        "data": null
                    });
                else
                    res.json({
                        "status": 200,
                        "message": "Success",
                        "data": question
                    });
            })
        }
    })
})
router.post('/create', function(req, res) {
    qUpload(req, res, (err) => {
        if (err) {
            console.log(err)
        } else {
          console.log(req.body,req.files)
            if (req.files) {
                // console.log(req.body, req.files)
                let opt = [];
                let obj = req.body;
                req.files.forEach((k, i) => {
                    // console.log(k)
                    if (k.fieldname != 'qstn') {
                        let tmp = {
                            id: i,
                            path: 'uploads/'+k.filename,
                            value: null
                        };
                        opt.push(tmp)
                    } else {
                        obj.question = {
                            "value": req.body.question,
                            "path": 'uploads/'+k.filename
                        }
                    }
                });
                // console.log(opt);
                let index = req.files.findIndex((obj => obj.fieldname === req.body.answer))
                console.log(index)
                if (index == -1) {
                    return res.status(500).send({
                        status: "error",
                        error: "No option within specified options"
                    })
                }
                obj.answer = index;
                // console.log(index)
                obj['options'] = opt;
                // console.log(typeof(obj.question))
                if (typeof(obj.question) !== "object") {
                    obj.question = {
                        "value": req.body.question,
                        "path": null
                    }
                }
                console.log('multipart',obj);
                create(obj);
            } else {
                let opt = [];
                let obj = req.body;
                req.body.options.forEach((k, i) => {
                    let tmp = {
                        id: i,
                        path: null,
                        value: k
                    };
                    opt.push(tmp)
                });
                let index = opt.findIndex((obj => obj.value === req.body.answer))
                if (index == -1) {
                    return res.status(500).send({
                        status: "error",
                        error: "No option within specified options"
                    })
                }else{
                  req.body['answer']=parseInt(index)
                }
                obj = req.body;
                obj['options'] = opt
                obj.question = {
                    "value": req.body.question,
                    "path": null
                }
                create(obj);
            }

            function create(body) {
                qstnController.create(body, function(err, question) {
                    if (err)
                        res.json({
                            "status": 500,
                            "message": "Internal server error",
                            "data": null
                        });
                    else
                        res.json({
                            "status": 200,
                            "message": "Success",
                            "data": question
                        });
                })
            }
        }

    })
});

function create(body) {
    qstnController.create(body, function(err, question) {
        if (err)
            res.json({
                "status": 500,
                "message": "Internal server error",
                "data": null
            });
        else
            res.json({
                "status": 200,
                "message": "Success",
                "data": question
            });
    })
}

router.post('/publish', function(req, res) {
    islogged.islogged(req, function(err, logged) {
        if (logged.role != "admin") {
            res.json({
                "status": 500,
                "message": "Not logged in"
            })
        } else {
            qstnController.publish(req.body, function(err, question) {
                if (err)
                    res.json({
                        "status": 500,
                        "message": "Internal server error",
                        "data": null
                    });
                else
                    res.json({
                        "status": 200,
                        "message": "Success",
                        "data": question
                    });
            })
        }
    })
});


router.post('/unpublish', function(req, res) {
    islogged.islogged(req, function(err, logged) {
        if (logged.role != "admin") {
            res.json({
                "status": 500,
                "message": "Not logged in"
            })
        } else {
            qstnController.unpublish(req.body, function(err, question) {
                if (err)
                    res.json({
                        "status": 500,
                        "message": "Internal server error",
                        "data": null
                    });
                else
                    res.json({
                        "status": 200,
                        "message": "Success",
                        "data": question
                    });
            })
        }
    })
});

router.get('/active', function(req, res) {
    islogged.islogged(req, function(err, logged) {
        if (logged.role != "admin") {
            res.json({
                "status": 500,
                "message": "Not logged in"
            })
        } else {
            qstnController.getActive(function(err, questions) {
                if (err)
                    res.json({
                        "status": 500,
                        "message": "Internal server error",
                        "data": null
                    });
                else
                    res.json({
                        "status": 200,
                        "message": "Success",
                        "data": questions
                    });
            })
        }
    })
});


router.post('/makeActive', function(req, res) {
    islogged.islogged(req, function(err, logged) {
        if (logged.role != "admin") {
            res.json({
                "status": 500,
                "message": "Not logged in"
            })
        } else {
            qstnController.makeActive(req.body, function(err, questions) {
                if (err)
                    res.json({
                        "status": 500,
                        "message": "Internal server error",
                        "data": null
                    });
                else
                    res.json({
                        "status": 200,
                        "message": "Success",
                        "data": questions
                    });
            })
        }
    })
});


router.post('/updateOne', function(req, res) {
    islogged.islogged(req, function(err, logged) {
        if (logged.role != "admin") {
            res.json({
                "status": 500,
                "message": "Not logged in"
            })
        } else {
            qstnController.updateOne(req.body, function(err, questions) {
                if (err)
                    res.json({
                        "status": 500,
                        "message": "Internal server error",
                        "data": null
                    });
                else
                    res.json({
                        "status": 200,
                        "message": "Success",
                        "data": questions
                    });
            })
        }
    })
});


var ob;
router.post('/getClass/', function(req, res) {

    console.log(req.body);
    /*
    author:bishal
    Getting the needed page of language
     */
    qstnController.getClass(req.body, function(err, result1) {
        if (err) {
            res.status(500).send(err);
        } else {
            /*
            author:bishal
            Getting the count of total languages in DB
             */
            qstnController.getClassCount(req.body, function(err, result2) {
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


var o;
router.post('/getSubject/', function(req, res) {

    console.log(req.body);
    /*
    author:bishal
    Getting the needed page of language
     */
    qstnController.getSubject(req.body, function(err, result1) {
        if (err) {
            res.status(500).send(err);
        } else {
            /*
            author:bishal
            Getting the count of total languages in DB
             */
            qstnController.getSubjectCount(req.body, function(err, result2) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    o = ({
                        documents: result1.documents,
                        count: result2
                    })
                    res.status(200).send(o);
                }
            })

        }

    });
});

router.post('/exam', function(req, res) {
    islogged.islogged(req, function(err, logged) {
        if (logged.role != "student") {
            res.json({
                "status": 500,
                "message": "Not student"
            })
        } else {
            qstnController.exam(req.body, function(err, questions) {
                if (err)
                    res.json({
                        "status": 500,
                        "message": "Internal server error",
                        "data": null
                    });
                else
                    res.json({
                        "status": 200,
                        "message": "Success",
                        "data": questions
                    });
            })
        }
    })
});


router.post('/result', function(req, res) {
    islogged.islogged(req, function(err, logged) {
        if (logged.role != "student") {
            res.json({
                "status": 500,
                "message": "Not student"
            })
        } else {
            qstnController.result(req.body, function(err, questions) {
                if (err)
                    res.json({
                        "status": 500,
                        "message": "Internal server error",
                        "data": null
                    });
                else
                    res.json({
                        "status": 200,
                        "message": "Success",
                        "data": questions
                    });
            })
        }
    })
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
    qstnController.getNeeded(req.body, function(err, result1) {
        if (err) {
            res.status(500).send(err);
        } else {
            /*
            author:bishal
            Getting the count of total languages in DB
             */
            qstnController.getCount(req.body, function(err, result2) {
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


router.get('/count', function(req, res) {
    qstnController.getCount(req.body, function(err, questions) {
        if (err)
            res.json({
                "status": 500,
                "message": "Internal server error",
                "data": null
            });
        else
            res.json({
                "status": 200,
                "message": "Success",
                "data": questions
            });
    })
});


router.get('/subjects', function(req, res) {
    res.json({
        "status": 200,
        "message": "SUCCESS",
        "data": subjects
    })
})


router.post('/multi', function(req, res) {
    qstnController.publishClassAndSubject(req.body, function(err, rslt) {
        if (err) {
            res.json({
                "status": 500,
                "message": err
            })
        } else {
            res.json({
                "status": 200,
                "message": "SUCCESS",
                "data": rslt
            })
        }
    })
})


router.post('/upload', function(req, res) {
    upload(req, res, function(err, rslt) {
        if (err) {
            res.json({
                "status": 500,
                "message": err
            })
        } else {
            console.log(req.body, req.file)
            // let lr = new LineByLineReader(req.file.path);
            const csvFilePath = '<path to csv file>'
            const csv = require('csvtojson')
            let arr = [];
            let cntr = 0;
            csv()
                .fromFile(req.file.path)
                .on('json', (jsonObj) => {
                    jsonObj.options = jsonObj.options.split('@')
                    // console.log(jsonObj)
                    if (req.body.subject !== 'nepali') {
                        console.log(req.body.subject, 'hola')
                        jsonObj.question = encodeURI(jsonObj.question);
                        jsonObj.answer = encodeURI(jsonObj.answer)
                        jsonObj.options.forEach(function(key, index) {
                            jsonObj.options[index] = encodeURI(key)
                        })
                        // console.log(jsonObj)
                        arr.push(jsonObj);
                    } else {
                        console.log(req.body.subject)
                        console.log(jsonObj.answer)
                        if (jsonObj.answer.length > 1) {
                            cntr++;
                            // console.log(jsonObj.question)
                            console.log(preeti.convert_to_unicode(jsonObj.question))
                            jsonObj.question = encodeURI(preeti.convert_to_unicode(jsonObj.question));
                            jsonObj.answer = encodeURI(preeti.convert_to_unicode(jsonObj.answer));
                            jsonObj.options.forEach(function(key, index) {
                                jsonObj.options[index] = encodeURI(preeti.convert_to_unicode(key))
                            })
                            arr.push(jsonObj);
                        }
                    }
                    // combine csv header row and csv line to a json object
                    // jsonObj.a ==> 1 or 4
                })
                .on('done', (error) => {
                    // console.log('end', arr)
                    arr = arr.map((element) => {
                        element.subject = req.body.subject;
                        element.class = req.body.class;
                        return element;
                    });
                    console.log(arr.length, cntr)
                    // console.log(arr)
                    qstnController.bulk(arr, function(err, rslt) {
                        if (err) {
                            res.json({
                                "status": 500,
                                "message": "Question creation error"
                            })
                        } else {

                            res.json({
                                "status": 200,
                                "message": "success",
                                "file": req.file,
                                "data": rslt
                            })
                        }
                    })
                })
            // lr.on('error', function(err) {
            //     // 'err' contains error object
            // });
            //
            // lr.on('line', function(line) {
            //     // 'line' contains the current line without the trailing newline character.
            //     console.log(line)
            //
            // });
            //
            // lr.on('end', function() {
            //     // All lines are read, file is closed now.
            //     res.json({
            //         "status": 200,
            //         "message": req.body,
            //         "file": req.file
            //     })
            // });
        }
    })
})

module.exports = router;
