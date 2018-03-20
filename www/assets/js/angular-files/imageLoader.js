var mainPhoneGapApp = angular.module('mainPhoneGapApp', ['ngStorage']);
mainPhoneGapApp.controller('imageLoaderController', ['$scope', '$http', '$localStorage', function ($scope, $http, $localStorage) {
    var config = {
        headers: {
            "Authorization": "Bearer " + $localStorage.token
        }
    };
    console.log($localStorage.token);
    
    // Get random image
    $http.get('http://192.168.1.7:8000/api/chironx/assign/random/image', config).success(function (res) {

        console.log(res);
        $scope.image_src = "assets/img/test_image.jpg";
        console.log("Done loading");
        // $scope.image_src = res.presignedUrl;

    })
   
    // Get the list of clinical features
    //     $http.get('http://192.168.1.7:8000/api/chironx/list/clinical/feautres', config).success(function (res) {
    //     console.log(res);
    // })



    // $scope.image_src = "https://chironzeta.s3-ap-south-1.amazonaws.com/logo-chiron.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJ3F653OXC3NUQYSA%2F20180319%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20180319T084804Z&X-Amz-Expires=10000&X-Amz-SignedHeaders=host&X-Amz-Signature=cee2a3d3303612279ab46f08dcb2447802915c2ebf144f1e88730e627a7a0e6e";
    // $scope.image_src = "assets/img/test_image.jpg";

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

            $scope.image_src = "assets/img/test_image.jpg";

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