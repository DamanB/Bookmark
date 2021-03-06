angular.module('myApp').controller('authCntrl', ['$rootScope', '$scope', '$timeout', 'UserService', 'OverlayService', function ($rootScope, $scope, $timeout, UserService, OverlayService) {
  
  //Form messages
  $scope.message = {
    loginErrorMsg: '',
    loginSuccessMsg: '',
    regErrorMsg: '',
    regSuccessMsg: ''
  };

  $scope.loginUser = function () {
    //Display overlay
    $rootScope.$emit('displayOverlay', OverlayService.msgLoginAttempting());
    //Gather form data
    var email = $scope.loginemail;
    var password = $scope.loginpassword;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        //Login success
        $rootScope.$emit('displayOverlay', OverlayService.msgLoginUserAccount());
        //Msg the form
        $timeout(function () {
          $scope.message.loginErrorMsg = '';
          $scope.message.loginSuccessMsg = 'Success!';
        }, 0);
        //Log the user in the service
        UserService.login(user);
        $rootScope.$emit('displayOverlay', OverlayService.msgLoginSuccess());

        
      })
      .catch((error) => {
        //Login fail
        $timeout(function () {
          var errorCode = error.code;
          $scope.message.loginSuccessMsg = '';
          var errorMessage = error.message;
          if (errorCode == 'auth/user-not-found' || errorCode == 'auth/wrong-password') {
            $scope.message.loginErrorMsg = "Credential mismatch!";
          }
          else if (errorCode == 'auth/invalid-email') {
            $scope.message.loginErrorMsg = "This email is not valid!";
          }
          else {
            $scope.message.loginErrorMsg = "Login unsuccessful!";
          }
        }, 0);
      });
    $rootScope.$emit('clearOverlay');
  };

  $scope.registerUser = function () {
    //Display overlay
    $rootScope.$emit('displayOverlay', OverlayService.msgRegisterAttempt());
    //Gather form data
    var email = $scope.regemail;
    var password = $scope.regpassword;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        //reg successfull
        $rootScope.$emit('displayOverlay', OverlayService.msgRegisterUserAccount());
        //let the form know
        $timeout(function () {
          $scope.message.regErrorMsg = '';
          $scope.message.regSuccessMsg = 'Success!';
        }, 0);
        //log the user in to the service
        UserService.login(user);
        $rootScope.$emit('displayOverlay', OverlayService.msgRegisterSuccess());
      })
      .catch((error) => {
        //reg failed
        var errorCode = error.code;
        var errorMessage = error.message;
        $timeout(function () {
          $scope.message.registertrationSuccessMsg = '';
          if (errorCode == 'auth/email-already-in-use') {
            $scope.message.regErrorMsg = "Email already in use!";
          }
          else if (errorCode == 'auth/invalid-email') {
            $scope.message.regErrorMsg = "This email is not valid!";
          }
          else {
            $scope.message.regErrorMsg = "Registration unsuccessful!";
          }
        }, 0);
      });
    $rootScope.$emit('clearOverlay');
  }
}]);