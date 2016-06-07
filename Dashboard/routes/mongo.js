var mongoDB = require('mongodb').MongoClient;

exports.connect = function(URL, callback) {
    mongoDB.connect(URL, function(error, connection) {
        if(error) {
            throw new Error("Could not connect -- "+error);
        }
        console.log("You are connected");
        callback(connection);
    });
};

exports.connectToCollection = function(name, connection) {
    return connection.collection(name);
};