/**
 * Created by gabed on 2/23/16.
 */
(function(){
  'use strict';

  angular.module('cartModule', [])
    .controller('cartCtrl', cartCtrl);
cartCtrl.$inject = ['cartService'];
  function cartCtrl(){
    var cc = this;
    cc.clicked = function() {
      console.log('yo');
      alert('yo');
    }
    }

})();
