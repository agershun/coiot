var Connection = require('../src/connection');
var assert = require('assert');

var demo = new Connection();
demo.id = 'demo';

demo.devices = [
	{id:0,tag:'temperature'},
	{id:1,tag:'led'},
	{id:2,tag:'led'},
	{id:3,tag:'window'},
];

// Initialization

demo.init = function(coiotServer,cb) {
//	console.log('Demo commection activated...');
	coiotServer.register(this.id,this.devices,undefined,function(err){
//		console.log(19,'after register init',cb);
		assert(!err);
		if(cb) cb(undefined);
	});
};

// Should return list of all sensors in the network
// demo.list = function(selector,cb) {
// 	if(cb) cb(undefined);
// };

// demo.info = function(selector,cb) {
// 	// if(!selector) {
// 	// 	if(cb) cb(undefined,dlist);		
// 	// } else {
// 	// 	if(cb) cb(undefined,this.devices[selector]);
// 	// }
// };

module.exports = demo;
