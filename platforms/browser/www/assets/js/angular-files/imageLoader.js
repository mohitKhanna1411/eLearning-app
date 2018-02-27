var mainPhoneGapApp = angular.module('mainPhoneGapApp', ['ngStorage']);
mainPhoneGapApp.controller('imageLoaderController',['$scope','$http','$localStorage', function ($scope, $http,$localStorage) {
    var config ={
        headers:{
            "Authorization":"Bearer "+$localStorage.token
        }
    };
    console.log($localStorage.token);
    $http.get('http://ec2-13-126-237-55.ap-south-1.compute.amazonaws.com:3000/api/chironx/view/image',config).success(function(res){

        console.log(res);
        $scope.image_src=res.presignedUrl;

    })


}]);