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
    var cartProducts = cartService.cartProducts;
    cc.clicked = function() {
      console.log('yo');
      alert("you've reached the controller");
    };
    cc.plzClick = function(){
      cc.plzClick = cartService.addToCart();
    }
    }

})();
