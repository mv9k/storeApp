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

      var index = fs.favsArray.indexOf(product);

      fs.favsArray.splice(index, 1);

      console.log(fs.favsArray)
    }

  });
