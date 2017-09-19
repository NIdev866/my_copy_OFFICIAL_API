(function(){
	'use strict'
	module.exports = function(app,express){
		 var api = express.Router(),
		 createCampaignDao = require('../serverServices/createCampaignDao.js');





		   app.get("/fetch-sectors", (req, res)=>{
		    let allJobSectorTitles = new Promise((resolve, reject)=>{
		      db.query(`SELECT sector_title FROM job_sectors`, function(err, allJobSectorTitles){
		        if(allJobSectorTitles){
		          resolve(allJobSectorTitles)
		        }
		      })
		    })
		    allJobSectorTitles.then((result)=>{
		      let mapped = result.map((element)=>{
		        return element.sector_title
		      })
		      res.send(mapped)
		    })
		  })

		  app.post("/fetch-job-titles", (req, res)=>{
		    let selectedJobSector = req.body
		    res.send(selectedJobSector)
		    let allJobTitles = new Promise((resolve, reject)=>{
		      db.query(`SELECT sector_title FROM job_sectors`, function(err, allJobTitles){
		        if(allJobTitles){
		          resolve(allJobTitles)
		        }
		      })
		    })
		    allJobSectorTitles.then((result)=>{
		      let mapped = result.map((element)=>{
		        return element.sector_title
		      })
		      res.send(mapped)
		    })
		  })








		  api.get("/get-nested-job-sectors", (req, res)=>{
		  	createCampaignDao.getNestedJobSectors()
		  	.then(
		    	rows => {
		    	 res.status(200).json({jobSectors: rows});
		    }).catch(
		        err => {
			      console.log(err);
			      res.status(500).json('SERVER ERROR: ' + err);
			    });
		 })








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