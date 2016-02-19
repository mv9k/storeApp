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

      //Firebase URL
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
      ac.profileImg="";
      ac.thisUser = {};
      ac.categories = [];
      ac.newCategory = "";

      //Function variables
      ac.createAcc=createFireAccount;
      ac.logIn=logIntoFireAccount;
      ac.googleLogin=logInWithGoogle;
      ac.signOut = logOut;
      ac.addCategory = addCat;

      //Create a new account with FireBase
      function createFireAccount(){
        console.log(ac.email);
        ref.createUser({
          email    : ac.email,
          password : ac.password
        }, function(error, userData) {
          if (error) {
            console.log("Error creating user:", error);
            $("#err").html(error);
            if(/email/.test(error)){$("#emailBox").css("border", "solid red 1px")}
            else{$("#emailBox").css("border", "solid lightgrey 1px")}
            if(/password/.test(error)){$("#passBox").css("border", "solid red 1px")}
            else{$("#passBox").css("border", "solid lightgrey 1px")}
          } else {
            console.log("Successfully created user account with uid:", userData.uid);
            logIntoFireAccount();
          }
        });
      }
      //Log users into their FireBase account
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
              ac.thisUser = authData;
              ac.profileImg=authData.password.profileImageURL;
            });
            $("#passBox").css("border", "solid lightgrey 1px");
            $("#emailBox").css("border", "solid lightgrey 1px");
            console.log("Authenticated successfully with payload:", authData);
          }
        });
      }
      //Allow users to log in using Google
      function logInWithGoogle(){
        ref.authWithOAuthPopup("google", function(error, authData) {
          console.log(authData.google);
          if (error) {
            console.log("Login Failed!", error);
          } else {
            $scope.$apply(function(){
              ac.isLoggedIn=true;
              ac.validatedEmail = authData.google.displayName;
              ac.profileImg=authData.google.profileImageURL;
              ac.thisUser=authData.google;
              ac.usedGoogle=true;
            });
          }
        });
      }
      //Log users out of their account
      function logOut(){
        ac.email = "";
        ac.password = "";
        ac.name = "";
        ac.validatedEmail="";
        ac.profileImg="";
        ac.categories=[];
        ac.isLoggedIn=false;
        ac.isCreatingAcc=false;
        ac.usedGoogle=false;
      }
      //Add Categories into the user categories array
      function addCat(){
        ac.categories.push(ac.newCategory);
        ac.newCategory="";
      }
    }
}());
