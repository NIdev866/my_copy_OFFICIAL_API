(function(){

	'use strict'

	const dbConnection = require('../dbConnection.js'),	
		  nestedMYSQL = require('../nested-mysql.js'),
		  bluePromise = require("bluebird");


	var campaignDao = {

		getNestedJobSectors : ()=>{

			var sql = 'SELECT * FROM job_sectors \
						LEFT JOIN job_titles \
						ON job_titles.sector_id = job_sectors.sector_id';
			//Key relations, Define each table's primary and foreign keys
		    var nestingOptions = [
		        { tableName : 'job_sectors', pkey: 'sector_id'},
		        { tableName : 'job_titles', pkey: 'job_title_id', fkeys:[{table:'job_sectors',col:'sector_id'}]}
		        
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
	}

	module.exports = campaignDao;

}());
