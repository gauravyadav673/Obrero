var express=require('express');
var app=express();
var ejs=require('ejs');
var db=require('../db');

app.set('view engine','ejs');
app.set('views',__dirname+'/../views');


app.get('/*',function(req,res,next){
	res.send("<h2>404 | Page not found!!</h2>");
});

module.exports=app;