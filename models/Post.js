var mongoose=require('mongoose');

var postSchema=mongoose.Schema({
	comment:{type:String,required:true},
	score:{type:Number,required:true},
	category:{type:String,required:true},
	name:{type:String,required:true},
});

// model & export
var Post = mongoose.model("bnbn_post",postSchema);
module.exports=Post;