var dataset=[];

var view = {id:'main', rows: [
	{id: 'sensor12345', template:'temperature'},
	{id:'chart12345',
            view:"chart",
            type:"line",
            value:"#temperature#",
            item:{
                borderColor: "#1293f8",
                color: "#ffffff"
            },
            line:{
                color:"#1293f8",
                width:3
            },
            xAxis:{
                template:"#time#"
            },
            offset:0,
            yAxis:{
                start:25,
                end:40,
                step:5,
                template:function(obj){
                    return (obj%20?"":obj)
                }
            },
            data: dataset
    }
    ]};


var interval;


view.onAfterLoad = function(){
	interval = setInterval( function() {
		webix.ajax().post('/api',{sensorId:12345},function(text,xml,xhr){
			var json = xml.json();
			var t = json.data.temperature;
			// console.log(t);
			$$('sensor12345').define('template',t);
			$$('sensor12345').refresh();

			if($$("chart12345").data.getRange().length>20) {
				$$("chart12345").remove($$("chart12345").getFirstId());
			}
			$$('chart12345').add(json.data);


			// console.log(dataset);
//			$$('chart12345').refresh();
		});
	},1000);
};

view.onBeforeUnload = function() {
	if(interval) clearInterval(interval);
	console.log('unloading');
};

return view;