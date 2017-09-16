'use strict';

var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon');
chai.use(require("sinon-chai"));

var Validator = require('../BDD/validator_factory');



var diContainer = require('./testDIC/validatorDIC');

describe('Validator using ajv...',function(){
  context('Email length validation tests',function(){
    var validator;
    beforeEach(function(){
      this.reqbody = {
        email: 'fdg',
        message: 'hi'
      };
      validator = new Validator(diContainer ,this.reqbody);//here u can inject stuff

      sinon.spy(console, 'log');
      validator.isValidEmail();
      diContainer.ajv.validate
                 .withArgs(diContainer.schema, this.reqbody.email).returns(false);
    });

    afterEach(function() {
      console.log.restore();
    });

    it('should return false if req.body.email is 5 or less char long',function(){
      expect(validator.isValidEmail(this.reqbody.email)).to.be.false;
    });
    it('should call console.log("hi") inside .isValidEmail(email)', function(){
      expect(console.log.calledWith('hi')).to.be.true;
    });
    it('should call ajv.validate(schema,email) that return false for email <= 5 chars', function(){
      expect(diContainer.ajv.validate(diContainer.schema, this.reqbody.email))
                                                                  .to.be.false;
    });
  })

  context('testing errors...', function(){
    var validator;
    beforeEach(function(){
      this.reqbody = {
        email: undefined,//or null, BUT wont work for empty string ''
        message: 'hi'
      };
      validator = new Validator(diContainer, this.reqbody);
    });
    it('should throw an error if Email is not provided', function(){
      expect(function(){
        validator.isValidEmail();
      }).to.throw();
    });

  });


});
