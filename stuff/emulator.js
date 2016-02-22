var WebSocket = require('ws');
var WebSocketServer = WebSocket.Server;
var wss = new WebSocketServer({ port: 3000 });

var sensors = {
	12345: {temperature:23.4},
	2: {state:true}
};

var ws;
// Emulatro Server
wss.on('connection', function (ws) {
    ws.on('message', function incoming(message) {
    	var json = JSON.parse(message);
    	if(json.commandId === 'toggle') {
    		sensors[2].state = !sensors[2].state;
    		var json2 = {sensorId:json.sensorId,data:sensors[json.sensorId]};
    		ws.send(JSON.stringify(json2));
    	} else if(json.commandId === 'get') {
    		var json2 = {sensorId:json.sensorId,data:sensors[json.sensorId]};
    		ws.send(JSON.stringify(json2));
    	} else if(json.commandId === 'on') {
    		sensors[2].state = true;
    		var json2 = {sensorId:json.sensorId,data:sensors[json.sensorId]};
    		ws.send(JSON.stringify(json2));
    	} else if(json.commandId === 'off') {
    		sensors[2].state = false;
    		var json2 = {sensorId:json.sensorId,data:sensors[json.sensorId]};
    		ws.send(JSON.stringify(json2));
    	}
    });

	setInterval(function(){
        sensors[12345].temperature+=Math.random()-0.5;
		ws.send(JSON.stringify({sensorId:12345, data: sensors[12345]}));
	},1000);


	// setTimeout(function(){
	// 	ws.send({sensorid:12345, data: {temperature:23.34}});
	// },2000);

});

console.log('Sensor emulator started...');

