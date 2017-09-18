(function(){

	'use strict'

	const dbConnection = require('../dbConnection.js'),	
		  bluePromise = require("bluebird");


	var campaignDao = {
		getAllJobSectors: ()=>{






			const sql = "SELECT * FROM job_sectors";
			return bluePromise.using(dbConnection.getMySQL_PoolConnection(), function(connection) {
				return connection.query(sql).then(
				    	response =>{	
				    		//connection.release(); ???
				    		return bluePromise.resolve(response);
				    }).catch(
					      err => {
					     	 return bluePromise.reject(err);
					    }
				    );
			 });






		}
	}

	module.exports = campaignDao;

}());
