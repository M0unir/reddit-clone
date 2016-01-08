app.controller('MainCtrl', ['$scope', 'PostsService', function ($scope, PostsService) {
  $scope.heading = 'Reddit Clone';

  $scope.posts = PostsService.posts;

  //Add Post
  $scope.addPost = function () {
    if (!$scope.title || $scope.title === '') {
      return;
    }
    $scope.posts.push({
      title: $scope.title,
      link: $scope.link,
      upvotes: 0,
      comments: [{
        author: 'Joe',
        body: 'Cool post!',
        upvotes: 0
      }, {
        author: 'Bob',
        body: 'Great idea but everything is wrong!',
        upvotes: 0
      }]
    });
    $scope.title = '';
    $scope.link = '';
  };

  //Increment upvotes
  $scope.incrementUpvotes = function (post) {
    post.upvotes += 1;
  }

}]);

app.controller('PostsCtrl', ['$scope', '$stateParams', 'PostsService', function ($scope, $stateParams, PostsService) {
  console.log('Posts Ctrl loaded..');

  $scope.heading = $scope.post;
  $scope.post = PostsService.posts[$stateParams.id];

  console.log('post.. ' + $scope.post);
  console.dir(this);

  $scope.addComment = function () {
    if (!$scope.body || $scope.body == '') {
      return;
    }
  console.log('this.. ' + this);

    $scope.post.comments.push({
      author: $scope.author,
      body: $scope.body,
      upvotes: 0
    });

    $scope.author = '';
    $scope.body = '';
  }


}]);
