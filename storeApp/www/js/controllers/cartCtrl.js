/**
 * Created by gabed on 2/23/16.
 */
(function(){
  'use strict';

  angular.module('cartModule', [])
    .controller('cartCtrl', cartCtrl);
cartCtrl.$inject = ['cartService'];
  function cartCtrl(cartService){
    var cc = this;
    cc.buyIt = cartService.buyIt;
    cc.cartProducts = cartService.cartProducts;
    cc.deleteCurrent = cartService.deleteCurrent;
    cc.allCartItems = cartService.allCartItems;
    }

})();
