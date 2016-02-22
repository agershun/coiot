var Coiot = require('..');
var assert = require('assert');

describe('Test 003. Login and logout',function(){
	it('1. Start, login, logout, and shutdown',function(done){
		var coiotServer = new Coiot();
		var coiotClient = new Coiot();
		coiotServer.start(undefined, undefined, undefined, function(err){
			assert(!err);
			coiotClient.login('guest','guest',function(err,token){
				assert(!err);
				assert(token);
				coiotClient.logout(function(err){
					assert(!err);
					coiotServer.shutdown(function(err){
						assert(!err);
						done();
					});				
				});	
			});
		});
	});
});



