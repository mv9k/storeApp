/**
 * Created by wesleyyoung1 on 2/17/16.
 */
(function(){
  'use strict';

  angular.module('newAccountCtrl', [])
    .controller('newAcctCtrl', newAcctCont);

  newAcctCont.$inject = ["$scope"];
  function newAcctCont($scope){
    var na = this;
    var ref = new Firebase("https://storeappformatc.firebaseio.com");
    na.email = "";
    na.password="";

    na.createAccount=createFireAccount;

    function createFireAccount(){
      console.log(na.email);
      ref.createUser({
        email    : na.email,
        password : na.password
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
        }
      });
    }
  }
}());
