/**
 * Created by kris on 2/23/16.
 */
angular.module('favServices', [])

  .service('Favs', function () {
    var fs = this;
    var favsArray = [];

    fs.addFav = addFav;

    function addFav(product) {
      favsArray.push(product);
      console.log(favsArray);
    }

  });
