var bcrypt = require('bcrypt-nodejs');
var pass=function(){};


pass.prototype.cryptPassword = function(password,callback) {
	console.log(password);
   	
	bcrypt.hash(password,null,null, function(err,hash){
        if(err)return(err);
       
        
       return callback(null,hash);
	});
  
};

pass.prototype.comparePassword = function(password, userPassword) {
return bcrypt.compareSync(password, userPassword);
};

module.exports=pass;