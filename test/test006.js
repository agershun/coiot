var Coiot = require('..');
var assert = require('assert');

var coiotServer = new Coiot();

describe('Test 006. Info',function(){
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

	it('3. Info',function(done){
		coiotServer.info('2',function(err,dlist){
			assert(!err);
			assert.deepEqual(dlist.length,1);
			var d = dlist[0];
			assert.deepEqual(d.connection,'demo');
			assert.deepEqual(d.id,2);
			assert.deepEqual(d.tag,'led');
//			 { connection: 'demo', id: 2, tag: 'led' } ]
//			console.log(dlist);
			done();
		});
	});


	it('98. Selector',function(done){
		coiotServer.list('1',function(err,list){
			assert.deepEqual(list,[1]);
			done();
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
