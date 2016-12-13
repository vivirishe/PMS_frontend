(function() {
  'use strict';
  angular.module('TPMS')
    .controller('ProjectListController', ProjectListController)
    .controller('ProjectNewController', ProjectNewController)
    .controller('ProjectShowController', ProjectShowController)
    .controller('ProjectEditController', ProjectEditController)

  ProjectListController.$inject = ['ProjectResource'];
  ProjectNewController.$inject = ['ProjectResource', '$state'];
  ProjectShowController.$inject = ['ProjectResource', '$stateParams'];
  ProjectEditController.$inject = ['ProjectResource', '$state', '$stateParams'];

  function ProjectListController(ProjectResource) {
    var vm = this;
    vm.projects = [];
    vm.deleteProject = deleteProject;

    ProjectResource.query().$promise.then(function(data) {
      vm.projects = data;
    });

    function deleteProject(projectToDelete) {
      ProjectResource.delete({id:projectToDelete._id}).promise.then(function(response) {
        if(response.message) {
          console.log(response.message);
          vm.projects = vm.projects.filter(function(project) {
            return project != projectToDelete;
          });
        };
      });
    ;}
  };

  function ProjectNewController(ProjectResource, $state) {
    var vm = this;
    vm.newProject = {};
    vm.addProject = addProject;

    function addProject() {
      ProjectResource.save(vm.newProject).$promise.then(function(jsonProject) {
        vm.newProject = {};
        $state.go('projectsList')
      });
    };
  };

  function ProjectShowController(ProjectResource, $stateParams) {
    var vm = this;
    vm.project = {};

    ProjectResource.get({id: $stateParams.id}).promise.then(function(jsonProject) {
      vm.project = jsonProject;
    });
  };

  function ProjectEditController(ProjectResource, $state, $stateParams) {
    var vm = this;
    vm.project = {};
    vm.updateProject = updateProject;

    ProjectResource.get({id: $stateParams.id}).promise.then(function(jsonProject) {
      vm.project = jsonProject;
    });

    function updateProject() {
      ProjectResource.update(vm.project).$promise.then(function(editedProject) {
        vm.project = editedProject;
        $state.go('projectsList')
      })
    }
  }
}());
