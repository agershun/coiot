var Coiot = require('..');
var assert = require('assert');

describe('Test 001. Create and shutdown server',function(){
	it('1. Start and shutdown server',function(done){
		var coiot = new Coiot();
		coiot.start(undefined, undefined, undefined, function(err){
			assert(!err);
			coiot.shutdown(function(err){
				assert(!err);
				done();
			});
		});
	});
});



