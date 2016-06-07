//super simple rpc server example
var amqp = require('amqp')
, util = require('util');

var data = require('./services/data');

var cnn = amqp.createConnection({host:'127.0.0.1'});
console.log("cnn on");
cnn.on('ready', function(){
	console.log("listening on data_queue");

	cnn.queue('data_queue', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			data.handle_request(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});
});