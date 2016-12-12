(function() {
  'use strict';
  angular.module('TPMS')
    .factory('UserResource', UserResource)
    .config(UserRouter);

  UserResource.$inject = ['$resource'];
  UserRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

  function UserResource($resource) {
    return $resource('http://localhost:3000/api/users/:id', {id: '@_id'}, { 'update': { method: 'PATCH'}})
  }

  function UserRouter($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state('allUsers', {
      url: '/users',
      templateUrl: 'js/resources/users/user-show.html',
      controller: 'UserListController',
      controllerAs: 'usersVm'
    })
    .state('newUser', {
      url: '/users/new',
      templateUrl: 'js/resources/users/user-new.html',
      controller: 'UserNewController',
      controllerAs: 'userNewVm'
    })
  }
}());
