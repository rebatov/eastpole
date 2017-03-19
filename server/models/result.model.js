/*
* @Author: bishal
* @Date:   2016-12-29 13:17:55
* @Last Modified by:   rebatov
* @Last Modified time: 2017-02-04 20:52:01
*/

'use strict';
var mongoose =require('mongoose');
var Schema= mongoose.Schema;
var mongoosePages = require('mongoose-pages');
var resultSchema=new Schema({
	username:{type: String},
	subject:{type:String},
	term:{type:String},
	year:{type:Number},
	score:{type:Number},
	date:{type:Date,default:Date.now},
	class:{type:Number}
});
mongoosePages.skip(resultSchema);
module.exports=mongoose.model('Result',resultSchema);