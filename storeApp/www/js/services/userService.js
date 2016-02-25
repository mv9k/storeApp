/**
 * Created by wesleyyoung1 on 2/25/16.
 */
angular.module('user.service', [])

.service('userService', userService);

userService.$inject=[];

function userService(){
  var us=this;

  us.keys=[];

  //function vars
  us.storeKeys=storeKeys;
  us.getKeys=getKeys;

  function storeKeys(keys){
    us.keys=keys;
  }
  function getKeys(){
    return us.keys;
  }
}
