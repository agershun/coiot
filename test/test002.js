var Coiot = require('..');
var assert = require('assert');

describe('Test 002. Demo connection',function(){
	it('1. Start, connect, and shutdown',function(done){
		var coiot = new Coiot();
		coiot.start(undefined, undefined, undefined, function(err){
			assert(!err);
			coiot.connect('../src/democonn',undefined,undefined,function(err){
				assert(!err);
				coiot.shutdown(function(err){
					assert(!err);
					done();
				});				
			});
		});
	});
});



