
/********************************************  THIS IS NODE.JS API RELATED   *******************************************************/
(function(){

	'use strict'

	 
	const dbConnection = require('../dbConnection.js'),	
		 bluePromise = require("bluebird"),
		 util = require('util'),
		 Admin = require('../dataModels/adminModel.js');
		
	var log = require('../serverUtils/logger.js');
	var logger = log.child({SOURCE_FILE: 'adminDao.js'});
	const loggly = require('../serverUtils/loggly.js');

	var adminDao = {

		adminAddEmailPassword: reqbody =>{	
			
			const admin = new Admin(reqbody);
			//console.log('NEW UTIL INSPECTOR: ' + util.inspect(admin));

			const sql = "INSERT admins SET ?";

			return bluePromise.using(dbConnection.getMySQL_PoolConnection(), function(connection) {
			
			    return connection.query(sql, admin)
			    		.then(
			    			response =>{
							    
				            	//console.log('MySQL Successfuly UPDATED!');
				            	loggly.log({"NEW ADMIN ADDED": response},['BITREC-POSTPUT-OK']);
				            	logger.info({"NEW ADMIN ADDED": response});
				            	return bluePromise.resolve(response);
				        	}     
			      	    ).catch(err => {
					     	
					        connection.rollback(function(){
					      			 //console.log('DB INSERTION ERROR from DAO: ' + err);
					      			 logger.error({err: err});	
					      			 loggly.log({err: err},['BITREC-POSTPUT-FAILED']); 	 
							});

							return bluePromise.reject(err);	
					    });	
			});
			
		}, 
		getPasswordfromDBviaEmail : email => {

			const sql = "SELECT admin_id,password FROM admins WHERE email= ?";

			return bluePromise.using(dbConnection.getMySQL_PoolConnection(), function(connection) {
			
			    return connection.query(sql, email)
			    		.then(
			    			response => {
			    				return bluePromise.resolve(response);
			    			}
			      	    ).catch(
			      	    	err => {
				      			logger.error({err: err});	
				      			loggly.log({err: err},['BITREC-GET-FAILED']); 	
								return bluePromise.reject(err);	
					  	    }
				  	    );	
			});
		}
	}
		
	

	module.exports = adminDao;

}());
