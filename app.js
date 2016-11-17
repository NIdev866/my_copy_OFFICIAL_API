
(function(){
	'use strict';
	/*
		=========TO DO => 1.make cors() better, 2. make morgan switch from dev->prod
					3. setup morgan to skip some logging
	*/

	const express = require('express'),
			 http = require('http'),
			 bodyParser = require('body-parser'),
			 cors = require('cors'),
			 morgan = require('morgan'),

			 path = require('path');

	module.exports.create = function (port, publicDir, uploadsDir) {

		var app=express();
		var debug = require('debug')(app);
		app.options('*', cors());
		app.use(cors());

		app.use(morgan('combined', { 
			/*skip: function(req, res) { return res.statusCode < 400 },*/
		 stream: {
		 	write: function(message,encoding){
		 		loggly.log(message, ['BITREC-HTTP']);
		 		
		 	} 	
		 }
		}));


		var mobileApi = require('./mobile/mobileApi.js')(app, express);
		var loginApi = require('./serverRoutes/loginApi.js')(app,express);
		var jobseekerApi = require('./serverRoutes/jobseekerApi.js')(app,express);
		var adminApi = require('./serverRoutes/adminApi.js')(app,express);
		var clientApi = require('./serverRoutes/clientApi.js')(app,express);
		var workerApi = require('./serverRoutes/workerApi.js')(app,express);
		var campaignsApi = require('./serverRoutes/campaignsApi.js')(app,express);

		app.use(express.static(publicDir));
		app.use(express.static(uploadsDir));

		app.use(bodyParser.urlencoded({extended: true}));
		app.use(bodyParser.json());


		//ROUTES DEFINED
		app.use('/resumeproapi',mobileApi);
		app.use('/login', loginApi);
		app.use('/jobseeker',jobseekerApi);
		app.use('/admin',adminApi);
		app.use('/worker',workerApi);
		app.use('/client',clientApi);
		app.use('/campaigns', campaignsApi);
		 

		return app;
	};

}());
