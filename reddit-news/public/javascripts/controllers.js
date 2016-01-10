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
  $scope.incrementUpvotes = function(post) {
    PostsService.upvotePost(post);
  }

}]);

app.controller('PostsCtrl', ['$scope', 'PostsService','postPromise', function ($scope, PostsService, postPromise) {
  console.log('Posts Ctrl loaded..');
  $scope.post = postPromise;
  $scope.heading = $scope.post.title;

  $scope.addComment = function () {
    if (!$scope.body || $scope.body == '') {
      return;
    }
    
    console.log('this.. ' + this);

    PostsService.addComment(postPromise._id, {
      author: $scope.author,
      body: $scope.body,
    }).success(function(comment){
      $scope.post.comments.push(comment);
    });

    // $scope.author = '';
    $scope.body = '';
  }


}]);
