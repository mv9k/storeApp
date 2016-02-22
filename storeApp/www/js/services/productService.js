/**
 * Created by kris on 2/18/16.
 */
angular.module('productServices', [])

.factory('Products', function ($http) {
  var ps = this;
  ps.url = 'http://api.walmartlabs.com/v1/search?format=json&apiKey=pdschxhqsn9s2sut5q95mctz&callback=JSON_CALLBACK&query=';
  //ps.url = 'http://api.walmartlabs.com/v1/search?query='+searchParam+'&format=json&apiKey=pdschxhqsn9s2sut5q95mctz&callback=JSON_CALLBACK';

  ps.showData = function(searchParam) {


    $http.jsonp(ps.url)
      .success(function (data){
        ps.walData = data;
      })
  };

  return {
    all: function(searchParam) {
      ps.showData(searchParam);
      return ps.walData;
    },
    get: function(searchParam) {
      return $http.jsonp(ps.url + searchParam);
    }
  };

});








