'use strict';

var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon');
chai.use(require("sinon-chai"));

var CartSummary = require('../BDD/cart');
var Tax = require('../BDD/tax');

describe('CartSummary', function(){
  var cartSummary;
  beforeEach(function(){
    cartSummary = CartSummary(
      [
        {
          id:1,
          qty:4,
          price:50
        },
        {
          id:2,
          qty:2,
          price:30
        },
        {
          id:3,
          qty:1,
          price:40
        }
      ]
    );

    sinon.stub(Tax, 'calculate', function(subtotal, state, cb){
      setTimeout(function(){
        cb({
          amount: 30
        });
      },50);
    })
  });


  afterEach(function(){
    Tax.calculate.restore();
  });

  it('getSubtotal() should return 0 if no items are passed in', function(){
    cartSummary = CartSummary([]);
    expect(cartSummary.getSubtotal()).to.equal(0);
  })
  it('getSubtotal() should return the sum of the price * qty for all items', function(){
    expect(cartSummary.getSubtotal()).to.equal(300);
  })
  it('getTax() should execute the callback func with the tax amount', function(done){
    cartSummary.getTax('NY',function(taxAmount){
      expect(taxAmount).to.equal(30);
      expect(Tax.calculate.getCall(0).args[0]).to.equal(300);
      expect(Tax.calculate.getCall(0).args[1]).to.equal('NY');
      done();
    })
  })
})
