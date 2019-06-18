superhero.controller("userController", [
  "$scope",
  "userService",
  "userFactory",
  function ($scope, userService, userFactory) {

    // Felhasználók
    $scope.users = [];
    $scope.ths = ['#', 'name', 'email', 'phone','actions'];
    $scope.newUser={};
    $scope.formError={};

    // Felhasználók lekérése.
    userService.getAll()
      .then(function (userData) {
        $scope.users = userData;
      }, function (err) {
        console.error("Error while getting user data", err);
      });
    // Egy felhasználó lekérése
    userFactory.getOne('5d08d3166554d02ad487f66d')
      .then(function(user){
      console.info('John Doe:',user);
    });

    // Adatok frissítése.
    $scope.updateRecord=function(row){
      userFactory.saveUser(row)
      .then(function(){
        alert("user saved!")
      })
    }
    // Adatsor törlése
    $scope.deleteUser=function(row){
      userFactory.deleteUser(row)
      .then(function(deleted){
        if(deleted.succes){
          var index= $scope.users.indexOf(row);
          $scope.users.splice(index,1);
        }
        else{
          alert("Error, not deleted"+row.name);
        }
      })
    };

    // Adatok ellenőrzése
    $scope.checkNewUser=function(row){
      $scope.formError={};
      var fields=["name","email","phone"]
      var returnValue=true;
      for(var k in fields)
        {
          if(row[fields[k]]=="" || angular.isUndefined(row[fields[k]])){
             $scope.formError[fields[k]]=true;
            returnValue=false;
             }
        }
      return returnValue;
    };

    // Új record beszúrása
    $scope.insertRecord=function(row){
      if($scope.checkNewUser(row))
          return;
      userFactory.insertUser(row)
      .then(function(newUser){

        $scope.users.push(newUser);
        $scope.newUser={};
      });
    };
  }
]);
