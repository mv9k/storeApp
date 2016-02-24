/**
 * Created by kris on 2/23/16.
 */
angular.module('favServices', [])

  .service('Favs', function () {
    var fs = this;

    fs.favsArray = [];

    fs.addFav = addFav;
    fs.remFav = remFav;

    function addFav(product) {
      fs.favsArray.push(product);
      console.log(fs.favsArray);
    }

    function remFav(product) {
      //fs.favsArray.splice(product);
      //TODO: Backwards for loop for removing product
      console.log(fs.favsArray)
    }

  });
