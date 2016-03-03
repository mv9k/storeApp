/**
 * Created by gabed on 2/23/16.
 */
(function(){
  'use strict';

  angular.module('cartModule', [])
    .controller('cartCtrl', cartCtrl);
cartCtrl.$inject = ['cartService','$scope','$timeout'];
  function cartCtrl(cartService,$scope,$timeout){
    var cc = this;
    cc.buyIt = cartService.buyIt;
    cc.cartProducts = cartService.cartProducts;
    cc.deleteCurrent = cartService.deleteCurrent;
    cc.actualPrice = cartService.totalPrice;
    cc.endGameTotal = cartService.endGameTotal;
<<<<<<< HEAD
<<<<<<< HEAD
=======
    cc.remove = removeFromCart;
>>>>>>> 06bc404f73aaa32aad504ecb97122c1b54826bc3
=======
    cc.remove = removeFromCart;
    
>>>>>>> 686fa4e1efb3ce37962a5481db89c626893fdc46
    $scope.$on("$ionicView.beforeEnter",function(){
      $timeout(function(){
        cc.actualPrice = cartService.totalPrice();
        //console.log('actual price is'+cc.actualPrice);
      });
    });

    function removeFromCart(currIndex) {
      cc.deleteCurrent(currIndex);
      cc.actualPrice = cartService.totalPrice();
    }

    }

})();
