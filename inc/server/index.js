var bodyParser = require('body-parser'),
    app = require('express')(),
	http = require('http').Server(app),
	io = require('socket.io')(http);

var utils = require('./utils');

module.exports = function(port){
    app.use(bodyParser.json());

    utils.setRoutes(app, io);
	utils.setConnectionListener(io);

    http.listen(port);
};