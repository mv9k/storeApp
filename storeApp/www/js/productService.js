/**
 * Created by kris on 2/18/16.
 */
angular.module('productServices', [])

.service('products', function ($scope, $http) {
  var ps = this;
  ps.showData = function() {
    console.log('test');
    ps.url = 'http://api.walmartlabs.com/v1/search?query='+ps.theProduct+'&format=json&apiKey=pdschxhqsn9s2sut5q95mctz&callback=JSON_CALLBACK';

    $http.jsonp(ps.url)
      .success(function (data){
        ps.walData = data;
        console.log(ps.walData);
      })
  }
});








