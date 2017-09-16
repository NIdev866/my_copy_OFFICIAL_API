'use strict';
var Tax = require('./tax');
module.exports = (items) => {

  var CartSummary = {};
  CartSummary.getSubtotal = () => {
    if(items.length){
      return items.reduce(function(subtotal,item){
        return subtotal += (item.qty * item.price);
      },0);
    }else
    return 0;
  }
  CartSummary.getTax = (state, cb) => {
    //will use external module 'tax.js' for this job
    Tax.calculate(CartSummary.getSubtotal(), state, function(taxInfo){
      cb(taxInfo.amount);
    })
  }
  return CartSummary;
}
// function CartSummary(items){
//   this._items = items;
//
//   this.getSubtotal = function(items){
//     if(this.items.length){
//       return this._items.reduce(function(subtotal,item){
//         return subtotal += (item.qty * item.price);
//       },0);
//     }
//     return 0;
//   }
// }
// CartSummary.prototype.getSubtotal= function(){
//   if(this._items.length){
//     return this._items.reduce(function(subtotal,item){
//       return subtotal += (item.qty * item.price)
//     },0);
//   }
//   return 0;
// }
//module.exports = CartSummary;
