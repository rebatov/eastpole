/*
* @Author: bishal
* @Date:   2016-12-28 21:46:47
* @Last Modified by:   bishal
* @Last Modified time: 2016-12-29 11:35:09
*/

'use strict';
var mongoose =require('mongoose');
var Schema =  mongoose.Schema;

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

module.exports = mongoose.model('Question',questionSchema);