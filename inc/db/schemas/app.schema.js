var mongoose = require('mongoose');

module.exports = mongoose.Schema({
	appName: {
		type: String,
		required: true
	}
});