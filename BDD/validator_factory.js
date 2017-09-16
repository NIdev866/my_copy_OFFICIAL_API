'use strict';

module.exports = function(diContainer, reqbody){
  var self = {},
  message = reqbody.message,
  schema = diContainer.schema,
  email = reqbody.email,
  ajv = diContainer.ajv;

  self.isValidEmail = function(){
    if(email.length > 5){
      return ajv.validate(schema, email);//make it so it returns true
    }else if(email.length <= 5){
      console.log(message);
      return ajv.validate(schema, email);
    }
    else throw new Error('Email is not provided!');
  }

  return self;
}
