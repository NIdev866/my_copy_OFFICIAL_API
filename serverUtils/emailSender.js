(function(){

	'use strict'

	var log = require('./logger.js');
	var logger = log.child({SOURCE_FILE: 'emailSender.js'});
	const loggly = require('./loggly.js');
	
	var sg = require("sendgrid")("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");
	var helper = require('sendgrid').mail;


	var emailSender = {
		emailrequest: (email_id, jobseeker_id, full_name) => {

		
			var from_email = new helper.Email('donotreply@bitrec.co.uk');
			var to_email = new helper.Email(email_id);
			var subject = "Welcome from bitREC. Don't respond to this email";
			var content = new helper.Content('text/html', '<html></html>');
			var personalization = new helper.Personalization();
			var substitutionName = new helper.Substitution("%name%", full_name);
			var substitutionUrl = new helper.Substitution('%password_url%', 
				'http://localhost:4200/myprofile/createpassword?id=' + jobseeker_id +'&email='+ email_id);

			var email = new helper.Email(email_id, full_name)
	  		personalization.addTo(email);
			personalization.addSubstitution(substitutionName);
	  		personalization.addSubstitution(substitutionUrl);

			var mail = new helper.Mail(
				from_email, 
				subject, 
				to_email, 
				content
			);
			
			
	  		

	  		mail.addPersonalization(personalization);
			mail.setTemplateId("a3d85500-948f-4813-85ee-a8e4f51a514d");
			
			
			var request = sg.emptyRequest({
			  method: 'POST',
			  path: '/v3/mail/send',
			  body: mail.toJSON(),
			});

			return request;
		},
		send: request => {
			 sg.API(request)
				.then(response => {
				    //console.log(response.statusCode);
				    //console.log(response.body);
				    //console.log(response.headers);
				    loggly.log({"NEW EMAIL SENT": response.body},['SENDGRID-EMAILSENT-OK']);
				    logger.info({"NEW EMAIL SENT": response.body});
				  })
				  .catch(error => {
				    //error is an instance of SendGridError 
				    //The full response is attached to error.response 
				     //console.log(error.response);
				     logger.error({err: error.response});	
					 loggly.log({err: error.response},['SENDGRID-EMAILSENT-FAILED']);
				 });

			 

		}
	}

	module.exports = emailSender;
}());