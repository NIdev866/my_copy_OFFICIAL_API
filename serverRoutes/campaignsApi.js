(function(){

	'use strict'

	module.exports = function(app,express){
		var api = express.Router(),
			 campaignDao = require('../serverServices/campaignDao.js');

		/*
			============THIS API IS OPEN TO PUBLIC, NOT SECURED=================
		*/
		api.get('/all', (req,res)=>{
		    campaignDao.getAllCampaigns()
		    .then(
		    	rows => {
		    	 res.status(200).json(rows);
		    }).catch(
		        err => {
			      console.log(err);
			      res.status(500).json('SERVER ERROR: ' + err);
			    });
		});

		api.get('/positions', (req,res)=>{
		    campaignDao.getAllPositions()
		    .then(
		    	rows => {
		    	 res.status(200).json(rows);
		    }).catch(
		        err => {
			      console.log(err);
			      res.status(500).json('SERVER ERROR: ' + err);
			    });
		});
			
		api.get('/companies', (req,res)=>{
		    campaignDao.getRegisteredCompanies()
		    .then(
		    	rows => {
		    	 res.status(200).json(rows);
		    }).catch(
		        err => {
			      console.log(err);
			      res.status(500).json('SERVER ERROR: ' + err);
			    });
		});

	   return api;
	};
}());