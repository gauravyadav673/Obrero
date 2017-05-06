var mongoose=require('mongoose');
var autoIncrement=require('mongoose-auto-increment');
var express=require('express');
var app=express();

app.set('view engine','ejs');
app.set('views',__dirname+'../views');

mongoose.connect('mongodb://angelhacks:angelhacks@ds133291.mlab.com:33291/angelhacks');

var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));

db.once('open',function(){
console.log("Connected to mongoose");
});

autoIncrement.initialize(db);

var userSchema=mongoose.Schema({
	username:{
		type:String,
		required:true
	},
	locality:{
		type:String,
		required:true
	},
	phoneno:{
		type:String,
		required:true
	},
	address:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	lat:{
			type:String,
		required:true
	},
	long:{
			type:String,
		required:true
	}

});

userSchema.plugin(autoIncrement.plugin,{
	model:'User',
	field:'uniqueid',
	unique:true,
	required:true,
	startAt:1,
	incrementBy:1
});


var User=mongoose.model('User',userSchema);

exports.addUser=function(req,res){
	
	var user=new User({
	username:req.query.username,
	locality:req.query.locality,
	phoneno:req.query.phoneno,
	address:req.query.address,
	password:req.query.password,
	lat:req.query.lat,
	long:req.query.long
	});

	user.save(function(err,info){
		if(err) throw err;
		console.log('the user is saved successfully!! '+info);
		res.send(info);
	});
};

/*exports.checkaadhar=function(req,res){
	var aadhar=req.query.aadhar;
	User.findOne({aadharno:aadhar},function(err,info){
	if(info)
		res.send(info);
	else
		res.send("Not exist");
		

	});
}; */




var workerSchema=mongoose.Schema({
	workername:{
		type:String,
		required:true
	},
	phoneno:{
		type:String,
		required:true
	},
	aadharcardno:{
		type:String,
		required:true
	},
	address:{
		type:String,
		required:true
	},
	age:{
		type:String,
		required:true
	},
	locality:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	occupation:{
		type:String,
		required:true
	},
	lat:{
			type:String,
		required:true
	},
	long:{
			type:String,
		required:true
	}

});


workerSchema.plugin(autoIncrement.plugin,{
	model:'Worker',
	field:'workerid',
	unique:true,
	required:true,
	startAt:1,
	incrementBy:1

});

var Worker=mongoose.model('Worker',workerSchema);


exports.addWorker=function(req,res){
	var worker=new Worker({
	workername:req.query.workername,
	aadharcardno:req.query.aadharcardno,
	age:req.query.age,
	locality:req.query.locality,
	phoneno:req.query.phoneno,
	password:req.query.password,
	address:req.query.address,
	occupation:req.query.occupation,
	lat:req.query.lat,
	long:req.query.long
	});

	worker.save(function(err,info){
		if(err) throw err;
		console.log('the worker is saved successfully!! '+info);
		res.send(info);
	});

};

exports.loginWorker=function(req,res){
	phoneno=req.query.phoneno;
	password=req.query.password;
	Worker.findOne({phoneno:phoneno},function(err,worker){
		if(worker)
		{
			if(worker.password==req.query.password)
				{
					console.log('The worker exists');
				 	res.send(worker);
				}
				else
				{
					res.redirect('/');			
				}
		}
		else
		{
			res.redirect('/');
		}
	});


};

exports.loginUser=function(req,res){
	phoneno=req.query.phoneno;
	password=req.query.password;
	User.findOne({phoneno:phoneno},function(err,user){
		if(user)
		{
			if(user.password==req.query.password)
				{
					console.log('The User exists');
				 	res.send(user);
				}
				else
				{
					res.redirect('/');			
				}
		}
		else
		{
			res.redirect('/');
		}
	});


};


exports.searchworker=function(req,res){
	occupation=req.query.occupation;
	locality=req.query.locality;
	Worker.findOne({locality:locality},function(err,user){
		if(user)
		{
			if(user.password==req.query.password)
				{
					console.log('The User exists');
				 	res.send(user);
				}
				else
				{
					res.redirect('/');			
				}
		}
		else
		{
			res.redirect('/');
		}
	});


};



 



exports.userlogout=function(req,res){
	req.session.uniqueid=null;
	res.render('useridenter');

};

exports.doctorlogout=function(req,res){
	req.session.doctid=null;
	req.session.hospid=null;
	res.redirect('/');
};



//module.exports=User;




