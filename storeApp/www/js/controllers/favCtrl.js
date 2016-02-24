/**
 * Created by kris on 2/23/16.
 */
(function(){
  'use strict';

  angular.module('favCtrl', [])
    .controller('favCtrl', favCont);

  favCont.$inject = ["favService"];

  function favCont(favService){
    var fc = this;

    fc.addFav = addFav;


    function addFav(product) {
      fs.addFav(product);
      console.log(product + ' saved!')
    }

  }

}());
