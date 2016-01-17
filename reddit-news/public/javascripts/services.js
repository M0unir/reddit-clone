app.factory('PostsService', function ($http) {
  var Obj = {
    posts: []
  };

  Obj.getAll = function () {
    return $http.get('/posts').success(function (data) {
      angular.copy(data, Obj.posts);
    });
  };

  Obj.createPost = function (post) {
    return $http.post('/posts', post).success(function (data) {
      Obj.posts.push(data);
    });
  };

  Obj.upvotePost = function (post) {
    console.log(post);
    return $http.put('/posts/' + post._id + '/upvote').success(function (data) {
      post.upvotes += 1;
    });
  };

  Obj.getPost = function(id) {
    return $http.get('/posts/' + id ).then(function(res){
      return res.data;
    });
  };

  Obj.addComment = function(id, comment) {
    return $http.post('/posts/' + id + '/comments', comment);
  };

  Obj.upvoteComment = function(post, comment) {
  return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote')
    .success(function(data){
      comment.upvotes += 1;
    });
};

  return Obj;
});

  app.factory('AuthService', ['$http', '$window', function($http, $window) {
    var auth = {};

    // Check if user is logged in
    auth.isLoggedIn = function() {
      var token = auth.getToken();
      if (token){
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    }

    // Save token to localStorage
    auth.saveToken = function(token){
      $window.localStorage['reddit-news-token'] = token;
    };

    // Get token from localStorage
    auth.getToken = function(token) {
      return $window.localStorage['reddit-news-token'];
    };

    // Get current user
    auth.currentUser = function(){
      if (auth.isLoggedIn()){
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.username;
      }
    };

    // Register
    auth.register = function(user) {
      return $http.post('/users/register', user).success(function(data){
        auth.saveToken(data.token);
      });
    };

    auth.logIn = function(user) {
      return $http.post('/users/login', user).success(function(data){
        auth.saveToken(data.token);
      });
    }

    auth.logOut = function() {
      $window.localStorage.removeItem('reddit-news-token');
    }

    return auth;

  }]);
