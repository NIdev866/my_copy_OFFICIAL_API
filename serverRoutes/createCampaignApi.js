(function(){
	'use strict'
	module.exports = function(app,express){
		 var api = express.Router(),
		 createCampaignDao = require('../serverServices/createCampaignDao.js');

		 api.get('/fetch-sectors', (req,res)=>{


		 	console.log('HEHEHEEHE')


		 	createCampaignDao.getAllJobSectors()
		    .then(
		    	rows => {
		    	 res.status(200).json(rows);
		    }).catch(
		        err => {
			      console.log(err);
			      res.status(500).json('SERVER ERROR: ' + err);
			    });







		 })
		 return api;

	}
}());