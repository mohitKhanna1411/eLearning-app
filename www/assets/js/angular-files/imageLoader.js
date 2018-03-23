var mainPhoneGapApp = angular.module('mainPhoneGapApp', ['ngStorage']);
mainPhoneGapApp.controller('imageLoaderController', ['$scope', '$http', '$localStorage', function ($scope, $http, $localStorage) {
    var config = {
        headers: {
            "Authorization": "Bearer " + $localStorage.token
        }
    };
    console.log($localStorage.token);

    // Get random image
    // $http.get('http://192.168.0.109:8000/api/chironx/assign/random/image', config).success(function (res) {

    //     console.log(res);
    //     $scope.image_src = "assets/img/test_image.jpg";
    //     console.log("Done loading");
    //     // $scope.image_src = res.presignedUrl;

    // })

    // Get the list of clinical features
        $http.get('http://192.168.1.7:8000/api/chironx/list/diagnosis', config).success(function (res) {
        console.log(res.data);
        $scope.listDiagnosis = res.data;
    });



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

    var clinicalFeatList = [];

    $scope.quality = '';
    $scope.setValue = function (value) {
        console.log("Value - " + value);

        // Stage - 4 - Features -  Bull's Eye Maculopathy Present
        if (value === 'BullEyeMaculopathyPresent') {

            clinicalFeatList.push({ "BullEyeMaculopathy": "present" });

            // prev and next button enable/disable
            $scope.disabledStage_4 = true;
            $scope.prevDisabled = false;

            // Setting prev and next counters
            $scope.counter += 1;
            $scope.maxReached += 1;

            console.log("counter - " + $scope.counter);
            console.log("Max - " + $scope.maxReached);

            console.log(clinicalFeatList);
        }
    }

    data = {};

    checkcounter = function()
    {
        // Setting prev and next counters
        $scope.counter += 1;
        $scope.maxReached += 1;

        console.log("counter - " + $scope.counter);
        console.log("Max - " + $scope.maxReached);

    }
    
    // Stage - 1 - Quality
    $scope.setValueLevel1 = function(){
        
        $scope.quality = 'Good';
         
        // prev and next button enable/disable
         $scope.disabledStage_1 = true;
         $scope.prevDisabled = false;

         // Setting prev and next counters
         checkcounter();
        
    }

    // Stage - 2 - Quality Issues
    $scope.setValueLevel2 = function () {

        $scope.qualityIssuesArr = [];

        if ($scope.Blurry) {
            $scope.qualityIssuesArr.push("Blurry");
        }
        if ($scope.Other.length > 0) {
            $scope.qualityIssuesArr.push($scope.Other);
        }
        if ($scope.Possible_Cataract) {
            $scope.qualityIssuesArr.push("Possible Cataract");
        }
        if ($scope.Possible_Incorrect_Dilation) {
            $scope.qualityIssuesArr.push("Possible Incorrect Dilation");
        }
        if ($scope.Lens_Flash) {
            $scope.qualityIssuesArr.push("Lens Flash");
        }
        if ($scope.Lens_Glare) {
            $scope.qualityIssuesArr.push("Lens Glare");
        }
        if ($scope.Incorrect_Exposure) {
            $scope.qualityIssuesArr.push("Incorrect Exposure");
        }
        if ($scope.Camera_Artefact) {
            $scope.qualityIssuesArr.push("Camera Artefact");
        }
            console.log($scope.qualityIssuesArr);
            
            // Disable Checkboxes 
            $("#disabledStage_2 *").attr("disabled", "disabled").off('click');
            $scope.prevDisabled = false;

            // Setting prev and next counters
            checkcounter();

    }

    // Stage - 3 - Clinical features present/normal image
    $scope.setValueLevel3 = function(value){
        
        $scope.clinicalFeat = []
        
        if (value === 'absent'){
            $scope.clinicalFeat.push('Normal Image');

            // NEXT RANDOM IMAGE CODE
            // ---
            // ---

        }
        else{
            // Setting prev and next counters
            checkcounter();
        }

        // prev and next button enable/disable
        $scope.disabledStage_3 = true;
        $scope.prevDisabled = false;

        console.log("counter - " + $scope.counter);
        console.log("Max - " + $scope.maxReached);

        console.log(data);
    }

    // Stage - 4 - Clinical features
    $scope.yes = [];
    $scope.no = [];
    $scope.unclear = [];
    
    $scope.setValueLevel4 = function(value,state,counter){


        console.log(counter,"cunt")

        if(state === 'Present'){
            $scope.clinicalFeat.push(value);
            $scope.yes.push(value);
        }
        else if(state === 'Absent'){
            // $scope.clinicalFeat.push(value);
            $scope.no.push(value);
        }
        else{
            // $scope.clinicalFeat.push(value);
            $scope.unclear.push(value);
        }
        
        if(counter){
        console.log("disabledStage_Feat"+counter.toString())
         // prev and next button enable/disable
         $scope["disabledStage_Feat"+counter.toString()] = true;
         $scope.prevDisabled = false;
        }
        else{
         // prev and next button enable/disable
         $scope.disabledStage_4 = true;
         $scope.prevDisabled = false;
        }
        // Setting prev and next counters
        checkcounter();

        data = {
            quality : $scope.quality,
            qualityIssues : $scope.qualityIssuesArr ,
            clinicalFeatures : $scope.clinicalFeat,
            yes : $scope.yes,
            no : $scope.no,
            unclear : $scope.unclear
        }
        console.log(data);

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
$scope.mk = function(){
    console.log("present");
}

}]);