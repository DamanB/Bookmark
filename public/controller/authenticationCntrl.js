angular.module('myApp', []).controller('authCntrl', function ($scope) {
  $scope.loginUser = function () {
    var email = $scope.loginemail;
    var password = $scope.loginpassword;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        $scope.loginErrorMsg = '';
        $scope.loginSuccessMsg = 'Success!';
        $scope.$apply();
        
      })
      .catch((error) => {
        var errorCode = error.code;
        $scope.loginSuccessMsg = '';
        var errorMessage = error.message;
        if (errorCode == 'auth/user-not-found' || errorCode == 'auth/wrong-password')
        {
          $scope.loginErrorMsg = "Credential mismatch!";
        }
        else if(errorCode == 'auth/invalid-email')
        {
          $scope.loginErrorMsg = "This email is not valid!";
        }
        else
        {
          $scope.loginErrorMsg = "Login unsuccessful!";
        }
        $scope.$apply();
      });
  };

  $scope.registerUser = function () {
    var email = $scope.regemail;
    var password = $scope.regpassword;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        $scope.regErrorMsg = '';
        $scope.regSuccessMsg = 'Success!';
        $scope.$apply();
        // Signed in 
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        $scope.registertrationSuccessMsg = '';
        if (errorCode == 'auth/email-already-in-use')
        {
          $scope.regErrorMsg = "Email already in use!";
        }
        else if(errorCode == 'auth/invalid-email')
        {
          $scope.regErrorMsg = "This email is not valid!";
        }
        else
        {
          $scope.regErrorMsg = "Registration unsuccessful!";
        }
        $scope.$apply();
      });
  }
});