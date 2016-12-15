(function() {
  'use strict';
  angular.module('TPMS')
    .factory('UserResource', UserResource)
    .config(UserRouter);

  UserResource.$inject = ['$resource'];
  UserRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

  function UserResource($resource) {
    return $resource('https://tpm-software.herokuapp.com/api/users/:id', {id: '@_id'}, { 'update': { method: 'PATCH'}})
  }

  function UserRouter($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state('allUsers', {
      url: '/users',
      templateUrl: 'js/resources/users/user-list.html',
      controller: 'UserListController',
      controllerAs: 'usersVm'
    })
    .state('newUser', {
      url: '/users/new',
      templateUrl: 'js/resources/users/user-new.html',
      controller: 'UserNewController',
      controllerAs: 'userNewVm'
    })
    .state('editUser', {
      url: '/users/edit/:id',
      templateUrl: 'js/resources/users/user-edit.html',
      controller: 'UserEditController',
      controllerAs: 'userEditVm'
    })
    .state('showUser', {
      url: '/users/show/:id',
      templateUrl: 'js/resources/users/user-show.html',
      controller: 'UserShowController',
      controllerAs: 'userShowVm'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/templates/login.html',
      controller: 'SignInController',
      controllerAs: 'logInVm'
    });
  }
}());
