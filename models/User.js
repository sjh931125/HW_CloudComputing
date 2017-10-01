var mongoose=require('mongoose');

var userSchema=mongoose.Schema({
	name:{type:String, required:true, unique:true}
});

// model & export
var User = mongoose.model("bnbn_user",userSchema);
module.exports=User;