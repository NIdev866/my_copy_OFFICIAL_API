// 'use strict';
// var chai = require('chai'),
//     expect = chai.expect,
//     sinon = require('sinon'),
//     bluePromise = require('bluebird');
//
// chai.use(require("sinon-chai"));
// chai.use(require("chai-as-promised"));
//
// var adminDao = require('../serverServices/adminDAO_bdd');
//
// var injectedServices = {
//   mysql: sinon.stub()
// }
//
//
// describe('For Admin CRUD operations and auth',function(){
//   beforeEach(function(){
//
//   });
//   context('Given that there is no Admin with such a credentials in db', function(){
//     beforeEach(function(){
//
//     });
//     it('should be no Admin with xyz credentials in db');
//     it('should throw error if there is already one Admin with same credentials');
//     it('should ONLY allow to add new Admin credentials to db');
//     it('should validate input credentials data with schema validator');
//     it('should send verification email to new Admin with a link');
//     it('should hash the password before storing it in db');
//     it('should generate auth token for this new Admin if verified');
//     it('should save that token in db along with Admin data');
//   });
//   context('Given that Admin exist in db', function(){
//     it('should compare Admin credentials,token using jwt on login event and allow access');
//     it('should allow Admin to update email');
//     it('should allow Admin to update password');
//     it('should hash the new password before saving it in db');
//
//   });
// });
