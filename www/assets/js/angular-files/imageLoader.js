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

    });



    $scope.min = 50;
    $scope.max = 200;
    $scope.brightness = 100;
    $scope.contrast = 100;
    $scope.minHue = 0;
    $scope.maxHue = 360;
    $scope.hueRotate = 0;

    $scope.reset = function() {
      $scope.min = 50;
      $scope.max = 200;
      $scope.brightness = 100;
      $scope.contrast = 100;
      $scope.minHue = 0;
      $scope.maxHue = 360;
      $scope.hueRotate = 0;

      $(".iv-large-image").css("-webkit-filter", "none");
      $(".iv-large-image").css("-moz-filter", "none");

};

}]);