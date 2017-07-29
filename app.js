var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var schoolRouter = require('./routes/schoolRouter');

app.use(bodyParser.json());
app.listen(9000,function(){
	console.log("Listening");
});
app.use('/',schoolRouter);