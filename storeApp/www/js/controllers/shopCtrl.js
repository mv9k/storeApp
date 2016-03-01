/**
 * Created by kris on 2/24/16.
 */
(function(){
  'use strict';

  angular.module('ShopCtrl', [])
    .controller('shopCtrl', shopCont);

  shopCont.$inject = ["$scope", "$state", "Products", "$ionicLoading", "Favs", "cartService", "userService", "detailService"];

  function shopCont($scope, $state, Products, $ionicLoading, Favs, cartService, userService, detailService){
    var sc = this;
    var fs = Favs;
    var cs = cartService;
    var us = userService;
    var ds = detailService;
    console.log("Rest Controller");
    sc.isActive = false;
    sc.listProducts = {items:[]};
    sc.items = [];
    sc.searchText = 'bike';

    sc.activeButton = activateButton;
    sc.addFav = addFavourite;
    sc.getProducts = getProducts;
    sc.addToCart = addToCart;
    sc.remFav = removeFav;
    sc.getAssignedProducts=getAssignedProducts;
    sc.remFav = removeFav;
    sc.getDetail = getDetail;


    function getDetail(product) {
       ds.storeProduct(product);
    }

    function activateButton() {
      sc.isActive = !sc.isActive;
    }


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

    function removeFav(product) {
      fs.remFav(product);
    }

    function addToCart(product) {
      cs.addToCart(product);
      console.log('added '+ product + ' to cart!');
    }

    function getAssignedProducts(){
      var tempItems=[];
      sc.items=[];
      var count = 0;
      function repeat(){
        var blocked=us.getBlockedKeys();
        Products.get(us.keys[count].key)
          .then(function(data){
            if(data.data.numItems!==0){
              for(var i=0;i<data.data.items.length;i++){
                var isBlocked=false;
                for(var j=0;j<blocked.length;j++){
                  var a = new RegExp(blocked[j].key, "g");
                  if(data.data.items[i]!==undefined){
                    if(a.test(data.data.items[i].name||a.test(data.data.items[i].longDescription))){
                      isBlocked=true;
                    }
                  }
                }
                if(!isBlocked){
                  tempItems.push(data.data.items[i]);
                }
              }
            }
            if(count!==(us.keys.length)){
              repeat();
            }
            else{
              $ionicLoading.hide();
            }
          }, function(err){
              console.log("Failure!", err);
              if(count!==(us.keys.length)){
                repeat();
              }
              else{
                $ionicLoading.hide();
              }
          });
        count++;
        sc.items=tempItems;
      }
      if(us.getLogInState()){
        $ionicLoading.show();
        repeat();
      }else{
        alert("Please Sign In To Use This Feature");
      }
    }
    if(us.getLogInState()){
      getAssignedProducts();
    }

  }

}());
