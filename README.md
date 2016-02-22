# Coiot - IoT (Internet of Things) JavaScript Platform

## What is Coiot?

Coiot (IoT Companion) is a platform for Internet of Things. The software is still in the process of developing.

Coiot can be used in different styles:
* Web server
* AJAX API
* REST API
* WebSocket API
* Command-line utility

## Coiot command-line utility

Commands:
```
> coiot server [port] [path] -- start Coiot Web and IoT server with port and html pages from path
> coiot shutdown -- shutsown Coiot server
> coiot login url username password -- connect to Coiot server
> coiot login url token
> coiot logout -- logout from Coiot server
> coiot whoami -- current username
> coiot url -- current url of Coiot server
> coiot list selector -- list all devces from the current server
> coiot get selector [attribute] -- get all attributes/values of devices
> coiot set selector attribute [value] -- set value of attribute
> coiot ts selector [period] [logtype] -- get time-series data history for period
> coiot log selector [period] [logtype] -- get log of data, command and attributes history for period
> coiot do selector action [parameters] -- perform the action
> coiot trigger selector signal [parameters] -- emulate signal for selected devices
> coiot on selector events message -- message on event
> coiot one selector events message -- one time message on event
> coiot off selector events
> coiot register selector parameters -- register new device
> coiot unregister selector -- unregister the device
> coiot md path parameters -- create new path with parameters
> coiot mt path table parameters -- create new virtual path with parameters
> coiot pwd -- get current path
> coiot ls path-selector -- list all objects and devices on current path
> coiot cd path -- change current path
> coiot rm path -- remove path
```
Additional admin commands (users, buildings, and other lists):
> coiot insert table id parameters -- or ins
> coiot delete table id-selector -- or del
> coiot update table id-selector field value -- or upd

Administration:
> coiot grant user-selector rights -- grants access rights to the user

## JavaScript interface
```js
var coiot = new Coiot(); // create new Coiot object instance
coiot.server(port,path); // run Coiot server (only in Node.js)
coiot.login(url,username,password);
coiot.logout();
coiot.list(selector,cb); 
coiot.get(selector,attribute,cb);
coiot.set(selector,attribute,value,cb);
coiot.history(selector,period,cb);
coiot.log(selector,parameters,cb);
coiot.do(selector,action,parameters,cb);
coiot.trigger(selector,event,parameters,cb);
coiot.on(selector,event,cb);
coiot.one(selector,event,cb);
coiot.off(selector,event,cb);
coiot.register(selector,parameters,cb);
coiot.unregister(selector,cb);
coiot.md(path,parameters,cb);
coiot.mt(path,table,parameters,cb);
coiot.ls(path,parameters,cb);
coiot.cd(path,cb);
coiot.rm(path,cb);
coiot.insert(table,id,parameters);
coiot.delete(table,idselector);
coiot.update(table,idselector,field,value);

```
Additional commands for browser version of coiot.js:

## Coiot object

## In browser

It connects to Coiot server via WebSocket API.

## In Node.js

It connects to:
* Devices - via special APIs
* Emulator - via WebSocket API
* Storages - via database connectors

## Coiot Device Emulator
For each device (sensor):
```
var device = new Device(parameters);
device.init = function() {}; // init 
device.command = function(command) {}; // when command arrives
```
Common bus:
```
var bus = new Bus(parameters); // create new bus
bus.add(device); // add device to the bus
bus.remove(device); // remove device from the bus
```
Common devices:
* TemperatureSensor
* GPSTracker
* WindowSensor


## WebSocket API interface

## REST API

Transport can be 'ws' or 'rest' or 'post'.
* ws - WebSocket
* ajax - REST (with GET and POST) without events
* post - REST with POST only (for better security protection) without events

You can specify transport at initiation time:
```
var wsiot = new Coiot('ws'); // default
var wsiot = new Coiot('ajax');
var wsiot = new Coiot('post');
```

## Selectors
```
tag - object tag
.class - object class
#id - object id
/obj
/dir/obj
./obj
../obj
```

Every object can be of two types: 
* path object
* device

Every object can have following data fields:
* id - identificator
* path - path in the tree
* classes - one or some classes
* attributes - some attributes of device
* values - current values of device sensors
```

## Tests
### In Node.js
```
> cd test
> mocha .
```

### In browser
```
> coiot st 4000 testbr
```
Then run browser and type in url line:
```
http://localhost:4000
```

(c) Andrey Gershun, 2016