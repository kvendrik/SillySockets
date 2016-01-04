module.exports = {

	_connections: {},

	addConnection: function(appName, socket){
		if(typeof this._connections[appName] !== 'object'){
			this._connections[appName] = [];
		}
		this._connections[appName].push(socket);
	},

	getConnections: function(appName){
		return this._connections[appName] || [];
	}
	
};