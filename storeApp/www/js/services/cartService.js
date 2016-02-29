/**
 * Created by gabed on 2/23/16.
 */
angular.module('cartService', [])

  .service('cartService',cartService);

function cartService($http) {
  var cs = this;

  cs.cartProducts = [];
  cs.deleteCurrent = deleteCurrent;
  cs.addToCart = addToCart;
    cs.buyIt = buyIt;
  cs.buyIt = buyIt;
  cs.allCartItems = [];
  cs.cartItemIds = [];
    function buyIt() {
      //window.open('http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D' + product.itemId + '%7C1%26affp1%3DM1u8aZZoZbep0p3P7hVn_sT4Ry97xPSOvnILkAKRCH8%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi')
     cs.productLink = '';

      for(var i = 0; i<cs.cartItemIds.length; i++){
        console.log(cs.cartItemIds.length);
        console.log(cs.cartItemIds);
        alert(cs.cartItemIds.length);
        //alert('http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D' + cs.cartItemIds[i]+ '%7C1%26affp1%3DM1u8aZZoZbep0p3P7hVn_sT4Ry97xPSOvnILkAKRCH8%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi')
        $http.get("http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D" + cs.cartItemIds[i] + "%7C1%26affp1%3DM1u8aZZoZbep0p3P7hVn_sT4Ry97xPSOvnILkAKRCH8%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi", {});//.then(successCallback, errorCallback);
        //if(i == cs.cartItemIds.length){
        //  window.open("http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D" + cs.cartItemIds[i] + "%7C1%26affp1%3DM1u8aZZoZbep0p3P7hVn_sT4Ry97xPSOvnILkAKRCH8%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi");
        //  //window.open("http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D" + cs.cartItemIds[i] + "%7C1%26affp1%3DM1u8aZZoZbep0p3P7hVn_sT4Ry97xPSOvnILkAKRCH8%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi", '_blank', 'location=yes');
        //}
      }
    }
  //function openWindow(url) {
  //  // make sure you have this: cordova plugin add cordova-plugin-inappbrowser
  //  window.open(url, '_blank', 'location=yes');
  //  return false;
  //}
    function addToCart(product) {
      var productLink = 'http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D' + product.itemId + '%7C1%26affp1%3DM1u8aZZoZbep0p3P7hVn_sT4Ry97xPSOvnILkAKRCH8%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi';
      console.log(product);
      cs.cartProducts.push(product);
      cs.allCartItems.push(productLink);
      cs.cartItemIds.push(product.itemId);

    function deleteCurrent(currIndex) {
      cs.cartProducts.splice(currIndex, 1)
    }
  }
