var ejs = require("ejs");
var mq_client = require('../rpc/client');


function signin(req,res) 
{
	console.log("Displaying signin page");
	res.render('signIn',function(err, result) 
	{
	   // render on success
	   if (!err) 
	   {
	            res.end(result);
	   }
	   // render or error
	   else 
	   {
	            res.end('An error occurred');
	            console.log(err);
	   }
   });
}

function generateData(req,res){
	console.log("request for generateData at client");
	var data = {};
	
	mq_client.make_request('data_queue',data, function(err,results){
		console.log("inside generatedata make request");
		console.log(results);
		if(err){
			console.log("Error in getting x and y coordinates: "+err);
			throw err;
		}
		else 
		{	
			if(results.status == "200"){
				var result = {"x":results.x,"y":results.y,"status":"200"};
			}	
			res.send(result);
		}  
	});
}

exports.signin=signin;
exports.generateData=generateData;