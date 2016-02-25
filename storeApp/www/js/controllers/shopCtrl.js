/**
 * Created by kris on 2/24/16.
 */
(function(){
  'use strict';

  angular.module('ShopCtrl', [])
    .controller('shopCtrl', shopCont);

  shopCont.$inject = ["$scope", "Products", "$ionicLoading", "Favs", "cartService", "userService"];

  function shopCont($scope, Products, $ionicLoading, Favs, cartService, userService){
    var sc = this;
    var fs = Favs;
    var cs = cartService;
    var us = userService;

    sc.listProducts = {items:[]};
    sc.items = [];
    sc.searchText = 'bike';

    sc.addFav = addFavourite;
    sc.getProducts = getProducts;
    sc.addToCart = addToCart;
    sc.remFav = removeFavourite;

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

    function addFavourite(product) {
      fs.addFav(product);
    }

    function removeFavourite(product) {
      fs.remFav(product);
    }

    function addToCart(product) {
      cs.addToCart(product);
      console.log('added '+ product + ' to cart!');
    }

    function getAssignedProducts(){
      sc.listProducts = {items: []};
      sc.items = [];
      $ionicLoading.show();
      for(var i=0;i<us.keys.length;i++){
        Products.get(us.keys[i].key)
          .then(function(data){
            sc.listProducts += data.data;
            sc.items += data.data.items;
            if(i==us.keys.length-1){
              $ionicLoading.hide();
            }
          }, function(data){
            if(i==us.keys.length-1){
              $ionicLoading.hide();
            }
          });
      }
      console.log(sc.listProducts, sc.items);
    }
  }

}());
