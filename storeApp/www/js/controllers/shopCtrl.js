/**
 * Created by kris on 2/24/16.
 */
(function(){
  'use strict';

  angular.module('ShopCtrl', [])
    .controller('shopCtrl', shopCont);

  shopCont.$inject = ["$scope", "Products", "$ionicLoading", "Favs", "cartService"];

  function shopCont($scope, Products, $ionicLoading, Favs, cartService){
    var sc = this;
    var fs = Favs;
    var cs = cartService;


    sc.listProducts = {items:[]};
    sc.items = [];
    sc.addFav = addFav;
    sc.searchText = 'bike';


    sc.getProducts = getProducts;
    cs.addToCart = addToCart;

    function getProducts() {
      console.log('searched --> ' + sc.searchText);
      console.log(Products.all(sc.searchText));

      $ionicLoading.show();
      Products.get(sc.searchText)
        .then(getSuccess, getFail);
    }

    function getSuccess(data) {
      $ionicLoading.hide();
      console.log('success');
      sc.listProducts = data.data;
      sc.items = data.data.items;
      console.log(data.data.items);
    }

    function getFail(data) {
      $ionicLoading.hide();
      console.log('error');
    }

    function addFav(product) {
      console.log(product + ' transferring to fav service!');
      fs.addFav(product);
    }

    function addToCart(product) {
      cs.addToCart(product);
    }

  }

}());
