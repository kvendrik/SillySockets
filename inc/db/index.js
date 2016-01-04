var mongoose = require('mongoose'),
	schemas = require('./schemas');

var db = {

	connect: function(){
		mongoose.connect('mongodb://localhost/sillysockets');
	},

	getEvents: function(appName, callback){
		this._findAppByName(appName, function(err, model){
			if(err){
    			callback(err);
    			return;
    		}

    		if(!model){
	    		callback({
		    		message: appName+' not found'
		    	});
	    	} else {
				var Event = mongoose.model('events', schemas.event);
				Event.find({ appId: model._id }, function(err, models){
					if(err){
				    	callback(err);
				    	return;
				    }
				    callback(null, models);
				});
			}
		});
	},

	addEventToApp: function(appName, eventName, url, callback){
		var Event = mongoose.model('events', schemas.event);

		this._findAppByName(appName, function(err, model){
			if(err){
		    	callback(err);
		    	return;
		    }

		    if(!model){
		    	callback({
		    		message: appName+' not found'
		    	});
		    } else {
		    	Event.findOne({ eventName: eventName }, function(err, model){
		    		if(err){
		    			callback(err);
		    			return;
		    		}

		    		if(!model){
			    		var newEvent = new Event({
				    		appId: model._id,
				    		eventName: eventName,
				    		url: url
				    	});
			    		newEvent.save(callback);
			    	} else {
			    		callback({
		    				message: eventName+' already exists in '+appName
		    			});
			    	}
		    	});
		    }
		});
	},

	createApp: function(appName, callback){
		this._findAppByName(appName, function(err, model){
			if(err){
		    	callback(err);
		    	return;
		    }

			if(model){
				callback({
		    		message: appName+' already exists'
		    	});
			} else {
				var newApp = new App({ appName: appName });
				newApp.save(callback);
			}
		});
	},

	rmApp: function(appName, callback){
		this._findAppByName(appName, function(err, model){
		    if(err){
		    	callback(err);
		    	return;
		    }

		    if(!model){
		    	callback({
		    		message: appName+' not found'
		    	});
		    } else {
		    	model.remove(callback);
		    }
		});
	},

	_findAppByName: function(appName, callback){
		var App = mongoose.model('apps', schemas.app);
		App.findOne({ appName: appName }, callback);
	}

};

module.exports = db;