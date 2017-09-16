'use strict';

const diContainer = require('./dependancies/diContainer');

function init(){
  diContainer.register('dbName','resume-pro');
  diContainer.register('tokenSecret','fsdfsfsfgefd543r45');
  diContainer.factory('db',require('./lib/db'));//example
}
init();
//than use get inside ur code
const db = diContainer.get('db');

//and use db.methods
db.connect();
