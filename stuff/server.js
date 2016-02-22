var WebSocket = require('ws');
var coiot = require('./coiot');

// Server
var ws = new WebSocket('ws://localhost:3000');

ws.on('open', function open() {
	console.log('Connected to sensor emulator...');
});

// Receive new data
ws.on('message', function(data, flags) {
	var json = JSON.parse(data);
	coiot.signal(json.sensorId, json.data);
});

module.exports = ws;