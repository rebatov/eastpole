var token = require('../utilities/tokenHandling');
var tokenAuth = new token();

var logcheck = function(){};


logcheck.prototype.islogged=function(req,callback){
	tokenAuth.tokenAuthentication(req,function(err,data){
	if(err)	return callback(null,false);
	else if(data==false) return callback(null,false);
	else {
		console.log(data)
		callback(null,data);}
});
}
module.exports = logcheck;
