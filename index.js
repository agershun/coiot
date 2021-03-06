﻿var assert = require('assert');
var utils=require('./src/utils');

// Nothing

// Base class
var Coiot = function() {
	this.devices = {};
	this.connections = {};
	var guest = {id:'guest'};
	this.tables = {
		user:[guest]
	};
	this.ixtables = {
		user:{guest:guest}
	};
	return this;
};

// Start server
Coiot.prototype.start = function(port,public,params,cb) {
	if(!port) port = 4000;

	// Start WebSocket Server
	var WebSocket = require('ws');
	var WebSocketServer = WebSocket.Server;
	var wss = new WebSocketServer({ port: port });

	wss.on('connection', function (ws) {
		console.log('connected');
	    ws.on('message', function (message) {
	    	console.log(message);
	    	ws.send('{id;123}');
	    });
	});

	// Start WebServer
	if(public) {
		var express = require('express');
		var app = express();
		app.use(express.static(public));

		app.listen(8080, function () {
			if(cb) cb();
		});
	} else {
		if(cb) cb();
	}
};

// Shutdonw server
Coiot.prototype.shutdown = function(cb) {
	if(cb) cb();
};

// Connect to network
Coiot.prototype.connect = function(script,connid,params,cb) {
//	console.log(26,arguments);
	var conn = this.connections[connid] = require('./connect/'+script);
	if(conn.init) {
//		console.log(28,'before init',cb);
		conn.init(this,cb);
	} else {
		if(cb) cb();
	}
};

// Login to the server
Coiot.prototype.login = function(username, password, cb) {
	this.token = 1234;
	if(cb) cb(undefined,this.token);
};

// Logout from the server
Coiot.prototype.logout = function(cb) {
	delete this.token;
	if(cb) cb();
};


// Register new device
Coiot.prototype.register = function(connid, id, params, cb) {
	var self = this;
	if(typeof id ==='object' && id instanceof Array) {
		id.forEach(function(d){
			var obj = {connection:connid,id:d.id};
			utils.extend(obj,d);
			utils.extend(obj,params);
			self.devices[d.id] = obj;
		});
	} else if(typeof id ==='object') {
		self.devices[id.id] = id;
	} else {
		var obj = {connection:connid,id:id};
		utils.extend(obj,params);
		self.devices[id] = obj;
	};
//	console.log(68,'register',self.devices);
	if(cb) cb(undefined);
};

// Logout from the server
Coiot.prototype.list = function(selector,cb) {
	var self = this;
	if(typeof selector === 'undefined') {
		var list = Object.keys(this.devices);
	} else {
		var list = [];
		for(var id in this.devices) {
			if(match(self.devices[id],selector)) list.push(id);
		}
	}
	if(cb) cb(undefined,list);
};

