/**
 * Created by kris on 2/23/16.
 */
(function(){
  'use strict';

  angular.module('favCtrl', [])
    .controller('favCtrl', favCont);

  favCont.$inject = ["Favs"];

  function favCont(Favs){
    var fc = this;
    var fs = Favs;

    fc.addFav = addFav;
    fc.favsArray = fs.favsArray;

    function addFav(product) {
      fs.addFav(product);
      console.log(product + ' saved!')
    }

  }

}());
