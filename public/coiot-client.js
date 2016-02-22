// Browser client of Coiot IoT Framework

var Coiot = function(){return this};

var coiot = new Coiot;

// List of all devices
// Examples:
// 		coiot.list('.led',function(err,data){ data.forEach(function(d){ 
//      	coiot.do(d,'off');
//      });
//
//		coiot.query('.led [floor=1]').do('off').done(()=>console.log('ALL LIGHTS TURNED OFF'));
//

Coiot.prototype.list = function(selector,cb) {
	return [];
};

// List of all devices
Coiot.prototype.ping = function(selector,timeout,cb) {
	return [];
};


// Get current value of first device in selector
Coiot.prototype.get = function(selector,cb) {
	return;
};

// Get current value of all queries
Coiot.prototype.query = function(selector,history,cb) {
	return {12345:{}};
};

// Do the action
Coiot.prototype.do = function(selector,action,params,cb) {
	if(cb) cb();
	return {12345:{}};
};

// Login
//or coiot.login(url,token)
Coiot.prototype.login = function (url,user,password) {

};

// Logout from current Coiot session
Coiot.prototype.logout = function () {

};

// Logout from current Coiot session
Coiot.prototype.register = function (selector,device,params,cb) {
	register("#112-1121-221",'111021-121121-12121',{country:'Russia'})
};

// Logout from current Coiot session
// Examples:
// 		coiot.attr('[country="A"]','country','B')
//		coiot.attr('[country="A"]',{country:'B',age:12})
//		coiot.attr({country:'A'},{country:'B',age:12})
Coiot.prototype.attr = function (selector,attr,value,cb) {

};


// Logout from current Coiot session
Coiot.prototype.unregister = function (selector,cb) {

};




