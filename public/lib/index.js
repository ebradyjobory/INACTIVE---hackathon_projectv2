var app = angular.module('App', ['ui.router']);
//Hendrixer
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partial-home.html'
    })
    .state('student', {
      url: '/student',
      templateUrl: 'partial-student.html'
    })
    .state('mentor', {
      url: '/mentor',
      templateUrl: 'partial_mentor.html'
    })
    .state('signin', {
      url: '/signin',
      templateUrl: 'partial-signin.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'partial-signup.html'
    });
});

app.controller('GitHubCtrl', function ($scope, $http) {

  $scope.students = [];

  $scope.getGitInfo = function () {
    if(!$scope.username || $scope.username === '') { return; }
    $scope.userNotFound = false;
    $scope.loaded = false;
    $http.get("https://api.github.com/users/" + $scope.username)
     .success(function (data) {
        if (data.name === "") data.name = data.login;
        $scope.students.push(data);
        $scope.loaded = true;
     })
     .error(function () {
        $scope.userNotFound = true;
     });
    $http.get("https://api.github.com/users/" + $scope.username + "/repos").success(function (data) {
      $scope.repos = data;
      $scope.reposFound = data.length > 0;
    });
    $scope.username = '';
  };
});

//dummy data for now. To be exctracted from db later
  var student1 = {
    name: "Essam",
    subject: "Angular"
  };
  var student2 = {
    name: "Victor",
    subject: "D3"
  };
  var student3 = {
    name: "Mike",
    subject: "Backbone"
  };

  var students = [student1, student2, student3];


app.controller('MentorCtrl', function ($scope, $http) {
  $scope.getGitInfo = function () {
    $scope.students = students;  //dummy data was added <<<<<<
    $scope.userNotFound = false;
    $scope.loaded = false;
    $http.get("https://api.github.com/users/" + $scope.username)
     .success(function (data) {
        if ($scope.username !== undefined) {
          $('#studentsTable').show();
          $('#totalReputation').show();
        }
        
        if (data.name === "") data.name = data.login;
        $scope.user = data;
        console.log(data);
        $scope.loaded = true;
     })
     .error(function () {
        $scope.userNotFound = true;
     });
    $http.get("https://api.github.com/users/" + $scope.username + "/repos").success(function (data) {
      $scope.repos = data;
      $scope.reposFound = data.length > 0;
    });
    var counter = 0;
    $scope.up = function() {
      counter++;
      $('#reputation').html(counter);
    };
    $scope.down = function() {
      if (counter >= 1) {
        counter--;
        $('#reputation').html(counter);
      }    
    }
  };

});

