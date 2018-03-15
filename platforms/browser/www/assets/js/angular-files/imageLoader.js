var mainPhoneGapApp = angular.module('mainPhoneGapApp', ['ngStorage']);
mainPhoneGapApp.controller('imageLoaderController', ['$scope', '$http', '$localStorage', function ($scope, $http, $localStorage) {
    var config = {
        headers: {
            "Authorization": "Bearer " + $localStorage.token
        }
    };
    console.log($localStorage.token);
    $http.get('http://ec2-13-126-237-55.ap-south-1.compute.amazonaws.com:3000/api/chironx/view/image', config).success(function (res) {

        console.log(res);
        $scope.image_src = res.presignedUrl;

    })



    $scope.min = 50;
    $scope.max = 200;
    $scope.brightness = 100;
    $scope.contrast = 100;
    $scope.minHue = 0;
    $scope.maxHue = 360;
    $scope.hueRotate = 0;

    $scope.disabledStage_1 = false;
    $scope.prevDisabled = true;
    $scope.nextDisabled = true;
    $scope.counter = 0;
    $scope.maxReached = 0;

    $scope.reset = function () {
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

    $scope.nextRandomImage = function () {

        $http.get('http://ec2-13-126-237-55.ap-south-1.compute.amazonaws.com:3000/api/chironx/status').success(function (res) {
            console.log(res);
            console.log("Pressed No");

        })
    }

    $scope.quality = '';
    $scope.setValue = function (value) {
        console.log("Value - " + value);
        if (value === 'goodquality') {
            
            $scope.quality = 'good';

            // prev and next button enable/disable
            $scope.disabledStage_1 = true;
            $scope.prevDisabled = false;

            // Setting prev and next counters
            $scope.counter += 1;
            $scope.maxReached += 1;

            console.log("counter - " + $scope.counter);
            console.log("Max - " + $scope.maxReached);
        }
        if (value === 'qualityissues') {

            // prev and next button enable/disable
            $scope.disabledStage_1 = true;
            $scope.prevDisabled = false;

            // Setting prev and next counters
            $scope.counter += 1;
            $scope.maxReached += 1;

            console.log("counter - " + $scope.counter);
            console.log("Max - " + $scope.maxReached);
        }
    }

    $scope.btnPrevCount = function () {
        $scope.counter -= 1;

        $scope.prevDisabled = true;
        $scope.nextDisabled = false;
        if ($scope.counter < 0) {
            $scope.counter = 0;
            console.log("counter - " + $scope.counter);
            console.log("Max - " + $scope.maxReached);
        }
        if ($scope.counter > 0) {
            $scope.prevDisabled = false;
            console.log("counter - " + $scope.counter);
            console.log("Max - " + $scope.maxReached);
        }
        if ($scope.counter < $scope.maxReached) {
            $scope.nextDisabled = false;
            console.log("counter - " + $scope.counter);
            console.log("Max - " + $scope.maxReached);
        }
    };

    $scope.btnNextCount = function () {
        $scope.counter += 1;

        $scope.prevDisabled = true;
        $scope.nextDisabled = true;
        if ($scope.counter > $scope.maxReached) {
            $scope.counter = $scope.maxReached;
            console.log("counter - " + $scope.counter);
            console.log("Max - " + $scope.maxReached);
        }
        if ($scope.counter > 0) {
            $scope.prevDisabled = false;
            console.log("counter - " + $scope.counter);
            console.log("Max - " + $scope.maxReached);

        }
        if ($scope.counter < $scope.maxReached) {
            $scope.nextDisabled = false;
            console.log("counter - " + $scope.counter);
            console.log("Max - " + $scope.maxReached);
        }
    };

}]);