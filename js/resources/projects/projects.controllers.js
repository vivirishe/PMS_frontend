(function() {
  'use strict';
  angular.module('TPMS')
    .controller('ProjectListController', ProjectListController)
    .controller('ProjectNewController', ProjectNewController)
    .controller('ProjectShowController', ProjectShowController)
    .controller('ProjectEditController', ProjectEditController)

  ProjectListController.$inject = ['ProjectResource', 'UserResource'];
  ProjectNewController.$inject = ['ProjectResource', '$state', 'UserResource'];
  ProjectShowController.$inject = ['ProjectResource', '$stateParams', 'UserResource', '$http'];
  ProjectEditController.$inject = ['ProjectResource', '$state', '$stateParams', 'UserResource'];

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
      ProjectResource.delete({id:projectToDelete._id}).$promise.then(function(response) {
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
    vm.newProject = {tasks: []};
    vm.addProject = addProject;
    vm.users = [];
    vm.addNewTask = addNewTask;

    UserResource.query().$promise.then( function(data) {
      vm.users = data;
    });

    function addNewTask() {
      vm.newProject.tasks.push({description: "", completed: false});
      console.log(vm.newProject)
    }

    function addProject() {
      ProjectResource.save(vm.newProject).$promise.then(function(jsonProject) {
        vm.newProject = {};
        $state.go('allProjects')
      });
    };
  };

  function ProjectShowController(ProjectResource, $stateParams, UserResource, $http) {
    var vm = this;
    vm.project = {};
    vm.users = [];
    vm.deleteTask = deleteTask;

    ProjectResource.get({id: $stateParams.id}).$promise.then(function(jsonProject) {
      console.log(jsonProject)
      vm.project = jsonProject;
    });

    UserResource.query().$promise.then( function(data) {
      vm.users = data;
    });

    function deleteTask(taskToDelete) {
      console.log('delete task?')
      $http.delete('http://localhost:3000/api/projects/'+ $stateParams.id + '/task/' + taskToDelete._id).then(function(response) {
        if(response.data.message) {
          vm.project.tasks = vm.project.tasks.filter(function(task) {
            return task != taskToDelete;
          })
        }
      });
    }
  };


  function ProjectEditController(ProjectResource, $state, $stateParams, UserResource) {
    var vm = this;
    vm.project = {};
    vm.updateProject = updateProject;
    vm.addNewTask = addNewTask;
    vm.users = [];

    ProjectResource.get({id: $stateParams.id}).$promise.then(function(jsonProject) {
      vm.project = jsonProject;
    });
    UserResource.query().$promise.then( function(data) {
      vm.users = data;
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
