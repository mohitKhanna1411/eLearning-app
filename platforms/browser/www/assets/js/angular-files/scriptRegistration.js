var mainPhoneGapApp = angular.module('mainPhoneGapApp', []);

mainPhoneGapApp.controller('registrationController', function ($scope, $http) {


    $scope.submitRegistrationForm = function() {
        var registerData = {
            "email" : $scope.email ,
            "hashedPassword" : $scope.password ,
            "Login_ID" : $scope.username,
            "isAdmin" : false ,
            "Doc_Name" : $scope.username ,
            "Doc_Institution" : $scope.institution ,
            "Doc_Experience"  : $scope.experience,
            "Doc_Expert" : $scope.expert,
            "isActive" :false ,
            "Registration_Date" : Date.now()
        }
    $http.post('http://192.168.1.7:8000/api/chironx/authenticate/register', registerData).success(function(res){

        console.log(res);

    })
    }
});
