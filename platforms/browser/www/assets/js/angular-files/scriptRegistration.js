var mainPhoneGapApp = angular.module('mainPhoneGapApp', ['angular-growl']);

mainPhoneGapApp.controller('registrationController',['$scope', '$http', 'growl', '$compile', '$window', function ($scope, $http, growl, $compile, $window) {


    $scope.submitRegistrationForm = function() {
        var registerData = {
            "email" : $scope.email ,
            "hashedPassword" : $scope.password ,
            "isAdmin" : false ,
            "Doc_Name" : $scope.firstname+" "+$scope.lastname ,
            "Doc_Institution" : $scope.institution ,
            "Doc_Experience"  : $scope.experience,
            "Doc_Expert" : $scope.expert,
            "isActive" :false ,
            "Registration_Date" : Date.now()
        }
    $http.post('http://ec2-13-126-237-55.ap-south-1.compute.amazonaws.com:3000/api/chironx/authenticate/register', registerData).success(function(res){
        console.log(res);

        if(res.message === "you are registered successfully")
        {
            $window.location.href = "index.html";
        }
        else
        {
            growl.error(res.message, { title: 'Failure' });
        }

    })
    }


}]);
