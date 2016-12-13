(function() {
  'use strict';
  angular.module("TPMS")
    .controller("SignInController", SignInController);

  SignInController.$inject = ["$log", "authService", "UserResource", "$state", "$window"];

  function SignInController($log, authService, UserResource, $state, $window) {
    var vm = this;

    //BINDINGS
    vm.logIn = {
      email: "",
      password: ""
    };
    vm.submitLogIn = submitLogIn;
    vm.conflict = false;

    function submitLogIn() {
      authService
        .logIn(vm.logIn)
        .then(
          function(decodedToken) {
            $log.info('Logged in!', decodedToken);

            $state.go('allUsers');
          },
          //on Error
          function(err) {
            $log.info('Error:', err);
          }
        );
    }
    $log.info('SignInController loaded!');
  }
}());
