var Coiot = require('..');
var assert = require('assert');

var coiotServer = new Coiot();

describe('Test 005. Match selector',function(){
	it('1. Start',function(done){
		coiotServer.start(undefined, undefined, undefined, function(err){
			assert(!err);
			done();
		});
	});
	it('2. Connect',function(done){
		coiotServer.connect('../src/democonn',undefined,undefined,function(err){
			assert(!err);
			done();
		});
	});

	it('3. Selector ALL',function(done){
		coiotServer.list(undefined,function(err,list){
			assert.deepEqual(list,[0,1,2,3]);
			done();
		});
	});

	it('4. Selector 1',function(done){
		coiotServer.list(1,function(err,list){
			assert.deepEqual(list,[1]);
			done();
		});
	});

	it('5. Selector #2',function(done){
		coiotServer.list('#2',function(err,list){
			assert.deepEqual(list,[2]);
			done();
		});
	});

	it('6. Selector [condition]',function(done){
		coiotServer.list('[id>=2]',function(err,list){
			assert.deepEqual(list,[2,3]);
			done();
		});
	});

	it('7. Selector Class',function(done){
		coiotServer.addClass('led','light',function(err,list){
			coiotServer.list('.light',function(err,list){
				assert.deepEqual(list,[1,2]);
				done();
			});
		});
	});

	it('98. Logout',function(done){
		coiotServer.list(undefined,function(err,list){
			assert.deepEqual(list,[0,1,2,3]);
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
