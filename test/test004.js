var Coiot = require('..');
var assert = require('assert');

var coiotServer = new Coiot();
var coiotClient = new Coiot();


describe('Test 004. Test continuoes operations',function(){
	it('1. Start',function(done){
		coiotServer.start(undefined, undefined, undefined, function(err){
			assert(!err);
			done();
		});
	});
	it('2. Login',function(done){
		coiotClient.login('guest','guest',function(err,token){
			assert(!err);
			assert(token);
			done();
		});
	});

	it('98. Logout',function(done){
		coiotClient.logout(function(err){
			assert(!err);
			done();
		});
	});
	it('99. Shutdown',function(done){
		coiotServer.shutdown(function(err){
			assert(!err);
			done();
		});
	});

});
