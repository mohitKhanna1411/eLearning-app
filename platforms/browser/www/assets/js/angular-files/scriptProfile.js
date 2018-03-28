var mainPhoneGapApp = angular.module('mainPhoneGapApp', ['ngStorage']);
mainPhoneGapApp.controller('profileController', ['$scope', '$http', '$localStorage', '$compile', '$window', function ($scope, $http, $localStorage, $compile, $window) {
    var config = {
        headers: {
            "Authorization": "Bearer " + $localStorage.token
        }
    };
    console.log($localStorage.token);



    // Get the user profile details
    $http.get('http://192.168.0.111:8000/api/chironx/get/doctor/details', config).success(function (res) {
        console.log(res);

        $scope.docName = res.docs.Doc_Name;
        $scope.regDate = res.docs.Registration_Date;
        $scope.marked = res.count;

    });


}]);