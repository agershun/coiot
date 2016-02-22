var ws = require('./server');

var Coiot = function(){
	return this;
};

var coiot = new Coiot;

Coiot.prototype.sensors = {};
Coiot.prototype.signalsLog = [];
Coiot.prototype.commandsLog = [];

Coiot.prototype.signal = function(sensorId, data){
	coiot.sensors[sensorId] = data;
	var json = {sensorId:sensorId,data:data,time:Date.now()};
	coiot.signalsLog.push(json);
//	console.log(17,json);
	process.stdout.write('.');
};

Coiot.prototype.command = function(userId, selector, commandId, data){
	if(typeof selector === number) {
		// Send message
		var json = {userId:userId, commandId: commandId, time:Date.now(),data:data};
		coiot.commandsLog.push(json);
		ws.send(JSON.stringify());
		console.log(24,json);		
	}
};

Coiot.prototype.get = function(sensorId,cb){
	cb(undefined,coiot.sensors[sensorId]);
};


module.exports = coiot;