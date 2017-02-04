/*
* @Author: bishal
* @Date:   2016-12-28 21:19:04
* @Last Modified by:   rebatov
* @Last Modified time: 2017-02-04 16:01:23
*/

'use strict';
var mongoose =require('mongoose');
var Schema= mongoose.Schema;
var mongoosePages = require('mongoose-pages');
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
mongoosePages.skip(userSchema);
module.exports=mongoose.model('User',userSchema);