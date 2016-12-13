(function() {
  'use strict';
  angular.module('TPMS')
    .controller('UserListController', UserListController)
    .controller('UserNewController', UserNewController)
    .controller('UserShowController', UserShowController)
    .controller('UserEditController', UserEditController);

  UserListController.$inject = ['UserResource', '$window', 'authService'];
  UserNewController.$inject = ['UserResource', '$state', 'authService'];
  UserShowController.$inject = ['UserResource', '$stateParams'];
  UserEditController.$inject = ['UserResource', '$state', '$stateParams'];

  function UserListController(UserResource, $window, authService) {
    var vm = this;
    vm.users = [];
    vm.deleteUser = deleteUser;
    vm.currentUser = authService.currentUser();

    UserResource.query().$promise.then( function(data) {
      vm.users = data;
    });

    function deleteUser(userToDelete) {
      UserResource.delete({id:userToDelete._id}).$promise.then(function(response) {
        if(response.message) {
          console.log(response.message);
          vm.users = vm.users.filter(function(user) {
            return user != userToDelete;
          });
        };
      });
    };
  };

  function UserNewController(UserResource, $state, authService) {
    var vm = this;
    vm.newUser = {};
    vm.addUser = addUser;

    function addUser() {
      UserResource.save(vm.newUser).$promise.then(function() {
        authService.logIn(vm.newUser)
      }).then(function(jsonUser) {
        vm.newUser = {};
        $state.go('allUsers')
      });
    };
  };

  function UserShowController(UserResource, $stateParams) {
    var vm = this;
    vm.user = {};

    UserResource.get({id: $stateParams.id}).$promise.then(function(jsonUser) {
      vm.user = jsonUser;
    });
  };

  function UserEditController(UserResource, $state, $stateParams) {
    var vm = this;
    vm.user = {};
    vm.updateUser = updateUser;

    UserResource.get({id: $stateParams.id}).$promise.then(function(jsonUser) {
      vm.user = jsonUser;
    });

    function updateUser() {
      UserResource.update(vm.user).$promise.then(function(editedUser) {
        vm.user = editedUser;
        $state.go('allUsers');
      });
    };
  };
}());
