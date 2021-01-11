angular.module('myApp').factory('UserService', function() {
    var currentUser = {}; 
    var userLoggedIn;

    return {
        login: function(user){
            currentUser.email = user.user.email;
            currentUser.uid = user.user.uid; 
            userLoggedIn = true;
        },
        currentUser: function(){
            return currentUser;
        },
        logout: function(){
            currentUser = {};
            userLoggedIn = false;
        },
        userLoggedIn: function() {
            return userLoggedIn;
        }
    };

});