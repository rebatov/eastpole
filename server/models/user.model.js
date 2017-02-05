/*
* @Author: bishal
* @Date:   2016-12-28 21:19:04
* @Last Modified by:   rebatov
* @Last Modified time: 2017-02-05 11:21:43
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
	roll:{type:Number},
	class:{type:Number},
	section:{type:String},
	address:{type:String}
});

userSchema.index({roll: 1, class: 1}, {unique: true});
mongoosePages.skip(userSchema);
module.exports=mongoose.model('User',userSchema);