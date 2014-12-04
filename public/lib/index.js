var app = {};

app.init = function(){
  this.students = [];
  this.studentsRepo = [];
};

app.fetchUser = function(username){
  $.ajax({
    url: 'https://api.github.com/users/' + username,
    type: 'GET',
    contentType: 'application/json',
    success: function(data){
      app.students.push(data);
      app.addStudent();
    },
    error: function(data){
      console.error('something went wrong');
    },
  });
};

app.fetchUserRepo = function(username){
  $.ajax({
    url: 'https://api.github.com/users/' + username + '/repos',
    type: 'GET',
    contentType: 'application/json',
    success: function(data){
      data.forEach(function (repo) {
        app.studentsRepo.push(repo);
      });
      app.addStudentRepo();
    },
    error: function(data){
      console.error('something went wrong');
    },
  });
};

app.addStudent = function(){
  var student = app.students[0];

  var name = '<h1>'+student.name+'</h1>';
  var email = '<a href=mailto:'+student.email+'>'+student.email+'</a>';
  var blog = '<p>'+student.blog+'</p>';
  var location = '<p>'+student.location+'</p>';
  var url = '<a href='+ student.url +'>'+student.url+'</p>';

  var followers = '<p> <strong>Followers:</strong> '+student.followers+'</p>';
  var following = '<p> <strong>Following:</strong>'+student.following+'</p>';
  var publicRepos = '<p> <strong> Repos:</strong>'+student.public_repos+'</p>';

  var image = '<img src=' + student.avatar_url +'>';

  $('#studentImage').append(image);
  $('#studentInfo').append(name + email + blog + location + url);
  $('#studentMetrics').append(followers + following + publicRepos);
};

app.addStudentRepo = function(){
  // var studentRepo = app.studentRepo[0];

  app.studentsRepo.forEach(function(repo){
    var name = '<li><span class="label label-primary">' + repo.name + '</span></li>';
    $('#studentRepos').append(name);
  });
};

$(document).ready(function(){
  app.init();

  $('.search').on('click', function(e){
    e.preventDefault();
    var $username = $('#username').val();
    app.fetchUser($username);
    app.fetchUserRepo($username);
  });
});
