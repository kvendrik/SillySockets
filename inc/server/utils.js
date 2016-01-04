var request = require('request'),
    chalk = require('chalk');

var db = require('../db'),
    connCache = require('./connCache');

module.exports = {

    setRoutes: function(app, io){
        app.post('/:appName', function(req, res){
            var appName = req.params.appName,
                body = req.body;

            if(!body.event || !body.data){
                res.json({
                    success: false,
                    message: 'please provide an event, data and action argument'
                });
            }

            var conns = connCache.getConnections(appName);
            conns.forEach(function(socket){
                socket.emit(body.event, body.data);
            });

            res.json({
                success: true,
                message: 'emitted to '+conns.length+' clients'
            });
        });
    },

    setConnectionListener: function(io){
        var self = this;
        io.on('connection', function(socket){
            var appName = socket.handshake.query.APP_NAME;

            db.getEvents(appName, function(err, events){
                if(err){
                    console.error(err);
                    return;
                }

                connCache.addConnection(appName, socket);
                console.log(
                    chalk.blue('client connected to "'+appName+'"')
                );

                self._setEventListeners(appName, socket, events);
            });
        });
    },

    _setEventListeners: function(appName, socket, events){
        events.forEach(function(details){
            var onToStr = details.eventName+'" on "'+appName+'" to '+details.url;

            socket.on(details.eventName, function(){
                console.log(
                    chalk.blue('forwarding "'+onToStr)
                );

                request({
                    uri: details.url,
                    method: 'POST'
                }, function(err, res, body) {
                    console.log(
                        chalk.green('forwarded "'+onToStr)
                    );
                });
            });
        });
    }

};