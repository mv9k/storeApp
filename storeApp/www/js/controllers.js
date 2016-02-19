angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

    .controller('theirItems' ,function ($scope,$http) {
var ti = this;
      ti.showData = function(){
        console.log('yo');
        ti.url = 'http://api.walmartlabs.com/v1/search?query='+ti.theItem+'&format=json&apiKey=pdschxhqsn9s2sut5q95mctz&callback=JSON_CALLBACK';

        $http.jsonp(ti.url)
            .success(function (data){
              ti.walData = data;
              console.log(ti.walData);
            })
      }
    })

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

