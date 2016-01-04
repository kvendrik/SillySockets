var mongoose = require('mongoose');

module.exports = mongoose.Schema({
	appId: {
		type: String,
		required: true
	},
	eventName: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	}
});