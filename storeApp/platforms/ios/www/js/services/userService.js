/**
 * Created by wesleyyoung1 on 2/25/16.
 */
angular.module('user.service', [])

.service('userService', userService);

userService.$inject=[];

function userService(){
  var us=this;

  var ref = new Firebase("https://storeappformatc.firebaseio.com");
  var usersRef = ref.child("users");

  us.keys=[];
  us.blockedKeys=[];
  us.isLoggedIn=false;
  us.favs=[];
  us.usedGoogle=false;

  //function vars
  us.thisUser={};
  us.storeKeys=storeKeys;
  us.getKeys=getKeys;
  us.changeLogInState=changeLogInState;
  us.storeBlockedKeys=storeBlockedKeys;
  us.getBlockedKeys=getBlockedKeys;
  us.getLogInState=getLogInState;
  us.storeUser=storeUser;
  us.getUser=getUser;
  us.getFavs=getFavs;
  us.storeFavs=storeFavs;

  function storeKeys(keys){
    console.log("stored the key!" + keys);
    us.keys=keys;
  }
  function getKeys(){
    return us.keys;
  }
  function storeBlockedKeys(keys){
    us.blockedKeys=keys;
    console.log(us.blockedKeys);
  }
  function getBlockedKeys(){
    return us.blockedKeys;
  }
  function storeFavs(fav){
    us.favs.push(fav);
    updateFireBase();
  }
  function getFavs(){
    var favs=[];
    ref.on("value", function(keys){
      if(keys.val().users[us.thisUser.uid]!==undefined){
        favs=keys.val().users[us.thisUser.uid].favs;
        console.log("Firebase says the favs for this account are: ", keys.val().users[us.thisUser.uid]);
      }else{
      }
    }, function(errorObject){
      console.log("The read failed: " + errorObject.code);
    });
    return favs;
  }
  function changeLogInState(state, google){
    us.isLoggedIn=state;
    us.usedGoogle=google;
  }
  function getLogInState(){
    return us.isLoggedIn;
  }
  function storeUser(user){
    us.thisUser=user;
  }
  function getUser(){
    return us.thisUser;
  }

  function updateFireBase(){
    var fireBaseObj={};
    for(var i=0;i<us.blockedKeys.length;i++){
      us.blockedKeys[i].id=i;
      delete us.blockedKeys[i].$$hashKey
    }
    for(var i=0;i<us.keys.length;i++){
      us.keys[i].id=i;
      delete us.keys[i].$$hashKey
    }
    us.usedGoogle?fireBaseObj[us.thisUser.id]={keywords: us.keys, blockedKeywords: us.blockedKeys, favs: us.favs}:fireBaseObj[us.thisUser.uid]={keywords: us.keys, blockedKeywords: us.blockedKeys, favs: us.favs};
    usersRef.update(fireBaseObj);
  }
}
