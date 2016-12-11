(function() {
  'use strict';
  angular.module('TPMS')
    .controller('UserListController', UserListController)
    .controller('UserNewController', UserNewController)
    .controller('UserShowController', UserShowController)
    .controller('UserEditController', UserEditController);

  UserListController.$inject = ['UserResource'];
  UserNewController.$inject = ['UserResource', '$state'];
  UserShowController.$inject = ['UserResource', '$stateParams'];
  UserEditController.$inject = ['UserResource', '$state', '$stateParams'];

  function UserListController(UserResource) {
    var vm = this;
    vm.users = [];
    vam.deleteUser = deleteUser;

    UserResource.query().$promise.then(function(data) {
      vm.users = data;
    });

    function deleteUser(userToDelete) {
      UserResource.delete({id:userToDelete._id}).$promise.then(function(response) {
        if(response.message) {
          console.log(response.message);
          vm.users = vm.users.filter(function(user) {
            return user != userToDelete;
          });
        }
      });
    }
  }

  function UserNewController(UserResource, $state) {
    var vm = this;
    vm.newUser = {};
    vm.addUser = addUser;

    function addUser() {
      UserResource.save(vm.newUser).$promise.then(function(jsonUser) {
        vm.newUser = {};
        $state.go('usersList')
      });
    }
  }

  function UserShowController(UserResource, $stateParams) {
    var vm = this;
    vm.user = {};

    UserResource.get({id: $stateParams.id}).$promise.then(function(jsonUser) {
      vm.user = jsonUser;
    });
    function updateUser() {
      UserResource.update(vm.user).$promise.then(function(editedUser) {
        vm.user = editedUser;
        $state.go('usersList')
      })
    }
  }
}());
