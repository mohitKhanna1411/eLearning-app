var mainPhoneGapApp = angular.module('mainPhoneGapApp', ['ngStorage','angular-growl']);

mainPhoneGapApp.controller('loginController',['$scope','$http','$window','$localStorage','growl', function ($scope, $http,$window,$localStorage,growl) {

    $scope.loginDoctor = function() {
        var loginData={"email" : $scope.email, "hashedPassword" : $scope.password};
        // $http.post('http://192.168.1.7:8000/api/chironx/authenticate/login',loginData).success(function(res){
        $http.post('http://ec2-13-126-237-55.ap-south-1.compute.amazonaws.com:3000/api/chironx/authenticate/login',loginData).success(function(res){
            console.log(res);

            if(res.message === "You are logged in successfully"){
                growl.success(res.message, {title: 'Success!'});
                $localStorage.token=res.token;
                $window.location.href="mainDashboard.html";
            }
            else {
                growl.error(res.message, {title: 'Error!'});
            }
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





    $scope.logout = function() {
        $localStorage.token='';
        $window.location.href="index.html";

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
