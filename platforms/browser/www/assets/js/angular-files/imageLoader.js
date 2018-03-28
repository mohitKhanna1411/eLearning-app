var mainPhoneGapApp = angular.module('mainPhoneGapApp', ['ngStorage', 'angular-growl']);
mainPhoneGapApp.controller('imageLoaderController', ['$scope', '$http', '$localStorage', 'growl', '$compile', '$window', function ($scope, $http, $localStorage, growl, $compile, $window) {
    var config = {
        headers: {
            "Authorization": "Bearer " + $localStorage.token
        }
    };
    console.log($localStorage.token);


    // Imageviewer
    function imageView(image) {

        var curImageIdx = 1,
            total = image.length;
        var wrapper = $('#image-gallery'),
            curSpan = wrapper.find('.current');
        var viewer = ImageViewer(wrapper.find('.image-container'));

        function showImage() {
            var imgObj = image[curImageIdx - 1];
            viewer.load(imgObj.small, imgObj.big);
            curSpan.html(curImageIdx);
        }

        //initially show image
        showImage();

    }

    // Setting default image when completed / images not present
    setDefaultImage = function () {
        var images = [];
        var imageArr = {};

        imageArr = {
            small: './assets/img/chironzetalogo.png',
            big: './assets/img/chironzetalogo.png'

        };
        images.push(imageArr);

        console.log(images);
        imageView(images);
    }


    // Get random image
    getRandomImage = function () {
        // Get random image
        $http.get('http://192.168.0.111:8000/api/chironx/assign/random/image', config).success(function (res) {

            console.log(res);

            if (res.image === 0) {
                growl.success('All current images have been marked!', { title: 'Success' });
                $("#test *").attr("disabled", "disabled").off('click');
                setDefaultImage();
            }
            else {
                $scope.imageObject = res.image;
                // $scope.image_src = "assets/img/test_image.jpg";
                console.log("Done loading");
                $scope.image_src = res.presignedUrl;

                var images = [];
                var imageArr = {};

                imageArr = {
                    small: res.presignedUrl,
                    big: res.presignedUrl

                };
                images.push(imageArr);

                //   console.log(images);
                imageView(images);
            }


        });
    }



    // Get the list of clinical features
    $http.get('http://192.168.0.111:8000/api/chironx/list/diagnosis', config).success(function (res) {
        // console.log(res.data);
        $scope.listDiagnosis = res.data;
    });



    // $scope.image_src = "https://chironzeta.s3-ap-south-1.amazonaws.com/output0.15169263900178676.fin.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJ3F653OXC3NUQYSA%2F20180323%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20180323T131141Z&X-Amz-Expires=10000&X-Amz-SignedHeaders=host&X-Amz-Signature=2a80ce7c364aa80aa9aa3883af7747046f741a1c1bafd5c7b46b74ef0752e713";
    // $scope.image_src = "assets/img/test_image.jpg";

    getRandomImage();

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

    checkcounter = function () {
        // Setting prev and next counters
        $scope.counter += 1;
        $scope.maxReached += 1;

        console.log("counter - " + $scope.counter);
        console.log("Max - " + $scope.maxReached);

    }

    // Stage - 1 - Quality Diagnosable
    $scope.setValueLevel1 = function () {

        $scope.quality = 'Diagnosable';

        // prev and next button enable/disable
        $scope.disabledStage_1 = true;
        $scope.prevDisabled = false;

        // Setting prev and next counters
        checkcounter();

        $scope.html = $compile('<li ng-repeat="diagnosis in listDiagnosis track by $index"><a>{{diagnosis}}</a></li>')($scope);
        document.getElementById('diaglist').appendChild($scope.html[0]);

    }

    // Stage - 1 - Quality Bad/Non Diagnosable
    $scope.setValueBadLevel1 = function () {

        $scope.quality = 'Non Diagnosable';

        data = {
            image: $scope.imageObject,
            quality: $scope.quality
        }

        console.log(data);

        $http.post('http://192.168.0.111:8000/api/chironx/markBad/assign/random/image', data, config).success(function (res) {
            console.log(res);

            if (res.message === "Image Label Updated") {
                getRandomImage();
            }
            else {
                growl.error(res.message, { title: 'Failure' });
            }
        });

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
    $scope.setValueLevel3 = function (value) {

        $scope.clinicalFeat = []

        if (value === 'absent') {
            $scope.clinicalFeat.push('Normal Image');

            data = {
                image: $scope.imageObject,
                quality: $scope.quality,
                qualityIssues: $scope.qualityIssuesArr,
                clinicalFeatures: $scope.clinicalFeat
            }

            console.log(data);

            $http.post('http://192.168.0.111:8000/api/chironx/save/partialResult', data, config).success(function (res) {
                console.log(res);

                if(res.message === "Stage 3 Updated")
                {
                    $window.location.reload();

                    // // NEXT RANDOM IMAGE CODE
                    // getRandomImage();

                    // // SET COUNTERS
                    // $('#disabledStage_2').find('*').prop('disabled',false);

                    // $scope.Other = "";
                    // $scope.disabledStage_1 = false;
                    // $scope.counter = 0;
                    // $scope.maxReached = 0;

                    // $scope.prevDisabled = true;
                    // $scope.nextDisabled = true;
                }
                else{
                    growl.error(res.message, { title: 'Failure' });
                }
            });

        }
        else {
            // Setting prev and next counters
            checkcounter();
            $scope.disabledStage_3 = true;
            $scope.prevDisabled = false;
        }

        // prev and next button enable/disable
        // $scope.disabledStage_3 = true;
        // $scope.prevDisabled = false;

        console.log("counter - " + $scope.counter);
        console.log("Max - " + $scope.maxReached);

        console.log(data);
    }

    // Stage - 4 - Clinical features
    $scope.yes = [];
    $scope.no = [];
    $scope.unclear = [];

    $scope.setValueLevel4 = function (value, state, counter) {

        console.log(counter, "cunt")

        if (state === 'Present') {
            $scope.clinicalFeat.push(value);
            $scope.yes.push(value);
        }
        else if (state === 'Absent') {
            // $scope.clinicalFeat.push(value);
            $scope.no.push(value);
        }
        else {
            // $scope.clinicalFeat.push(value);
            $scope.unclear.push(value);
        }

        if (counter) {
            console.log("disabledStage_Feat" + counter.toString())
            // prev and next button enable/disable
            $scope["disabledStage_Feat" + counter.toString()] = true;
            $scope.prevDisabled = false;
        }
        else {
            // prev and next button enable/disable
            $scope.disabledStage_4 = true;
            $scope.prevDisabled = false;
        }
        // Setting prev and next counters
        checkcounter();

        data = {
            quality: $scope.quality,
            qualityIssues: $scope.qualityIssuesArr,
            clinicalFeatures: $scope.clinicalFeat,
            yes: $scope.yes,
            no: $scope.no,
            unclear: $scope.unclear
        }
        console.log(data);

        if (counter === 16) {
            var DIV = document.getElementById("pevNextDiv");
            DIV.style.display = "none";

            var SUBDIV = document.getElementById("submitDiv");
            SUBDIV.style.display = "block";
        }

    }

    // Stage 5 Diagnosis
    $scope.stage5SaveAllDetail = function (diagnosisList) {

        // console.log($window.diagnosisList);
        data = {
            image: $scope.imageObject,
            quality: $scope.quality,
            qualityIssues: $scope.qualityIssuesArr,
            clinicalFeatures: $scope.clinicalFeat,
            yes: $scope.yes,
            no: $scope.no,
            unclear: $scope.unclear,
            diagList: $window.diagnosisList
        }

        console.log(data);

        $http.post('http://192.168.0.111:8000/api/chironx/save/allResult', data, config).success(function (res) {
            console.log(res);

            if (res.message === "All Results Saved") {
                // // NEXT RANDOM IMAGE CODE
                // getRandomImage();

                $window.location.reload();

                // // SET COUNTERS
                // $('#disabledStage_2').find('*').prop('disabled',false);

                // $scope.Other = "";
                // $scope.disabledStage_1 = false;
                // $scope.disabledStage_3 = false;
                // $scope.disabledStage_4 = false;
                // $scope.counter = 0;
                // $scope.maxReached = 0;

                // for(count=0;count<=16;count++)
                // {
                //     console.log("disabledStage_Feat" + count.toString());
                //     $scope["disabledStage_Feat" + count.toString()] = false;
                // }

                var DIV = document.getElementById("pevNextDiv");
                DIV.style.display = "block";

                var SUBDIV = document.getElementById("submitDiv");
                SUBDIV.style.display = "none";

                // $scope.prevDisabled = true;
                // $scope.nextDisabled = true;
            }
            else {
                growl.error(res.message, { title: 'Failure' });
            }
        });




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

    $scope.sendFeedback = function(){

        data  = {
            fullname : $scope.feedbackName,
            email : $scope.feedbackEmail,
            message : $scope.feedbackComments,
            rating : $scope.rating
        }

        $http.post('http://192.168.0.111:8000/api/chironx/email/feedback', data, config).success(function (res) {
            console.log(res);
            
            if(res.message === "Feedback Successfully submitted,Thanks!"){
                growl.success(res.message, { title: 'Success' });

                $scope.feedbackName = "";
                $scope.feedbackEmail = "";
                $scope.feedbackComments = "";
                $scope.rating = "";
            }
            else{
                growl.error(res.message, { title: 'Failure' });    
                
                $scope.feedbackName = "";
                $scope.feedbackEmail = "";
                $scope.feedbackComments = "";
                $scope.rating = "";    
            }

        });
    }

    $scope.skipImage = function()
    {
        data = {
            image: $scope.imageObject
        }
        $http.post('http://192.168.0.111:8000/api/chironx/mark/review', data, config).success(function (res) {
            console.log(res);

            if(res.message === "Image Skipped")
            {
                $window.location.reload();
            }
            else
            {
                growl.error(res.message, { title: 'Failure' });
            }
        });
    }



}]);