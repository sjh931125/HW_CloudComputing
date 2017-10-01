var express=require('express');
var router=express.Router();
var User=require('../models/User');
var Post=require('../models/Post');

router.get('/',function(req,res){
	var data={session:null};
	if(req.session.name) {
		data.session={
			name:req.session.name
		};
	};
	res.render('index',data);
});

router.get('/login',function(req,res){
	var data={session:null};
	if(req.session.name) res.redirect('/');
	res.render('login',data);
})

router.post('/login',function(req,res){
	var _name=req.body.name;

	User.findOne({name:_name},function(err,user){
		if(!user){
			var _User=new User();
			_User.name=_name;
			_User.save(function(err){
			});
		}
		req.session.name=_name;
		res.redirect('/');
	});

});

router.get('/logout',function(req,res){
	req.session.destroy();
	res.redirect('/');
});

router.get('/dotori',function(req,res){
	var data={session:null,posts:null};
	if(!req.session.name) res.redirect('/login');
	else{
		data.session={name:req.session.name};
		Post.aggregate([{$match:{category:"dotori"}},{$sort:{score:-1}}],function(err,posts){
			data.posts=posts;
			res.render('dotori',data);
		});
	}
});
router.get('/dotori_game',function(req,res){
	var data={session:null};
	if(!req.session.name) res.redirect('/login');
	else{
		data.session={name:req.session.name};
		res.render('dotori_game',data);
	}
});
router.post('/dotori_game',function(req,res){
	var _comment=req.body.comment;
	var _score=req.body.score;
	var _name=req.session.name;

	if(_comment=="") _comment="system : "+_name+"님의 점수는 "+_score+"점입니다";

	var _Post=new Post();
	_Post.comment=_comment;
	_Post.score=_score;
	_Post.category="dotori";
	_Post.name=_name;
	_Post.save(function(err){
		res.redirect('/dotori');
	});
});
router.get('/rain',function(req,res){
	var data={session:null,posts:null};
	if(!req.session.name) res.redirect('/login');
	else{
		data.session={name:req.session.name};
		res.render('rain',data);
	}
});
router.get('/test',function(req,res){
	Post.find({},function(err,posts){
		res.send(posts);
	});
});
router.get('/e',function(req,res){
	Post.remove({},function(err){
		res.redirect('/');
	});
})

module.exports=router;