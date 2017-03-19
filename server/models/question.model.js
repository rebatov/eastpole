/*
* @Author: bishal
* @Date:   2016-12-28 21:46:47
* @Last Modified by:   rebatov
* @Last Modified time: 2017-02-04 16:00:19
*/

'use strict';
var mongoose =require('mongoose');
var Schema =  mongoose.Schema;
var mongoosePages = require('mongoose-pages');
var questionSchema = new Schema({
		question:{type:String},
		options:{type:Array},
		answer:{type:String},
		class:{type:String},
		subject:{type:String},
		status:{type:String},
		createdDate:{type:Date,default:Date.now},
		updatedDate:{type:Date}
});
mongoosePages.skip(questionSchema);
module.exports = mongoose.model('Question',questionSchema);