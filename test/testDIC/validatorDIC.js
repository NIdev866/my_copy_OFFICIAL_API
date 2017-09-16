'use strict';
var sinon = require('sinon');
module.exports = {
    ajv: {
      validate: sinon.stub()
    },
    schema: require('../../schemas/schemas').admin
  }
