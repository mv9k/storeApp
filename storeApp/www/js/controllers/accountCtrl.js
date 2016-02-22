/**
 * Created by wesleyyoung1 on 2/16/16.
 */
(function(){
  'use strict';

  angular.module('AcctCtrl', [])
    .controller('AccountCtrl', acctCont);

  acctCont.$inject = ["$scope", "$ionicPopup"];
  function acctCont($scope){
    var ac = this;

    //Firebase URL
    var ref = new Firebase("https://storeappformatc.firebaseio.com");

    //User State Vars
    ac.isLoggedIn=false;
    ac.isCreatingAcc=false;
    ac.usedGoogle=false;
    ac.showCat=true;
    ac.showBlockedCat=false;
    ac.emptyCat=true;

    //User Info Vars
    ac.email = "";
    ac.password = "";
    ac.name = "";
    ac.validatedEmail="";
    ac.profileImg="";
    ac.thisUser = {};
    ac.newCategory = "";
    ac.newBlockedCategory = "";
    //User lists
    ac.categories = [];
    ac.blockedCategories = [];
    ac.favorites = [];
    ac.cart = [];

    //Function variables
    ac.createAcc=createFireAccount;
    ac.logIn=logIntoFireAccount;
    ac.googleLogin=logInWithGoogle;
    ac.signOut = logOut;
    ac.addCategory = addCat;
    ac.addBlockedCategory=addBlockedCat;
    ac.blockCategory=blockCat;
    ac.removeCategory= removeCat;
    ac.toggleCat=showCategories;
    ac.toggleBlockedCat=showBlockedCategories;

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
      ac.showCat = true;
      ac.emptyCat = true;
    }
    //Add Categories into the user categories array
    function addCat(){
      var invalid = false;
      for(var i=0;i<ac.categories.length;i++){
        if(ac.newCategory.toUpperCase()==ac.categories[i].key.toUpperCase()){
          invalid=true;
        }
      }
      if(ac.newCategory==""||ac.newCategory.length>15){
        invalid=true;
      }
      if(!invalid){
        ac.categories.push({key: ac.newCategory, id: ac.categories.length});
        ac.newCategory="";
        $("#newCategoryInput").css("border", "solid lightgrey 1px")
      }
      else{
        $("#newCategoryInput").css("border", "solid red 1px")
      }
      if(ac.categories.length>0){
        ac.emptyCat=false;
      }
    }
    function removeCat(id){
      for(var i=0;i<ac.categories.length;i++){if(id==ac.categories[i].id){ac.categories.splice(i, 1)}}
    }
    function blockCat(id){
      for(var i=0;i<ac.categories.length;i++){if(id==ac.categories[i].id){ac.blockedCategories.push(ac.categories[i]); ac.categories.splice(i, 1)}}
    }
    function addBlockedCat(){
      var invalid = false;
      for(var i=0;i<ac.blockedCategories.length;i++){
        if(ac.newBlockedCategory.toUpperCase()==ac.blockedCategories[i].key.toUpperCase()){
          invalid=true;
        }
      }
      if(ac.newBlockedCategory==""||ac.newBlockedCategory.length>15){
        invalid=true;
      }
      if(!invalid){
        ac.blockedCategories.push({key: ac.newBlockedCategory, id: ac.blockedCategories.length});
        ac.newBlockedCategory="";
        $("#newBlockedCategoryInput").css("border", "solid lightgrey 1px")
      }
      else{
        $("#newBlockedCategoryInput").css("border", "solid red 1px")
      }
      if(ac.categories.length>0){
        ac.emptyCat=false;
      }
    }
    function addCart(){

    }
    function removeCart(){

    }
    function addFav(){

    }
    function removeFav(){

    }
    function showCategories(){
      ac.showCat?ac.showCat=false:ac.showCat=true;
      ac.showCat?$("#toggleCat").html("Hide Categories"):$("#toggleCat").html("Show Categories");
    }
    function showBlockedCategories(){
      ac.showBlockedCat?ac.showBlockedCat=false:ac.showBlockedCat=true;
      ac.showBlockedCat?$("#toggleBlockedCat").html("Hide Categories"):$("#toggleBlockedCat").html("Show Categories");
    }
  }
}());
