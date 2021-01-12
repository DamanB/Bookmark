angular.module('myApp').controller('overlayCntrl',['$rootScope', '$scope', '$timeout',  function ($rootScope, $scope, $timeout) {
    $scope.overlay = {
        overlayMessage: ''
    }
    $scope.showOverlay = false;
    $rootScope.$on('displayOverlay', function(e,data){
        $timeout(function(){
            $scope.overlay.overlayMessage = data;
            $scope.showOverlay = true;
        },0);
    });

    $rootScope.$on('clearOverlay', function(e,data){
        $timeout(function(){
            $scope.overlay.overlayMessage = "";
            $scope.showOverlay = false;
        },50);
    });

}]);
