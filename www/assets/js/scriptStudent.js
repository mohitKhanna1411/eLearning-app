// creating the module
var myApp = angular.module('myApp', ['ngRoute','ngStorage']);
// configuring routes
myApp.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/lessonsStudent', {
    templateUrl : 'android_asset/www/views/student/lessonsStudent.html',
    controller  : 'controllerStudent'
  })
  .when('/assesmentStudent', {
    templateUrl : 'android_asset/www/views/student/assesmentStudent.html',
    controller  : 'controllerStudent'
  })
  .when('/remedialStudent', {
    templateUrl : 'android_asset/www/views/student/remedialStudent.html',
    controller  : 'controllerStudent'
  })
  .when('/recommendationStudent', {
    templateUrl : 'android_asset/www/views/student/recommendationStudent.html',
    controller  : 'controllerStudent'
  });
  $locationProvider.html5Mode(true);
});


myApp.filter('trusted', ['$sce', function ($sce) {
  return function(url) {
    return $sce.trustAsResourceUrl(url);
  };
}]);



// creating mainController
myApp.controller('controllerStudent', function($scope, $http,$timeout,$window,$localStorage) {

    var config = {
        headers: {
            "Authorization": "Bearer " + $localStorage.token
        }
    };
    console.log($localStorage.token);
  
  $http.get('http://13.232.160.185:8080/jwt/api/student/getInfo',config).success(function(res){
    $scope.user = res;
    console.log(res);
  })

  $http.get('http://13.232.160.185:8080/jwt/api/student/getLastLesson',config).success(function(res){
   if(res.last_lesson){
     $scope.lastLessonStudent = res.last_lesson; 
   }
   else{
    $scope.lastLessonStudent = "No lesson"; 
  }
  console.log($scope.lastLessonStudent);
})





  $scope.ok = "not";
  $scope.lessons= function()
  {
    $scope.msg = "";
    $scope.msg1 = "";
    var standard=$scope.standard;
    var section=$scope.section;
    var subject=$scope.subject;
    
    var data={"class":standard, "subject":subject, "section":section};
    console.log(data);
    $http.post('http://13.232.160.185:8080/jwt/api/student/getlessons',data, config).success(function(res){
     $scope.list = res;
     if(res === "0"){
      $scope.msg1 = "No lesson found or you are not enrolled in this class!";
      $scope.ok = "not";
      return;
    }if(res.length === 0){
      $scope.msg1 = "No lesson found or you are not enrolled in this class!";
      $scope.ok = "not";
      return;
    }else{
      $scope.msg1 = " Number of lessons found : " + res.length ;
      $scope.ok = "ok";
    }
  })
    
  }



  $scope.ok = "not";
  $scope.getAllAssign= function()
  {
    $scope.msg = "";
    $scope.msg1 = "";
    var standard=$scope.standard;
    var section=$scope.section;
    var subject=$scope.subject;
    
    var data={"class":standard, "subject":subject, "section":section};
    console.log(data);
    $http.post('http://13.232.160.185:8080/jwt/api/student/getAllAssign', data ,config).success(function(res){
      $scope.assesments = res;
      console.log(res);
      if(res == "0"){
        $scope.msg1 = "No assesment found or you are not enrolled in this class!";
        $scope.ok = "not";
      }else{
        $scope.ok = "ok";
        $scope.msg1 = res.length + " assesments found.";
        if(res.length == 0){
          $scope.ok = "not";
          $scope.msg1 = "Assesment yet to be added. Please come again later!";    
        }
      }
    })
  }



  $scope.notok = "not";
  $scope.getAssign= function(assess_name)
  {
    $scope.notok="ok";
    $scope.msg = "";
    $scope.msg1 = "";
    $scope.msg2="";
    
    var data={"assesment_name" : assess_name};
    console.log(data);
    $http.get('http://13.232.160.185:8080/api/getAssign', { params: data }).success(function(res){
      $scope.questions = res.questions;
      $scope.name = res.assesment_name;
      console.log(res);
      console.log($scope.questions);
    })
    
  }

  $scope.notok = "not";
  $scope.getSpecificLessonStudent= function(title_lesson)
  {
    
    $scope.msg = "";
    $scope.msg1 = "";
    $scope.msg2="";
    $scope.msg4="";
    
    var data={"Title" : title_lesson};
    console.log(data);
    $http.post('http://13.232.160.185:8080/jwt/api/student/getSpecificLesson',data ,config).success(function(res){
      $scope.notok="ok";
      $scope.list5 = res;
      
      console.log(res);
      
    })

    
  }

  $scope.notok = "not";
  $scope.getResults= function(assess_name)
  {
    $scope.msg = "";
    $scope.msg1 = "";
    var standard=$scope.standard;
    var section=$scope.section;
    var subject=$scope.subject;
    
    var data={"class":standard, "subject":subject, "section":section, "assesment_name" : assess_name};
    console.log(data);
    $http.post('http://13.232.160.185:8080/jwt/api/getRes',data, config).success(function(res){
      $scope.list = res;
      console.log(res);
      if(res == "0"){
        $scope.msg1 = "No results found or you are not enrolled in this class!";
        $scope.notok = "not";
      }else{
            // $scope.msg1 = res.length + " Number of lessons found.";
            $scope.notok = "ok";
            $scope.okok="ok";
          }
        })
    
  }



  $scope.hide = false ;
  $scope.answers ={};
  $scope.correctCount = 0;
  $scope.showResult = function(){
    var errors=[];

    var error_lesson=[];

    $scope.hide = false ;
    $scope.correctCount = 0;
    var qLength = $scope.questions.length;
    for(let i=0;i<qLength;i++){
      var answers = $scope.questions[i].options;
      console.log(answers);
      $scope.questions[i].userAnswerCorrect = false;
      $scope.questions[i].userAnswer = $scope.answers[i];
      for(let j=0;j<answers.length;j++){
       // answers[j].selected = "donno";
       if ($scope.questions[i].userAnswer === answers[j].answerText && answers[j].correct===true){
        $scope.questions[i].userAnswerCorrect = true;
        answers[j].selected = "true";
        $scope.correctCount++;
      }else if($scope.questions[i].userAnswer === answers[j].answerText && answers[j].correct===false){
        answers[j].selected = "false";
        $scope.remedial_lesson_title="";
        let data={"error_code" : answers[j].error_code};
        $http.get('http://13.232.160.185:8080/api/getRemedialTitle', { params: data }).success(function(res){
          
          $scope.remedial_lesson_title = res.remedial_title;

          let obj = {
            question : $scope.questions[i].questionText,
            response : $scope.questions[i].userAnswer,
            remedial_lesson_title : $scope.remedial_lesson_title
          };
          
          let obj1={
            remedial_lesson_title : $scope.remedial_lesson_title
          };
          error_lesson.push(obj1);


          

          
          errors.push(obj);
          
          console.log(errors);
          console.log(errors.length);
        })
      }
    } //for loop
  } //for loop outer


  $timeout(function() { 
    var standard=$scope.standard;
    var section=$scope.section;
    var subject=$scope.subject;
    var sendData = {  "count" : $scope.correctCount +" out of "+ $scope.questions.length , "assesment": $scope.name,
    "class":standard, "section":section, "subject":subject, "recommendations" : errors ,"remedial_lessons": error_lesson                 
  }
  $scope.ql = qLength;
  console.log(sendData);
  $http.post('http://13.232.160.185:8080/jwt/api/addResults', sendData, config).success(function(res){
    $scope.msg = res;
    $scope.hide = true;
       // $scope.optionsArr = [];
      // $scope.contents = [];
      // data = "";
      // $scope.questions = [] ;
    })
}, 1000);


}


$scope.remedialLessons= function()
{
  $scope.ok = "not";
  $scope.msg = "";
  $scope.msg1 = "";
  var standard=$scope.standard;
  var section=$scope.section;
  var subject=$scope.subject;

  var data={"class":standard, "subject":subject, "section":section};
  console.log(data);
  $http.get('http://13.232.160.185:8080/api/admin/getremedialLessons', { params: data }).success(function(res){
    $scope.list = res;
    console.log(res);
    if(res == "0"){
      $scope.msg1 = "No remedial lessons found or you are not enrolled in this class!";
      $scope.ok = "not";
      return;
    }if(res.length == 0){
      $scope.msg1 = "No remedial lessons found or you are not enrolled in this class!";
      $scope.ok = "not";
      return;
    }else{
      $scope.msg1 = " Number of Remedial lessons found : " + res.length ;
      $scope.ok = "ok";
    }
  })

}
});
