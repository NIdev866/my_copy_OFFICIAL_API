// 'use strict';
//
// var chai = require('chai'),
//     expect = chai.expect,
//     sinon = require('sinon');
// var Validator = require('../BDD/validator');
// var schema = require('../schemas/schemas').admin;
// var ajv = require('ajv');
// chai.use(require("sinon-chai"));
//
// var validatorDIC = require('./testDIC/validatorDIC');
//
// describe('Validator using ajv...',function(){
//
//   beforeEach(function(){
//     //i need mocked req.body.email obj
//     this.reqbody = {
//       email: 'vxv'
//     };
//     //yields from DI
//     validatorDIC.ajv.validate.withArgs(schema.email,this.reqbody).yields(null,true);
//     this.console = validatorDIC.console.log;//.yields(null,this.reqbody.email);
//
//
//     //i need schema singleton obj for validation conditions
//     //i need new Validator() to have it tested and inject dependancies
//     this.validator = new Validator(this.reqbody);
//     //i need stubbed ajv method 'validate'
//     //sinon.stub(ajv,'validate').withArgs(schema.email,this.reqbody).yields(null,true);
//     //this.stubbed = sinon.stub(this.validator,'validateEmail').returns(null,false);
//           //.withArgs(schema.email,this.reqbody.email)
//
//     //call the real function containing console.log()
//     this.validator.validateEmail();
//
//   });
//   it('should return false if req.body.email is 4 or less char long',function(){
//     expect(this.validator.validateEmail()).to.not.be.ok;
//   });
//   it('console should be called once and show email string inside .validateEmail()',
//     function(){
//       //this.validator.validateEmail();
//       expect(this.console).to.be.calledOnce;
//   });
// });
