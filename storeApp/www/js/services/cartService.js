/**
 * Created by gabed on 2/23/16.
 */
/**
 * Created by kris on 2/18/16.
 */
angular.module('cartService', [])
  .service('cartService',cartService);
function cartService(){
  var cs = this;
  cs.cartProducts = [];
  cs.addToCart = addToCart;
  cs.plzClick = function(){
    alert("you've reached the service")
  };
  //function addToCart(product){
  //  alert('did it work')
  //}
  function addToCart(product){
    cs.cartProducts.push(product);
    console.log(product);
    alert(cs.cartProducts);
  }
}









