(function(){
	'use strict';

	var express = require('express');
	var cors = require('cors');
	var http = require('http');
	var bodyParser = require('body-parser');
	

	var morgan = require('morgan');
	

	var dbConnection = require('./dbConnection.js');
	var path = require('path');
	var loggly = require('./serverUtils/loggly');

		var app = express();
		var debug = require('debug')(app);
		app.options('*', cors());
		app.use(cors());
	
		app.use(morgan('dev'));//LOGGER
		//var accessLogStream = fs.createWriteStream(__dirname + '/morgan.log', {flags: 'a'})
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

		


		//dbConnection.dbConnection.getMysqlConnection();

		app.set('port', process.env.PORT || 3000);
		app.use(express.static(path.join(__dirname, '/public')));

		
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
		 
		/*
		app.get('*', function(req,res){
		    res.sendFile(__dirname + '/public/index.html');
		});*/

		
		app.listen(app.get('port'), function(err){
		    if(err){
		        console.log(err);
		    }else {	
		        console.log('Express server listening on port ' + app.get('port'));
		    }

		});

		
	

}());