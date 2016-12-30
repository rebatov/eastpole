/*
* @Author: bishal
* @Date:   2016-12-28 20:47:22
* @Last Modified by:   bishal
* @Last Modified time: 2016-12-29 20:34:21
*/

'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var config = require('./config/config');

mongoose.connect(config.database,function(err){
	if(err){
		console.log(err);
	}
	else{
		console.log("Database connected...")
	}
})

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/'));

const user = require('./server/routes/user.route')
const question = require('./server/routes/question.route')
const login = require('./server/routes/login.route')
const result = require('./server/routes/result.route')

app.use('/user',user)
app.use('/question',question)
app.use('/login',login)
app.use('/result',result)

app.use(morgan('dev'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('*', function(req,res){
	res.sendFile(__dirname + '/public/index.html');
});

app.listen(config.port, function(err){
	if(err)
		console.log(err);
	else
		console.log("Through the wormhole: " + config.port);
});