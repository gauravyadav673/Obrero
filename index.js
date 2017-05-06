var express=require('express');
var bodyParser=require('body-parser');
var ejs=require('ejs');
var cookieParser=require('cookie-parser');

var app=express();


app.use(cookieParser());

var routes=require('./routes');
var db=require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.set('port',process.env.PORT || 5000);

app.use(express.static(__dirname+'/public'));

app.get('/',routes);

app.get('/api/adduser',db.addUser);
app.get('/api/addworker',db.addWorker);
app.get('/api/loginuser',db.loginUser);
app.get('/api/loginworker',db.loginWorker);
app.get('/api/searchworker',db.searchworker);


//app.post('/loginuser',db.loginUser);

app.get('/*',routes);

app.listen(app.get('port'),function(){
console.log("Server running on port no:-"+app.get('port'));
});