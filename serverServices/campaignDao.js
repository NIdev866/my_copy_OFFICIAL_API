
/********************************************  THIS IS NODE.JS API RELATED   *******************************************************/
(function(){

	'use strict'

	const dbConnection = require('../dbConnection.js'),	
		  bluePromise = require("bluebird");
		
	var log = require('../serverUtils/logger.js');
	var logger = log.child({SOURCE_FILE: 'campaignDao.js'});
	const loggly = require('../serverUtils/loggly.js');


	var campaignDao = {

		getRegisteredCompanies: ()=>{

			const sql = 'SELECT * FROM company';
			
		    return bluePromise.using(dbConnection.getMySQL_PoolConnection(), function(connection) {
				    return connection.query(sql).then(
				    	response =>{	
				    		//connection.release(); ???
				    		return bluePromise.resolve(response);
				    }).catch(
					      err => {
					     	 logger.error({err: err});	
				      		 loggly.log({err: err},['BITREC-GET-FAILED']); 
					     	 return bluePromise.reject(err);
					    }
				    );
				    	
			 });//THEN USE .then() TO HOOK UP TO IT, IN OTHER FILE

		},
		getAllCampaigns : ()=>{  //THIS ONLY FILLS DROP DOWN MENU

			const sql = "SELECT * FROM campaigns ORDER BY campaign_id DESC";
			return bluePromise.using(dbConnection.getMySQL_PoolConnection(), function(connection) {
				    return connection.query(sql).then(
				    	response =>{	
				    		//connection.release(); ???
				    		return bluePromise.resolve(response);
				    }).catch(
					      err => {
					     	 logger.error({err: err});	
				      		 loggly.log({err: err},['BITREC-GET-FAILED']); 
					     	 return bluePromise.reject(err);
					    }
				    );
				    	
			 });//THEN USE .then() TO HOOK UP TO IT, IN OTHER FILE
		},
		getAllPositions : ()=>{  //THIS ONLY FILLS DROP DOWN MENU

			const sql = "SELECT * FROM positions ORDER BY position_id DESC";
			return bluePromise.using(dbConnection.getMySQL_PoolConnection(), function(connection) {
				    return connection.query(sql).then(
				    	response =>{	
				    		//connection.release(); ???
				    		return bluePromise.resolve(response);
				    }).catch(
					      err => {
					     	 logger.error({err: err});	
				      		 loggly.log({err: err},['BITREC-GET-FAILED']); 
					     	 return bluePromise.reject(err);
					    }
				    );
				    	
			 });//THEN USE .then() TO HOOK UP TO IT, IN OTHER FILE
		}

	}

	module.exports = campaignDao;

}());
