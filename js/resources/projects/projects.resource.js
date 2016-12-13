(function() {
  'use strict';
  angular.module('TPMS')
    .factory('ProjectResource', ProjectResource)
    .config(ProjectRouter);

  ProjectResource.$inject = ['$resource'];
  ProjectRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

  function ProjectResource($resource) {
    return $resource('http://localhost:3000/projects/api/projects/:id', {id: '@_id'}, { 'update': { method: 'PATCH'}})
  }

  function ProjectRouter($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('allProjects', {
      url: '/projects',
      templateUrl: 'js/resources/projects/projects-list.html',
      controller:
      controllerAs:
    })
  }
}());