function match(d,selector) {
	if(typeof selector === 'undefined' || selector == '') return true;
	selector = (''+selector).trim();
	if(selector.match(/[0-9]+/i) && (''+d.id).toUpperCase() == (''+selector).toUpperCase()) return true;
	if(selector.match(/\#[a-z_\-0-9]+/i) && (''+d.id).toUpperCase() == (''+selector.substr(1)).toUpperCase()) return true;
	if(selector.match(/[a-z_][a-z_\-0-9]*/i) && ((''+d.tag)||'').toUpperCase() == (''+selector).toUpperCase()) return true;
	if(selector.match(/\.[a-z_][a-z_\-0-9]*/i) && (d.class||{})[selector.toLowerCase().substr(1)]) return true;
	var ss = selector.split('[');
	if(ss.length == 2) {
		if(match(d,ss[0])) {
			var keys = Object.keys(d);
			var args = keys.join(',');
//			console.log(args,ss[1].substr(0,ss[1].length-1));
			var fn = new Function(args,'return '+ss[1].substr(0,ss[1].length-1));
			// console.log(fn.call(d,d));
			try {
				return fn.apply(d,keys.map(function(key){return d[key]}));
			} catch(err) {
				return false;
			}
		}
	}
}

function idmatch(d,selector) {
	if(typeof selector === 'undefined' || selector == '') return true;
	selector = (''+selector).trim();
	if(selector.match(/[a-z_\-0-9]+/i) && (''+d.id).toUpperCase() == (''+selector).toUpperCase()) return true;
	// if(selector.match(/\#[a-z_\-0-9]*/i) && (''+d.id).toUpperCase() == (''+selector.substr(1)).toUpperCase()) return true;
	// if(selector.match(/[a-z_][a-z_\-0-9]*/i) && ((''+d.tag)||'').toUpperCase() == (''+selector).toUpperCase()) return true;
	// if(selector.match(/\.[a-z_][a-z_\-0-9]*/i) && (d.class||{})[selector.toLowerCase().substr(1)]) return true;
	var ss = selector.split('[');
	if(ss.length == 2) {
//		console.log(120,ss,d);
		if(idmatch(d,ss[0])) {
			var keys = Object.keys(d);
//			console.log(123,keys,d);
			var args = keys.join(',');
//			console.log(d,args,ss[1].substr(0,ss[1].length-1));
			var fn = new Function(args,'return '+ss[1].substr(0,ss[1].length-1));
			// console.log(fn.call(d,d));
			try {
				return fn.apply(d,keys.map(function(key){return d[key]}));
			} catch(err) {
				return false;
			}
		}
	}
}

// Logout from the server
Coiot.prototype.info = function(selector,cb) {
	var self = this;
	this.list(selector,function(err,list){
		var dlist = list.map(function(id){ return self.devices[id]; });
		if(cb) cb(undefined, dlist);
	});
};

// Logout from the server
Coiot.prototype.get = function(selector,attribute,cb) {
	var self = this;
	this.list(selector,function(err,list){
		var dlist = list.map(function(id){ 
			if(attribute) {
				var obj = {id:id};
				obj[attribute] = self.devices[id][attribute];
				return  obj; 
			} else {
				return self.devices[id];
			};			
		});
		if(cb) cb(undefined, dlist);
	});
};

// LSet value of device
Coiot.prototype.set = function(selector,attribute,value,cb) {
	var self = this;
	this.list(selector,function(err,list){
		list.map(function(id){ 
			self.devices[id][attribute] = value;;
		});
		if(cb) cb(undefined);
	});
};


// Add class to the device
Coiot.prototype.addClass = function(selector,className,cb) {
	var self = this;
	this.list(selector,function(err,list){
		list.forEach(function(id){
			var d = self.devices[id];
			if(typeof d.class == 'undefined') d.class = {};
			d.class[className.toLowerCase()] = true;
		});
		if(cb) cb();
	});
};

// Logout from the server
Coiot.prototype.removeClass = function(selector,className,cb) {
	var self = this;
	this.list(selector,function(err,list){
		list.forEach(function(id){
			var d = self.devices[id];
			if(typeof d.class == 'undefined') d.class = {};
			delete d.class[className.toLowerCase()];
		});
		if(cb) cb();
	});
};

// Insert into tables
Coiot.prototype.insert = function(table,id,params,cb) {
	var obj = {id:id};
	utils.extend(obj,params);
	this.ixtables[table][id] = obj;
	this.tables[table].push(obj);
	if(cb) cb();
};

// UDelete from tables
Coiot.prototype.delete = function(table,selector,cb) {
	var self = this;
	this.tables[table] = this.tables[table].filter(function(d){
		if((!selector) || idmatch(d,selector)) {
			delete self.ixtables[table][d.id];
			return false;
		} else {
			return true;
		}
	});
	if(cb) cb();
};

// Update tables
Coiot.prototype.update = function(table,selector,attribute,value,cb) {
	this.tables[table].forEach(function(d){
		if((!selector) || idmatch(d,selector)) {
			if(typeof attribute == 'object') {
				utils.extend(d,attribute);
			} else {
				d[attribute] = value;
			}
			return false;
		}
	});
	if(cb) cb();
};


module.exports = Coiot;