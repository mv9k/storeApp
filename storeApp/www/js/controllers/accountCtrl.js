/**
 * Created by wesleyyoung1 on 2/16/16.
 */
(function(){
  'use strict';

  angular.module('AcctCtrl', [])
    .controller('AccountCtrl', acctCont);

    acctCont.$inject = ["$scope"];
    function acctCont($scope){
      var ac = this;
      ac.isLoggedIn=false;
      ac.email = "";
      ac.password="";
      var ref = new Firebase("https://storeappformatc.firebaseio.com");
      ac.createAcc=createFireAccount;
      ac.logIn=logIntoFireAccount;
      ac.validatedEmail="";

      function createFireAccount(){
        console.log(ac.email);
        ref.createUser({
          email    : ac.email,
          password : ac.password
        }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
          }
        });
      }
      function logIntoFireAccount(){
        ref.authWithPassword({
          email    : ac.email,
          password : ac.password
        }, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            $scope.$apply(function(){
              ac.isLoggedIn=true;
              ac.validatedEmail = ac.email;
            });
            console.log("Authenticated successfully with payload:", authData);
          }
        });
      }
    }
}());
