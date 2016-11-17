
/********************************************  THIS IS NODE.JS API RELATED   *******************************************************/
(function(){

	'use strict'

	const fs = require('fs'),
		     nestedMYSQL = require('../nested-mysql.js'),
			 dbConnection = require('../dbConnection.js'),	
			 bluePromise = require("bluebird"),
			 util = require('util'),
			 Jobseeker = require('../dataModels/jobseekerModel.js'),
			 JobseekerPassword = require('../dataModels/jobseekerPassword.js');
		
		
	var log = require('../serverUtils/logger.js');
	var logger = log.child({SOURCE_FILE: 'jobseekerDao.js'});
	const loggly = require('../serverUtils/loggly.js');


	var jobseekerDao = {

		createJobseeker : (reqbody, resumeurl) => {

			//VALIDATE a jobseeker obj from Client
			
			var jobseekerCampaign = reqbody.campaign_id;
			var jobseekerCompany = reqbody.company_id;
			var jobseekerPosition = reqbody.position_id;
			var jobseeker = new Jobseeker(reqbody);
			jobseeker.setResumeUrl(resumeurl);

			
		/*
			=========== UPLOADED PROFILE PICTURE HANDLER ==============
		*/
			function decodeBase64Image(dataString){
				  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
				    response = {};

				  if (matches.length !== 3) {
				    return new Error('Invalid input string');
				  }

				  response.type = matches[1];
				  response.data = new Buffer(matches[2], 'base64');
				  return response;
			}

			var decodedimg = decodeBase64Image(reqbody.profilepic);
			
			var fullname = jobseeker.getFullName();
			
			var filepath = './uploads/profilepic/' + fullname + '_profilepic.jpg'; 

	        fs.writeFile(filepath, decodedimg.data, function(err) {
	          if(err) {
			        return console.log(err);
			   }else{
			   	  jobseeker.setPictureUrl(filepath);
			   }

	        });
        //=========================================================================
        //================= MYSQL INSERT ====
        //=================================================		  
			const sql1 = 'INSERT INTO jobseeker SET?'
			const sql2 = "INSERT INTO jobseeker_status SET?";

			return bluePromise.using(dbConnection.getMySQL_PoolConnection(), function(connection) {
				
			    return connection.query(sql1, jobseeker)
			    		.then(res=>{
			    			//console.log('NEW UTIL INSPECTOR: ' + util.inspect(res));
				    		var jobseeker_id = res.insertId;
							
							//THIS IS OBJECT CREATED FOR MYSQL SECOND INSERT
							var jobseeker_status = {jobseeker_id: jobseeker_id, 
													company_id: jobseekerCompany, 
													campaign_id: jobseekerCampaign,
													job_status: 'applied',
													position_id: jobseekerPosition
												   };

					        	connection.query(sql2, jobseeker_status) 
					        	  .then(
						      	    	res=>{
						      	    		 
						      	    		console.log('Successfuly inserted into MySQL!');
						      	    		loggly.log({"NEW JOBSEEKER ADDED": res},['BITREC-POSTPUT-OK']);
				            				logger.info({"NEW JOBSEEKER ADDED": res});

						      	    		//connection.release(); ???
						      	    })
						      	    .catch(
						      	    	err => {
								      	logger.error({err: err});	
					      			    loggly.log({err: err},['BITREC-POSTPUT-FAILED']);
								      	return bluePromise.reject(err);
							  	 });

						    return bluePromise.resolve(jobseeker_id);
				      	    
							    
			      	    }).catch(
			      	    	err => {
					     	 	logger.error({err: err});	
					      		loggly.log({err: err},['BITREC-POSTPUT-FAILED']);
					     	 	return bluePromise.reject(err);
					  	  	}
					  	)
			});
			
		},
		addJobseekerPassword: reqbody => {

			const jobseekerPass = new JobseekerPassword(reqbody);
			const jobseeker_id = jobseekerPass.getId();

			console.log('NEW UTIL INSPECTOR: ' + util.inspect(jobseekerPass));

			const sql = "UPDATE jobseeker SET ? WHERE jobseeker_id= ?";

			return bluePromise.using(dbConnection.getMySQL_PoolConnection(), function(connection) {
			
			    return connection.query(sql, [jobseekerPass, jobseeker_id])
			    		.then(
			    			response =>{
							    
				            	//console.log('MySQL Successfuly UPDATED!');
				            	loggly.log({"NEW JOBSEEKER ADDED": response},['BITREC-POSTPUT-OK']);
				            	logger.info({"NEW JOBSEEKER ADDED": response});
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
		getPasswordfromDB : jobseeker_id => {


			const sql = "SELECT password FROM jobseeker WHERE jobseeker_id= ?";

			return bluePromise.using(dbConnection.getMySQL_PoolConnection(), function(connection) {
			
			    return connection.query(sql, jobseeker_id)
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

			


		},

		getPasswordfromDBviaEmail : email => {

			const sql = "SELECT jobseeker_id,password FROM jobseeker WHERE email_id= ?";

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
		},

		

	
		getNestedJobseekers : ()=>{

			var sql = 'SELECT * FROM jobseeker \
						LEFT JOIN tests_scores \
						ON tests_scores.jobseeker_id = jobseeker.jobseeker_id';
			//Key relations, Define each table's primary and foreign keys
		    var nestingOptions = [
		        { tableName : 'jobseeker', pkey: 'jobseeker_id'},
		        { tableName : 'tests_scores', pkey: 'test_category_id', fkeys:[{table:'jobseeker',col:'jobseeker_id'}]}
		        
		    ];

			return bluePromise.using(dbConnection.getMySQL_PoolConnection(), function(connection) {
				
			    return connection.query({sql: sql, nestTables: true})
			    		.then(function(rows){

 	                        //connection.release(); ???

				            var nestedRows = nestedMYSQL.convertToNested(rows, nestingOptions);
				           
				            return bluePromise.resolve(nestedRows);
				          
			      	    }).catch(function(err) {
					      console.log(err);
					      return bluePromise.reject(err);
					    });

				
			});
	
		},
		getNestedJobseeker : jobseeker_id =>{

			var sql = "SELECT * \
						FROM jobseeker   \
						LEFT JOIN tests_scores \
						ON tests_scores.jobseeker_id = jobseeker.jobseeker_id \
						LEFT JOIN test_category \
						ON test_category.test_category_id = tests_scores.test_category_id \
						LEFT JOIN skill2jobseeker\
						ON skill2jobseeker.jobseeker_id = jobseeker.jobseeker_id\
						LEFT JOIN skill2category\
						ON skill2category.skill_id = skill2jobseeker.skill_id\
						LEFT JOIN skill_categories \
						ON skill2category.skill_category_id = skill_categories.skill_category_id \
						LEFT JOIN reviews\
						ON jobseeker.jobseeker_id = reviews.jobseeker_id\
						WHERE jobseeker.jobseeker_id =?";
							

			//Key relations, Define each table's primary and foreign keys
		    var nestingOptions = [
		        {tableName : 'jobseeker', pkey: 'jobseeker_id'}, 							
		        {tableName : 'tests_scores', pkey: 'test_category_id', fkeys:[{table:'jobseeker',col:'jobseeker_id'},
		       											 {table:'test_category',col:'test_category_id'}]},
		        {tableName : 'test_category', pkey: 'test_category_id'},

		        {tableName : 'skill2jobseeker', pkey: 'skill_id', fkeys:[{table:'jobseeker',col:'jobseeker_id'},
		       											 {table:'skill2category',col:'skill_id'},
		       											]},
		        {tableName : 'skill2category', pkey: 'skill_id', fkeys:
		        											[{table:'skill_categories',col:'skill_category_id'}]},
		        					 
		        {tableName : 'skill_categories', pkey: 'skill_category_id'},
		        
		        {tableName : 'reviews', pkey: 'review_id', fkeys:[{table:'jobseeker',col:'jobseeker_id'}]}
		        
		    ];

		    return bluePromise.using(dbConnection.getMySQL_PoolConnection(), function(connection) {
				
			    return connection.query({sql: sql, nestTables: true},[jobseeker_id])
			    		.then(function(rows){

			    			//connection.release(); ???

				            var nestedRows = nestedMYSQL.convertToNested(rows, nestingOptions);
				           
				            //return nestedRows; = WORKS TOO ???
				            return bluePromise.resolve(nestedRows);

				          
			      	    }).catch(function(err) {
					      console.log(err);
					      return bluePromise.reject(err);
					    });
			
			});
		  
		}
	};
		
	

	module.exports = jobseekerDao;

}());
