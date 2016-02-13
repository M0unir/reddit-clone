app.controller('MainCtrl', ['$scope', 'PostsService', 'AuthService', function ($scope, PostsService, AuthService) {
  $scope.heading = 'Reddit Clone';
  // Exposing isLoggedIn method
  $scope.isLoggedIn = AuthService.isLoggedIn;

  $scope.posts = PostsService.posts;
  console.log($scope.posts);

  //Add Post
  $scope.addPost = function () {
    if (!$scope.title || $scope.title === '') {
      return;
    }
    PostsService.createPost({
      author: $scope.author,
      title: $scope.title,
      link: $scope.link
    });
    $scope.title = '';
    $scope.link = '';
  };

  //Increment upvotes
  $scope.incrementUpvotes = function (post) {
    PostsService.upvotePost(post);
  }

}]);

app.controller('PostsCtrl', ['$scope', 'PostsService', 'postPromise', 'AuthService','$window', function ($scope, PostsService, postPromise, AuthService, $window) {
  console.log('Posts Ctrl loaded..');
    // Exposing isLoggedIn method
  $scope.isLoggedIn = AuthService.isLoggedIn;

  $scope.post = postPromise;
  $scope.heading = $scope.post.title;
  
  // Go back
  $scope.goBack = function () {
    $window.history.back();
  };

  $scope.addComment = function () {
    if (!$scope.body || $scope.body == '') {
      return;
    }
    PostsService.addComment(postPromise._id, {
      author: $scope.author,
      body: $scope.body,
    }).success(function (comment) {
      $scope.post.comments.push(comment);
    });

    // $scope.author = '';
    $scope.body = '';
  }

  //Increment upvotes
  $scope.incrementUpvotes = function (comment) {
    PostsService.upvoteComment(postPromise, comment);
  }



}]);

app.controller('AuthCtrl', ['$scope', '$state', 'AuthService', function($scope, $state, AuthService){
  console.log('AuthCtrl loaded..');
  $scope.user = {};

  $scope.register = function() {
    AuthService.register($scope.user).error(function(error){
      $scope.error = error;
    }).then(function(){
      $state.go('home');
    })
  };

  $scope.logIn = function(){
    AuthService.logIn($scope.user).error(function(err){
      $scope.error = err;
    }).then(function(){
      $state.go('home');
    })
  }
}]);

  app.controller("NavCtrl", [
    "$scope",
    "AuthService",
    function($scope, AuthService) {
      $scope.isLoggedIn = AuthService.isLoggedIn;
      $scope.currentUser = AuthService.currentUser;
      $scope.logOut = AuthService.logOut;
    }
  ]);
