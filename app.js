var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);;

require('./server/config/middleware.js')(app, express);
require('./server/config/serversocketio.js')(io);


// mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/TriviaWithFriends';
mongoURI = process.env.MONGOLAB_URI || 'mongodb://banal:banal@ds033113.mongolab.com:33113/heroku_nn2mcqhl';


mongoose.connect(mongoURI);


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('db success');
});

// server-side socket.io
// require('./server/config/serversocketio.js')(app);


// only run server if app.js was run directly (rather than being
// imported as a module)
if (!module.parent) {
  var port = process.env.PORT || 3000;

  var server = http.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
  });
}

module.exports = app;






