var mainPhoneGapApp = angular.module('mainPhoneGapApp', ['ngStorage']);

mainPhoneGapApp.controller('loginController',['$scope','$http','$window','$localStorage', function ($scope, $http,$window,$localStorage) {


    $scope.loginDoctor = function() {
        var loginData={"email" : $scope.email, "hashedPassword" : $scope.password};
        // $http.post('http://192.168.1.7:8000/api/chironx/authenticate/login',loginData).success(function(res){
        $http.post('http://ec2-13-126-237-55.ap-south-1.compute.amazonaws.com:3000/api/chironx/authenticate/login',loginData).success(function(res){
            console.log(res);
            //$scope.token=res.token;
            $localStorage.token=res.token;
            console.log($localStorage.token);
            // localStorage.setItem("token",res.token);
            $window.location.href="mainDashboard.html";
        })
    }
    $scope.forgotPassword = function() {
        console.log("hi");
        var data={"email" : $scope.email};
        $http.post('http://ec2-13-126-237-55.ap-south-1.compute.amazonaws.com:3000/api/chironx/authenticate/forgetpwd',data).success(function(res){

            console.log(res);
            // $window.location.href="index.html";
        })
    }

}]);

// mainPhoneGapApp.controller('forgetPassController',['$scope','$http', function ($scope, $http) {

//     $scope.forgotPassword = function() {
//         var data={"email" : $scope.email};
//         $http.post('http://192.168.1.7:8000/api/chironx/authenticate/forgetpwd',data).success(function(res){

//             console.log(res);
//             // $window.location.href="index.html";
//         })
//     }

// }]);
