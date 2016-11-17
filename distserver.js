(function(){
	'use strict';

	var express = require('express');
	var http = require('http');
	var bodyParser = require('body-parser');

	var morgan = require('morgan');
	var dbConnection = require('./dbConnection.js');
	var path = require('path');

	

		var app=express();
		var api = require('./api.js')(app, express);



		//dbConnection.dbConnection.getMysqlConnection();

		app.set('port', process.env.PORT || 3000);
		app.use(express.static(path.join(__dirname, '/dist')));
		
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(bodyParser.json());

		app.use(morgan('dev'));




		app.use('/api',api);
		 
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