var mainPhoneGapApp = angular.module('mainPhoneGapApp', []);

mainPhoneGapApp.controller('registrationController', function ($scope, $http) {


    $scope.submitTest = function() {

    $http.get('http://chironapi.chironx.cloud/api/chironx/status').success(function(res){

        console.log(res);
    })
    }
});
