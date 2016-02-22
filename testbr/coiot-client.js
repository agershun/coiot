var Coiot = function() {
	this.cbs = {};
	this.cbsi = 0;
	return this;
};

Coiot.prototype.login = function(url, username, password, cb){
	var self = this;
	var ws = this.ws = new WebSocket('ws://localhost:4000/ws');
	this.ws.onopen = function(){
		self.send(['login',url,username,password],cb);
	};
	this.ws.onmessage = this.onmessage.bind(this);
};

Coiot.prototype.send = function(arg,cb){
	this.cbsi++;
	this.cbs[this.cbsi] = cb;
	arg.unshift(this.cbsi);
	this.ws.send(JSON.stringify(arg));
};

Coiot.prototype.onmessage = function(event) {
	var i = event.data[0];
	event.data.shift();
	if(this.cbs[i]) {
		this.cbs[i].call(this,event.data);
		delete this.cbs[i];
	} else {
		throw new Error('Lost package');
	}
};


Coiot.prototype.list = function(selector,cb){
	if(cb) cb(undefined, [1,2,3]);
};