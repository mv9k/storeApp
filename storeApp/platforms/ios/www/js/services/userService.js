/**
 * Created by wesleyyoung1 on 2/25/16.
 */
angular.module('user.service', [])

.service('userService', userService);

userService.$inject=[];

function userService(){
  var us=this;

  us.keys=[];
  us.blockedKeys=[];
  us.isLoggedIn=false;

  //function vars
  us.storeKeys=storeKeys;
  us.getKeys=getKeys;
  us.changeLogInState=changeLogInState;
  us.storeBlockedKeys=storeBlockedKeys;
  us.getBlockedKeys=getBlockedKeys;

  function storeKeys(keys){
    us.keys=keys;
  }
  function getKeys(){
    return us.keys;
  }
  function storeBlockedKeys(keys){
    us.blockedKeys=keys;
  }
  function getBlockedKeys(){
    return us.blockedKeys;
  }
  function changeLogInState(state){
    us.isLoggedIn=state;
  }
}
