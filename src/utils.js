// Utilities


function extend(obj,params) {
	for(var f in params) obj[f] = params[f];
	return obj;
}

module.exports = {extend:extend};