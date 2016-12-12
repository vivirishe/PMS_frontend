(function() {
  'use strict';
  angular.module("TPMS")
    .controller("SignInController", SignInController);

  SignInController.$inject = ["$log", "authService", "userService", "$state"];

  function SignInController($log, authService, userService, $state) {
    var vm = this;

    //BINDINGS
    vm.signUp = {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: ""
    };
    vm.submitSignUp = submitSignUp;
    vm.logIn = {
      email: "",
      password: ""
    };
    vm.submitLogIn = submitLogIn;
    vm.conflict = false;

    function submitSignUp() {
      
    }
  }
}());
