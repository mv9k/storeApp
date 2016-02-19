/**
 * Created by kris on 2/18/16.
 */
angular.module('product.services', [])

.factory('Entry', function($resource) {
  return $resource('/api/entries/:id');
});
