/**
 * Created by kris on 2/18/16.
 */
angular.module('productServices', [])

.service('Products', function ($http) {
  var ps = this;

  ps.showData = function() {
    console.log('test 2');
    ps.url = 'http://api.walmartlabs.com/v1/search?query='+'computer'+'&format=json&apiKey=pdschxhqsn9s2sut5q95mctz&callback=JSON_CALLBACK';

    $http.jsonp(ps.url)
      .success(function (data){
        ps.walData = data;
        console.log(ps.walData);
      })
  };

  return {
    all: function() {
      ps.showData();
      return ps.walData;
    }
  };

});








