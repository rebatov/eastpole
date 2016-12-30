/*
* @Author: bishal
* @Date:   2016-12-29 13:17:55
* @Last Modified by:   bishal
* @Last Modified time: 2016-12-29 21:00:40
*/

'use strict';
var mongoose =require('mongoose');
var Schema= mongoose.Schema;

var resultSchema=new Schema({
	username:{type: String},
	subject:{type:String},
	term:{type:String},
	year:{type:Number},
	score:{type:Number},
	date:{type:Date},
	class:{type:Number}
});
module.exports=mongoose.model('Result',resultSchema);