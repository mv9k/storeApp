/**
 * Created by kris on 2/23/16.
 */
(function(){
  'use strict';

  angular.module('favCtrl', [])
    .controller('favCtrl', favCont);

  favCont.$inject = ["Favs", "cartService"];

  function favCont(Favs, cartService){
    var fc = this;
    var fs = Favs;

    fc.addFav = addFav;
    fc.remFav = delFav;
    fc.addToCart = sendToCart;
    fc.favsArray = fs.favsArray;

    function addFav(product) {
      fs.addFav(product);
      console.log(product + ' saved!')
    }

    function sendToCart(product) {
      cartService.addToCart(product);
    }

    function delFav(product) {
      fs.remFav(product);
    }

  }

}());
