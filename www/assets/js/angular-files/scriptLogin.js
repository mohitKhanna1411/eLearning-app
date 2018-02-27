var mainPhoneGapApp = angular.module('mainPhoneGapApp', []);

mainPhoneGapApp.controller('loginController', function ($scope, $http) {


    $scope.loginDoctor = function() {
        var loginData={"email" : $scope.email, "hashedPassword" : $scope.password};
        $http.post('http://ec2-13-126-237-55.ap-south-1.compute.amazonaws.com:3000/api/chironx/authenticate/login',loginData).success(function(res){

            console.log(res);
        })
    }

});
