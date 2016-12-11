(function() {
  'use strict';
  angular.module('TPMS')
    .factory('UserResource', UserResource);

  UserResource.$inject = ['$resource'];

  function UserResource($resource) {
    return $resource('http://localhost:3000/api/users/:id', {id: '@_id'}, { 'update': { method: 'PATCH'}})
  }
}());
