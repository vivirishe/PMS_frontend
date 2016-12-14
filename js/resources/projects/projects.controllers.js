(function() {
  'use strict';
  angular.module('TPMS')
    .controller('ProjectListController', ProjectListController)
    .controller('ProjectNewController', ProjectNewController)
    .controller('ProjectShowController', ProjectShowController)
    .controller('ProjectEditController', ProjectEditController)

  ProjectListController.$inject = ['ProjectResource', 'UserResource'];
  ProjectNewController.$inject = ['ProjectResource', '$state', 'UserResource'];
  ProjectShowController.$inject = ['ProjectResource', '$stateParams'];
  ProjectEditController.$inject = ['ProjectResource', '$state', '$stateParams'];

  function ProjectListController(ProjectResource, UserResource) {
    var vm = this;
    vm.projects = [];
    vm.deleteProject = deleteProject;

    ProjectResource.query().$promise.then(function(data) {
      vm.projects = data;
    });
    UserResource.query().$promise.then( function(data) {
      vm.users = data;
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

  function ProjectNewController(ProjectResource, $state, UserResource) {
    var vm = this;
    vm.newProject = {};
    vm.addProject = addProject;
    vm.users = [];

    UserResource.query().$promise.then( function(data) {
      vm.users = data;
    });

    function addProject() {
      ProjectResource.save(vm.newProject).$promise.then(function(jsonProject) {
        vm.newProject = {};
        $state.go('allProjects')
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
    vm.addNewTask = addNewTask;

    ProjectResource.get({id: $stateParams.id}).$promise.then(function(jsonProject) {
      vm.project = jsonProject;
    });

    function addNewTask() {
      vm.project.tasks.push({description: "", completed: false});
    }

    function updateProject() {
      ProjectResource.update(vm.project).$promise.then(function(editedProject) {
        vm.project = editedProject;
        $state.go('allProjects')
      })
    }
  }
}());
