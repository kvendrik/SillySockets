var fs = require('fs'),
	schemas = {};

fs.readdirSync(__dirname).forEach(function(filename){
	if(filename !== 'index.js' && /\.schema\.js$/.test(filename)){
		var schemaName = filename.replace('.schema.js', '');
		schemas[schemaName] = require('./'+filename);
	}
});

module.exports = schemas;
