#!/usr/bin/env node

var assert = require('assert');
var Coiot = require('../index');
var coiot = new Coiot();

var version = '0.0.1';

if(process.argv.length > 2) {
	// Prepare command variable
	var cmd = process.argv[2].toLowerCase();
	if(cmd.substr(0,2) === '--') cmd = cmd.substr(2);
	if(cmd.substr(0,1) === '-') cmd = cmd.substr(1);

	// Process the commands
	if(cmd === 'v' || cmd ==='version') {
		console.log(version);
	} if(cmd === 'h' || cmd ==='help') {
		console.log('Coiot Internet of Things Platform Command-Line Utility. Version '+version+' (c) 2016, Andrey Gershun');
		console.log('Commands:');
		console.log('  v   version                           -- get current version of Coiot ');
		console.log('  h   help                              -- help');
		console.log('  st  start port public-path init-script -- start Coiot server');
		console.log('  sh  shutdown  						  -- shutdown Coiot server');
		console.log('  li  login url user password            -- login with password');
		console.log('  lo  logout                             -- logout');
		console.log('  wh  whoami                             -- current user');
		console.log('  ur  url                                -- current server url');
		console.log('  in  info selector                      -- information');
		console.log('  l   list selector                      -- list');
		console.log('  g   get selector [attribute]           -- get values from devices');
		console.log('  s   set selector attribute [value]     -- set values on devices');
		console.log('  hs  hist selector time-series-selector -- history');
		console.log('  lg  log selector period type           -- get log fro period');
		console.log('  do  do selector command parameter      -- perform command');
		console.log('  tr  trigger selector signal-name [parameters] -- send signal');
		console.log('  on  on selector events message         -- message on event');
		console.log('  oe  one selector events message        -- one time message on event');
		console.log('  of  off selector events                -- off event messaging');
		console.log('  rg  register connection id parameters  -- register new device from connection');
		console.log('  un  unregister selector                -- unregister the device');
		console.log('  md  mkdir path parameters              -- create new path with parameters');
		console.log('  mt  mount path table parameters           -- create new virtual path with parameters');
		console.log('  pw  pwd                                -- get current path');
		console.log('  ls  ls path-selector                   -- list all objects and devices on current path');
		console.log('  cd  cd path                            -- change current path');
		console.log('  rm  rm path                            -- remove path');
		console.log('  i   insert table id parameters         -- insert new record');
		console.log('  d   delete table id-selector           -- delete record');
		console.log('  u   update table id-selector field value -- update with values');
		console.log('  gr  grant user-selector rights         -- grant access rights');
		console.log('  ac  addclass selector class            -- add class');
		console.log('  rc  removeclass selector class         -- remove class');
		console.log('  cn  connect script name params         -- connect to device network');
		console.log('    ');
	} else if(cmd === 'st' || cmd ==='server') {
		var port = process.env['COIOT_PORT'] = process.argv[3] || 4000;
		var public = process.env['COIOT_PUBLIC'] = process.argv[4] || 'public';
		var params = {};
		if(process.argv[5]) {
			require('../'+process.argv[5]);
		}
		coiot.start(port, public, params, function(err){
			console.log('Server started at port '+process.env['COIOT_PORT']);
		});
	} else if(cmd === 'sh' || cmd ==='server') {
		coiot.shutdown(function(err){
			console.log('Server at port '+process.env['COIOT_PORT']+' is shutdown.');
			process.env['COIOT_PORT'] = undefined;
			process.env['COIOT_PUBLIC'] = undefined;
		});
	} else if(cmd === 'li' || cmd ==='login') {
		console.log('Login');
		coiot.login(process.argv[3],process.argv[4],function(err,token) {
			process.env.COIOT_TOKEN = token;
			console.log('Server was connected to '+conid);
		});
	} else if(cmd === 'lo' || cmd ==='logout') {
		console.log('Logout');
	} else if(cmd === 'wh' || cmd ==='whoami') {
		console.log('Who am I?:',process.env['COIOT_USER']);
	} else if(cmd === 'ur' || cmd ==='url') {
		console.log('Current server:',process.env['COIOT_URL']);
	} else if(cmd === 'i' || cmd ==='info') {
		console.log('Info');
		coiot.login(undefined,undefined,function(err) {
			assert(!err);
			coiot.info(process.argv[3],function(err,list){
				assert(!err); // Device not found
				console.log(JSON.stringify(list));
			});
		});
	} else if(cmd === 'l' || cmd ==='list') {
		coiot.login(undefined,undefined,function(err) {
			assert(!err);
			coiot.list(process.argv[3],function(err,list){
				assert(!err); // Device not found
				console.log(list);
			});
		});
	} else if(cmd === 'g' || cmd ==='get') {
		console.log('Get device value');
	} else if(cmd === 's' || cmd ==='set') {
		console.log('Set attribute value');
	} else if(cmd === 'hi' || cmd ==='hist') {
		console.log('History data');
	} else if(cmd === 'lg' || cmd ==='log') {
		console.log('Logs');
	} else if(cmd === 'do' || cmd ==='server') {
		console.log('Action');
	} else if(cmd === 'tr' || cmd ==='server') {
		console.log('Trigger');
	} else if(cmd === 'on' || cmd ==='on') {
		console.log('On');
	} else if(cmd === 'oe' || cmd ==='one') {
		console.log('One');
	} else if(cmd === 'of' || cmd ==='off') {
		console.log('Off');
	} else if(cmd === 'rg' || cmd ==='register') {
		coiot.login(undefined,undefined,function(err) {
			assert(!err);
			coiot.register(process.argv[3],process.argv[4],process.argv[5],function(err){
				assert(!err); // Device not found
				console.log('Device registered');
			});
		});
	} else if(cmd === 'un' || cmd ==='unregister') {
		console.log('Unregister');
	} else if(cmd === 'md' || cmd ==='mkdir') {
		console.log('Off');
	} else if(cmd === 'mt' || cmd ==='mount') {
		console.log('Off');
	} else if(cmd === 'pwd' || cmd ==='pwd') {
		console.log(process.env['COIOT_PATH']);
	} else if(cmd === 'ls' || cmd ==='ls') {
		console.log('List');
	} else if(cmd === 'cd' || cmd ==='cd') {
		console.log('Change path');
	} else if(cmd === 'rm' || cmd ==='remove') {
		console.log('Remove path');
	} else if(cmd === 'i' || cmd ==='insert') {
		console.log('Insert');
	} else if(cmd === 'd' || cmd ==='delete') {
		console.log('Delete');
	} else if(cmd === 'u' || cmd ==='update') {
		console.log('Update');
	} else if(cmd === 'gr' || cmd ==='grant') {
		console.log('Grant');
	} else if(cmd === 'ac' || cmd ==='addclass') {
		coiot.login(undefined,undefined,function(err) {
			assert(!err);
			coiot.removeClass(process.argv[3],process.argv[4],function(err){
				assert(!err); // Device not found
				console.log('Class added.');
			});
		});
	} else if(cmd === 'rc' || cmd ==='removeclass') {
		coiot.login(undefined,undefined,function(err) {
			assert(!err);
			coiot.removeClass(process.argv[3],process.argv[4],function(err){
				assert(!err); // Device not found
				console.log('Class removed.');
			});
		});
	} else if(cmd === 'cn' || cmd ==='connect') {
		console.log('Connect to network');
		coiot.login(undefined,undefined,function(err){
			assert(!err);
			var script = process.argv[3];
			var connid = process.argv[4];
			var params = process.argv[5];
			coiot.connect(script, connid, params, function(err){
				console.log('Server was connected to '+connid);
			});
		});
	}
}
