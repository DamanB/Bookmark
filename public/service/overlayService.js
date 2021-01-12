angular.module('myApp').factory('OverlayService', function() {

    return {
        msgRegisterAttempt: function(){
            return "Attempting to create an account...";
        },
        msgRegisterUserAccount: function(){
            return "Creating account...";
        },
        msgRegisterSuccess: function(){
            return "Account registration successfull, logging you in!...";
        },
        msgLoginAttempting: function(){
            return "Attempting login...";
        },
        msgLoginUserAccount: function(){
            return "Fetching your account...";
        },
        msgLoginSuccess: function(){
            return "Login Successfull!...";
        },
        msgUserData: function(){
            return "Opening your bookmarks!...";
        }
    }

});
