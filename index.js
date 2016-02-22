var assert = require('assert');
var utils=require('./src/utils');

// Nothing

// Base class
var Coiot = function() {
	this.devices = {};
	this.connections = {};
	return this;
};

// Start server
Coiot.prototype.start = function(port,public,params,cb) {
	if(!port) port = 4000;
	if(cb) cb();
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
	if(selector.match(/[0-9]*/i) && (''+d.id).toUpperCase() == (''+selector).toUpperCase()) return true;
	if(selector.match(/\#[a-z_\-0-9]*/i) && (''+d.id).toUpperCase() == (''+selector.substr(1)).toUpperCase()) return true;
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
			return fn.apply(d,keys.map(function(key){return d[key]}));
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

module.exports = Coiot;