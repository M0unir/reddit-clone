app.controller('MainCtrl', ['$scope', 'PostsService', function ($scope, PostsService) {
  $scope.heading = 'Reddit Clone';

  $scope.posts = PostsService.posts;

  //Add Post
  $scope.addPost = function () {
    if (!$scope.title || $scope.title === '') {
      return;
    }
    PostsService.createPost({
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

app.controller('PostsCtrl', ['$scope', 'PostsService', 'postPromise', function ($scope, PostsService, postPromise) {
  console.log('Posts Ctrl loaded..');
  $scope.post = postPromise;
  $scope.heading = $scope.post.title;

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
