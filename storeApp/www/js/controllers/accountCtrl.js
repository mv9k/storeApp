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
      var ref = new Firebase("https://storeappformatc.firebaseio.com");

      //User State Vars
      ac.isLoggedIn=false;
      ac.isCreatingAcc=false;
      ac.usedGoogle=false;

      //User Info Vars
      ac.email = "";
      ac.password = "";
      ac.name = "";
      ac.validatedEmail="";
      ac.googleProfileImg="";

      //Function variables
      ac.createAcc=createFireAccount;
      ac.logIn=logIntoFireAccount;
      ac.createScreen=createNewAccount;
      ac.googleLogin=logInWithGoogle;

      function applyToScope(func){
        $scope.$apply(function(){
          func();
        });
      }
      function createNewAccount(){
        $scope.$apply(function(){
          ac.isCreatingAcc=true;
        });
      }
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
            $("#err").html(error);
            if(/email/.test(error)){$("#emailBox").css("border", "solid red 1px")}
            else{$("#emailBox").css("border", "solid lightgrey 1px")}
            if(/password/.test(error)){$("#passBox").css("border", "solid red 1px")}
            else{$("#passBox").css("border", "solid lightgrey 1px")}
          } else {
            $scope.$apply(function(){
              ac.isLoggedIn=true;
              ac.validatedEmail = ac.email;
            });
            $("#passBox").css("border", "solid lightgrey 1px");
            $("#emailBox").css("border", "solid lightgrey 1px");
            console.log("Authenticated successfully with payload:", authData);
          }
        });
      }
      function logInWithGoogle(){
        ref.authWithOAuthPopup("google", function(error, authData) {
          console.log(authData.google);
          if (error) {
            console.log("Login Failed!", error);
          } else {
            $scope.$apply(function(){
              ac.isLoggedIn=true;
              ac.validatedEmail = authData.google.displayName;
              ac.googleProfileImg=authData.google.profileImageURL;
              ac.usedGoogle=true;
            });
          }
        });
      }
    }
}());
