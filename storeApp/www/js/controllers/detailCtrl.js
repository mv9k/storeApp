/**
 * Created by kris on 2/25/16.
 */

angular.module('detailCtrl', [])
  .controller('detailCtrl', detailCtrl);

detailCtrl.$inject = ["$stateParams", "detailService"];

function detailCtrl($stateParams, detailService) {

  var dc = this;
  var ds = detailService;

  dc.product = ds.product;

}
