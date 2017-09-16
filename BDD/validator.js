

var _ = require('underscore')._;
var dic = require('./globalDIC.js');

module.exports = function(dic){

  var ajv = dic.Ajv;

  var Validator = function(args){

    args || (args={});
    _.extend(this,args);


    this.validateEmail = function(){
      console.log(this.email);
      if(this.email === null){
        return true;
      }else{
        return false;
      }
    }
  };

  return Validator;

}
