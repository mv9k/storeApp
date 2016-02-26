/**
 * Created by wesleyyoung1 on 2/25/16.
 */
angular.module('user.service', [])

.service('userService', userService);

userService.$inject=[];

function userService(){
  var us=this;

  us.keys=[];
  us.isLoggedIn=false;

  //function vars
  us.storeKeys=storeKeys;
  us.getKeys=getKeys;
  us.changeLogInState=changeLogInState;

  function storeKeys(keys){
    us.keys=keys;
  }
  function changeLogInState(state){
    us.isLoggedIn=state;
  }
  function getKeys(){
    return us.keys;
  }
}
