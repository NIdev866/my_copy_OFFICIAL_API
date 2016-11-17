
var promise_mysql = require('promise-mysql'),
database_config = require('./serverConfigFiles/database_config.js'),
pool = promise_mysql.createPool(database_config.dev_pool),

dbConnection = {
		/*
			USING BLUEBIRD'S PROMISE-MYSQL POOLING
		*/
		getMySQL_PoolConnection: () => {
			return pool.getConnection().disposer(
				connection => {
			   	 	pool.releaseConnection(connection);
			    //console.log('DB CONNECTION CLOSED!');
				});
		}

};
module.exports = dbConnection;
