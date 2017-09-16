// db.js
var Db = function() {
   this.driver = require('mysql');
};
Db.prototype.query = function(sql, callback) {
   this.driver... callback (err, results);
}
module.exports = Db;

// someModel.js
var SomeModel = function (params) {
   this.db = params.db
}
SomeModel.prototype.getSomeTable (params) {
   var sql = ....
   this.db.query (sql, function ( err, res ) {...}
}
module.exports = SomeModel;

// in app.js
var db = new (require('./db.js'))();
var someModel = new SomeModel ({db:db});
var otherModel = new OtherModel ({db:db})

// in app.test.js
var db = {
   query: function (sql, callback) { ... callback ({...}) }
}
var someModel = new SomeModel ({db:db});



//===========================================
var mock;
mock = sinon.mock(require('mysql'))
mock.expects('query').with(queryString, queryParams).yields(null, rows);
//queryString, queryParams are the input you expect. rows is the output you expect.

//When your class under test now require mysql and calls the query method,
// it will be intercepted and verified by sinon.
//In your test expectation section you should have:
mock.verify()
//and in your teardown you should restore mysql back to normal functionality:
mock.restore()
