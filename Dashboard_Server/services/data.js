var x = 0;
function handle_request(msg, callback){
	
	console.log("In generate Data");
	var y = Math.random()*100;
	x++;
	var result = {"status":"200","x":x,"y":y};
	console.log(result);
	callback(null,result);
}

exports.handle_request = handle_request;
