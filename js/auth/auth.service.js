(function () {
  'use strict';

  angular
    .module('TPMS')
    .factory("authService", authService);

  authService.$inject = ["$log", "tokenService", "$http"];

  function authService($log, token, $http) {
    $log.info("auth service loaded!");

    var current;

    var service = {
      logIn:      logIn,
      isLoggedIn: isLoggedIn,
      logOut:     logOut,
      currentUser: currentUser
    };
    return service;

    function currentUser() {
      if(isLoggedIn()) {
        return token.decode();
      }
    }

    function isLoggedIn() {
      return (token.retrieve() != null);
    }

    function logIn(data) {
      var promise = $http({
        method: 'POST',
        url:    'https://tpm-software.herokuapp.com/api/token',
        data:   data
      })
      .then(
        // if the request succeeded, then run this
        // handler, and pass on the decoded token.
        function(res) {
          token.store(res.data);
          return token.decode();
        }
        // since there is no error handler, pass
        // an error on to the next promise, without
        // calling the above success handler
        // , function(err) { null; }
      );
      return promise;
    }
    function logOut() {
      token.destroy();
    }
  }


})();
