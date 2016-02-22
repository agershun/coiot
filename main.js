var emulator = require('./emulator');
var ws = require('./server');
var coiot = require('./coiot');

// Coiot Server
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api', function (req, res) {
	console.log(req.body);
	coiot.get(req.body.sensorId,function(err,data){
		console.log('api get ',req.body.sensorId,data);
		res.send({sensorId:req.body.sensorId, data:data});
	});
});

app.use(express.static('public'));

app.listen(4000, function () {
  console.log('Coiot Server listening on port 4000.');
});

// Test

/*

setTimeout(function(){
	var json = {sensorId:2, commandId:'toggle'};
	ws.send(JSON.stringify(json));
},2000);

setTimeout(function(){
	var json = {sensorId:2, commandId:'get'};
	ws.send(JSON.stringify(json));
},2500);

setTimeout(function(){
	var json = {sensorId:2, commandId:'off'};
	ws.send(JSON.stringify(json));
},3000);

setTimeout(function(){
	var json = {sensorId:2, commandId:'on'};
	ws.send(JSON.stringify(json));
},3500);

setTimeout(function(){
	console.log('FINISH', coiot.signalsLog, coiot.commandsLog);
},4000);

*/