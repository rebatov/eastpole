/*
* @Author: bishal
* @Date:   2016-12-28 21:19:04
* @Last Modified by:   bishal
* @Last Modified time: 2016-12-29 12:27:39
*/

'use strict';
var mongoose =require('mongoose');
var Schema= mongoose.Schema;

var userSchema=new Schema({
	id:{type:Number},
	name:{type:String},
	username:{type: String, required: true, index: {unique: true}},
	password:{type: String, required: true},
	role:{type:String},
	class:{type:String},
	section:{type:String},
	address:{type:String}
});
module.exports=mongoose.model('User',userSchema);