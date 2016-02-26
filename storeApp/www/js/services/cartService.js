/**
 * Created by gabed on 2/23/16.
 */
angular.module('cartService', [])

  .service('cartService',cartService);

function cartService(){

  var cs = this;

  cs.cartProducts = [];
  cs.deleteCurrent = deleteCurrent;
  cs.addToCart = addToCart;
  cs.plzClick = plzClick;


  function plzClick() {
    alert("you've reached the service");
  }
  cs.buyIt = buyIt;

  function buyIt(product){
    alert(product.name);
    //window.open('http://c.affil.walmart.com/t/api02?l=http%3A%2F%2Faffil.walmart.com%2Fcart%2FaddToCart%3Fitems%3D' + product.itemId + '%7C1%26affp1%3DM1u8aZZoZbep0p3P7hVn_sT4Ry97xPSOvnILkAKRCH8%26affilsrc%3Dapi%26veh%3Daff%26wmlspartner%3Dreadonlyapi')

  }
  //function addToCart(product){
  //  alert('did it work')
  //}
  function addToCart(product){
    cs.cartProducts.push(product);
    console.log(product);


  }
  function deleteCurrent(currIndex){
    cs.cartProducts.splice(currIndex,1)
  }

}
