var mainPhoneGapApp = angular.module('mainPhoneGapApp', []);

mainPhoneGapApp.controller('registrationController', function ($scope, $http) {


    $scope.submitRegistrationForm = function() {
        var registerData = {
            email : $scope.email ,
            hashedPassword : $scope.
        }
    $http.post('http://ec2-13-126-237-55.ap-south-1.compute.amazonaws.com:3000/api/chironx/authenticate/register').success(function(res){

        console.log(res);
    })
    }
});
