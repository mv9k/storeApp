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
      var invalid = false;
      for(var i=0;i<=fs.favsArray.length;i++) {
        if(fs.favsArray[i]==product) {
          invalid=true;
        }
        console.log(fs.favsArray[i]);
      }
      if(!invalid){
        fs.favsArray.push(product);
      }
    }

    function remFav(product) {

      var index = fs.favsArray.indexOf(product);

      fs.favsArray.splice(index, 1);

    }

  });
