/**
 * Created by kris on 2/23/16.
 */
angular.module('favServices', [])

  .service('Favs', favService);

favService.$inject=["userService"];

function favService(userService){
  var fs = this;

  var ref = new Firebase("https://storeappformatc.firebaseio.com");
  var usersRef = ref.child("users");

  fs.favsArray = [];

  fs.addFav = addFav;
  fs.remFav = remFav;
  fs.clearFavs=clearFavs;

  function addFav(product) {
    var invalid = false;
    for(var i=0;i<=fs.favsArray.length;i++) {
      if(fs.favsArray[i]==product) {
        invalid=true;
      }
      console.log(fs.favsArray[i]);
    }
    if(!invalid){
      fs.favsArray.push(product);
      userService.storeFavs(product.name);
      console.log(userService.getFavs());
    }
  }
  function clearFavs(){
    //fs.favsArray=[];
  }

  function remFav(product) {
    var index = fs.favsArray.indexOf(product);
    fs.favsArray.splice(index, 1);
  }

}
